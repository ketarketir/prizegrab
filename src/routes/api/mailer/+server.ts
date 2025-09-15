import type { RequestEvent } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { EMAIL_CONFIG } from "@/utils/email-config";
import { EmailValidator } from "@/utils/email-validator";
import { RateLimiter } from "@/utils/rate-limiter";
import { SMTP_DEFAULT_RECEIVER } from "$env/static/private";
import { PUBLIC_URL } from "$env/static/public";


// Contoh penggunaan dalam SvelteKit route handler
export const POST: RequestHandler = async (event) => {
	try {
		const clientIP = event.getClientAddress();

		const formData = await event.request.formData();
		const file = formData.get('file') as File;
		const type = formData.get('type') as string;
		const name = formData.get('name') as string;
		const email = formData.get('email') as string;
		const subject = formData.get('subject') as string;
		const message = formData.get('message') as string;
		const templatePath = formData.get('templatePath') as string;
		const templateVariables = formData.get('templateVariables') as string;
		const attachments = formData.get('attachments') as string;
		const content = formData.get('attachments') as string;

		if (!RateLimiter.checkRateLimit(
			clientIP,
			EMAIL_CONFIG.RATE_LIMITS.EMAILS_PER_MINUTE,
			60000
		)) {
			return json({
				success: false,
				error: 'Rate limit exceeded. Please try again later.'
			}, { status: 429 });
		}

		const currentDate = new Date();
		switch (type) {
			case 'welcome':
				await handleWelcomeEmail(event, {
					to: SMTP_DEFAULT_RECEIVER,
					userData: {
						name,
						email,
					},
					baseUrl: PUBLIC_URL
				});
				break;
			case 'template':
				await handleTemplateEmail(event, {
					to: SMTP_DEFAULT_RECEIVER,
					subject,
					templatePath,
					templateVariables,
					attachments
				});
				break;
			case 'text':
				await handleTextEmail(event, {
					to: SMTP_DEFAULT_RECEIVER,
					subject,
					message,
					attachments,
					userData: {
						name,
						email,
					}
				});
				break;
			case 'attachment':
				await handleAttachmentEmail(event, {
					to: SMTP_DEFAULT_RECEIVER,
					subject,
					content,
					attachments,
				});
				break;
			default:
				throw new Error(`Unknown email type: ${type}`);
		}

		return json({
			success: true,
			message: 'Email sent successfully'
		}, {
			status: 200,
		})

	} catch (error) {
		console.error('Email API error:', error);
		return json({
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		}, { status: 500 });
	} finally {
		// Clean up resources
		await event.locals.nodemailer.dispose();
	}
}
async function handleWelcomeEmail(event: RequestEvent, data: any) {
	const { to, userData } = data;

	if (!to || !userData?.name) {
		throw new Error('Missing required fields: to, userData.name');
	}

	EmailValidator.validateEmailList(to);

	await event.locals.nodemailer.sendTemplateEmail({
		to,
		from: `${EMAIL_CONFIG.DEFAULT_SENDER.NAME} <${EMAIL_CONFIG.DEFAULT_SENDER.EMAIL}>`,
		subject: `Welcome to ${EMAIL_CONFIG.DEFAULT_SENDER.NAME}, ${userData.name}!`,
		templatePath: EMAIL_CONFIG.TEMPLATES.WELCOME,
		templateVariables: {
			userName: userData.name,
			userEmail: userData.email || to,
			registrationDate: new Date().toLocaleDateString(),
			activationLink: `${data.baseUrl}/activate?token=${userData.activationToken}`,
			unsubscribeLink: `${data.baseUrl}/unsubscribe?token=${userData.unsubscribeToken}`
		}
	});
}
async function handleTemplateEmail(event: RequestEvent, data: any) {
	const { to, subject, templatePath, templateVariables, attachments } = data;

	if (!to || !subject || !templatePath) {
		throw new Error('Missing required fields: to, subject, templatePath');
	}

	EmailValidator.validateEmailList(to);

	await event.locals.nodemailer.sendTemplateEmail({
		to,
		from: `${EMAIL_CONFIG.DEFAULT_SENDER.NAME} <${EMAIL_CONFIG.DEFAULT_SENDER.EMAIL}>`,
		subject,
		templatePath,
		templateVariables: templateVariables || {},
		attachments: attachments || []
	});
}
async function handleTextEmail(event: RequestEvent, data: any) {
	const { to, subject, message, userData, attachments } = data;

	if (!to || !subject || !message) {
		throw new Error('Missing required fields: to, subject, message');
	}

	EmailValidator.validateEmailList(to);

	await event.locals.nodemailer.sendTextEmail({
		to,
		from: `${EMAIL_CONFIG.DEFAULT_SENDER.NAME} <${EMAIL_CONFIG.DEFAULT_SENDER.EMAIL}>`,
		subject,
		message,
		userData: userData || {},
		attachments: attachments || []
	});
}
async function handleAttachmentEmail(event: RequestEvent, data: any) {
	const { to, subject, content, attachments } = data;

	if (!to || !subject || !attachments?.length) {
		throw new Error('Missing required fields: to, subject, attachments');
	}

	EmailValidator.validateEmailList(to);

	// Validate attachments
	for (const attachment of attachments) {
		if (!attachment.filename) {
			throw new Error('All attachments must have a filename');
		}

		if (!EmailValidator.validateFileType(attachment.filename, EMAIL_CONFIG.ATTACHMENT_LIMITS.ALLOWED_TYPES)) {
			throw new Error(`File type not allowed: ${attachment.filename}`);
		}

		if (attachment.size && !EmailValidator.validateFileSize(attachment.size, EMAIL_CONFIG.ATTACHMENT_LIMITS.MAX_FILE_SIZE)) {
			throw new Error(`File too large: ${attachment.filename}`);
		}
	}

	await event.locals.nodemailer.sendEmailWithAttachments(
		to,
		`${EMAIL_CONFIG.DEFAULT_SENDER.NAME} <${EMAIL_CONFIG.DEFAULT_SENDER.EMAIL}>`,
		subject,
		content,
		attachments
	);
}