import { SMTP_PASS, SMTP_USER } from "$env/static/private";
import type { RequestEvent } from "@sveltejs/kit";
import nodemailer from "nodemailer";
import fs from "fs/promises";
import path from "path";


export class NodemailerService {
	private senderEmail: string | undefined;
	private senderPassword: string | undefined;
	private event: RequestEvent | undefined;
	private transporter: nodemailer.Transporter | null = null;

	constructor(event: RequestEvent) {
		this.senderEmail = SMTP_USER;
		this.senderPassword = SMTP_PASS;
		this.event = event;
	}
	private async initTransporter(): Promise<nodemailer.Transporter> {
		if (this.transporter) {
			return this.transporter;
		}

		if (!this.senderEmail || !this.senderPassword) {
			throw new Error('Email service is not configured properly.');
		}

		const transportConfigs = [
			// Primary config - Gmail SMTP with TLS
			{
				name: "Gmail SMTP (TLS)",
				config: {
					host: "smtp.gmail.com",
					port: 587,
					secure: false, // Use STARTTLS
					auth: {
						user: this.senderEmail,
						pass: this.senderPassword,
					},
					tls: {
						rejectUnauthorized: false,
						ciphers: 'SSLv3'
					},
					connectionTimeout: 60000, // 60 seconds
					socketTimeout: 60000, // 60 seconds
					logger: true, // Enable logging
					debug: true, // Enable debug output
				}
			},
			// Fallback config - Gmail SMTP with SSL
			{
				name: "Gmail SMTP (SSL)",
				config: {
					host: "smtp.gmail.com",
					port: 465,
					secure: true, // Use SSL
					auth: {
						user: this.senderEmail,
						pass: this.senderPassword,
					},
					tls: {
						rejectUnauthorized: false,
					},
					connectionTimeout: 60000,
					socketTimeout: 60000,
					logger: true,
					debug: true,
				}
			},
			// Alternative config using service shorthand
			{
				name: "Gmail Service",
				config: {
					service: "gmail",
					auth: {
						user: this.senderEmail,
						pass: this.senderPassword,
					},
					tls: {
						rejectUnauthorized: false,
					},
					connectionTimeout: 60000,
					socketTimeout: 60000,
				}
			}
		];

		// let lastError: Error | null = null;

		this.transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: this.senderEmail,
				pass: this.senderPassword,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		// Verify connection
		try {
			await this.transporter.verify();
			console.log("Email server connection verified successfully");
		} catch (error) {
			console.error("Email server verification failed:", error);
			throw new Error("Failed to verify email server connection");
		}

		return this.transporter;
	}
	private validateEmailFields(to: string | string[], from: string, subject: string): void {
		if (!to || (Array.isArray(to) && to.length === 0)) {
			throw new Error('Missing required field: to');
		}
		if (!from) {
			throw new Error('Missing required field: from');
		}
		if (!subject) {
			throw new Error('Missing required field: subject');
		}
	}
	private async processTemplate(templatePath: string, variables: TemplateVariables = {}): Promise<string> {
		try {
			const templateContent = await fs.readFile(templatePath, 'utf-8');

			// Simple template processing - replace {{variable}} with actual values
			let processedContent = templateContent;

			Object.keys(variables).forEach(key => {
				const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
				processedContent = processedContent.replace(regex, String(variables[key] || ''));
			});

			return processedContent;
		} catch (error) {
			console.error("Error processing template:", error);
			throw new Error(`Failed to process email template: ${templatePath}`);
		}
	}
	private processTextWithUserData(message: string, userData: UserData = {}): string {
		let processedMessage = message;

		// Replace common user data placeholders
		Object.keys(userData).forEach(key => {
			const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g');
			processedMessage = processedMessage.replace(regex, String(userData[key] || ''));
		});

		return processedMessage;
	}
	private async validateAttachments(attachments: Attachment[]): Promise<Attachment[]> {
		const validatedAttachments: Attachment[] = [];

		for (const attachment of attachments) {
			if (attachment.path) {
				try {
					await fs.access(attachment.path);
					validatedAttachments.push(attachment);
				} catch (error) {
					console.warn(`Attachment file not found: ${attachment.path}`);
					throw new Error(`Attachment file not found: ${attachment.path}`);
				}
			} else if (attachment.content) {
				validatedAttachments.push(attachment);
			} else {
				throw new Error(`Invalid attachment: ${attachment.filename} - missing path or content`);
			}
		}

		return validatedAttachments;
	}
	async mailerService(options: MailerOptions): Promise<void> {
		try {
			if (!this.event) {
				throw new Error('Request event is not available.');
			}

			this.validateEmailFields(options.to, options.from, options.subject);

			const transporter = await this.initTransporter();

			// Validate attachments if provided
			let validatedAttachments: Attachment[] = [];
			if (options.attachments && options.attachments.length > 0) {
				validatedAttachments = await this.validateAttachments(options.attachments);
			}

			const emailOptions = {
				from: options.from,
				to: options.to,
				subject: options.subject,
				text: options.text,
				html: options.html,
				attachments: validatedAttachments,
				cc: options.cc,
				bcc: options.bcc,
				replyTo: options.replyTo,
			};

			console.log(`Attempting to send email to: ${Array.isArray(options.to) ? options.to.join(', ') : options.to}`);

			const result = await transporter.sendMail(emailOptions);

			console.log("Email successfully sent");
			console.log("Email result ID:", result.messageId);

		} catch (error) {
			console.error("Send email error:", error);
			this.logError(error);
		}
	}
	async sendTemplateEmail(options: TemplateMailOptions): Promise<void> {
		try {
			this.validateEmailFields(options.to, options.from, options.subject);

			const htmlContent = await this.processTemplate(options.templatePath, options.templateVariables);

			const mailOptions: MailerOptions = {
				to: options.to,
				from: options.from,
				subject: options.subject,
				html: htmlContent,
				attachments: options.attachments,
				cc: options.cc,
				bcc: options.bcc,
				replyTo: options.replyTo,
			};

			await this.mailerService(mailOptions);

		} catch (error) {
			console.error("Send template email error:", error);
			this.logError(error);
		}
	}
	async sendTextEmail(options: TextMailOptions): Promise<void> {
		try {
			this.validateEmailFields(options.to, options.from, options.subject);

			const processedMessage = this.processTextWithUserData(options.message, options.userData);

			const mailOptions: MailerOptions = {
				to: options.to,
				from: options.from,
				subject: options.subject,
				text: processedMessage,
				attachments: options.attachments,
				cc: options.cc,
				bcc: options.bcc,
				replyTo: options.replyTo,
			};

			await this.mailerService(mailOptions);

		} catch (error) {
			console.error("Send text email error:", error);
			this.logError(error);
		}
	}
	async sendEmailWithAttachments(
		to: string | string[],
		from: string,
		subject: string,
		content: { text?: string; html?: string },
		attachments: Attachment[],
		options?: {
			cc?: string | string[];
			bcc?: string | string[];
			replyTo?: string;
		}
	): Promise<void> {
		try {
			const mailOptions: MailerOptions = {
				to,
				from,
				subject,
				text: content.text,
				html: content.html,
				attachments,
				cc: options?.cc,
				bcc: options?.bcc,
				replyTo: options?.replyTo,
			};

			await this.mailerService(mailOptions);

		} catch (error) {
			console.error("Send email with attachments error:", error);
			this.logError(error);
		}
	}
	static createFileAttachment(filePath: string, filename?: string, contentType?: string): Attachment {
		return {
			filename: filename || path.basename(filePath),
			path: filePath,
			contentType: contentType,
		};
	}
	static createBufferAttachment(
		content: Buffer,
		filename: string,
		contentType?: string,
		cid?: string
	): Attachment {
		return {
			filename,
			content,
			contentType,
			cid,
		};
	}
	static createInlineImage(imagePath: string, cid: string, filename?: string): Attachment {
		return {
			filename: filename || path.basename(imagePath),
			path: imagePath,
			cid: cid,
			contentDisposition: 'inline',
		} as Attachment;
	}
	sendEmail(to: string, subject: string, body: string): void {
		console.log(`Legacy method - Sending email to ${to} with subject "${subject}"`);
		// You can implement this to call one of the new methods
	}
	private logError(error: Error | unknown | null): never {
		const message = error instanceof Error ? error.message : "An unknown error occurred in email service.";
		const stack = error instanceof Error ? error.stack : undefined;

		console.error("Email Service Error:", message);
		if (stack) {
			console.error("Stack trace:", stack);
		}

		throw new Error(message);
	}
	async dispose(): Promise<void> {
		if (this.transporter) {
			this.transporter.close();
			this.transporter = null;
		}
	}
}

export const nodemailerService = (event: RequestEvent) => new NodemailerService(event);