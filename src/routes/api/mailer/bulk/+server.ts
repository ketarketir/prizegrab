import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import { EMAIL_CONFIG } from "@/utils/email-config";
import { EmailValidator } from "@/utils/email-validator";

export const POST: RequestHandler = async (event) => {
	try {
		const body = await event.request.json();
		const { recipients, subject, content, type = 'html' } = body;

		if (!recipients?.length || !subject || !content) {
			return json({
				success: false,
				error: 'Missing required fields: recipients, subject, content'
			}, { status: 400 });
		}

		if (recipients.length > 100) {
			return json({
				success: false,
				error: 'Maximum 100 recipients allowed per bulk email'
			}, { status: 400 });
		}

		// Validate all email addresses
		try {
			EmailValidator.validateEmailList(recipients);
		} catch (error) {
			return json({
				success: false,
				error: error instanceof Error ? error.message : 'Invalid email addresses'
			}, { status: 400 });
		}

		const results = [];

		// Send emails with delay to avoid rate limits
		for (let i = 0; i < recipients.length; i++) {
			try {
				const recipient = recipients[i];

				if (type === 'template') {
					await event.locals.nodemailer.sendTemplateEmail({
						to: recipient,
						from: `${EMAIL_CONFIG.DEFAULT_SENDER.NAME} <${EMAIL_CONFIG.DEFAULT_SENDER.EMAIL}>`,
						subject,
						templatePath: content.templatePath,
						templateVariables: content.variables || {}
					});
				} else {
					await event.locals.nodemailer.mailerService({
						to: recipient,
						from: `${EMAIL_CONFIG.DEFAULT_SENDER.NAME} <${EMAIL_CONFIG.DEFAULT_SENDER.EMAIL}>`,
						subject,
						[type]: content.body || content
					});
				}

				results.push({ email: recipient, success: true });

				// Add delay between emails
				if (i < recipients.length - 1) {
					await new Promise(resolve =>
						setTimeout(resolve, EMAIL_CONFIG.RATE_LIMITS.BULK_EMAIL_DELAY)
					);
				}

			} catch (error) {
				console.error(`Failed to send email to ${recipients[i]}:`, error);
				results.push({
					email: recipients[i],
					success: false,
					error: error instanceof Error ? error.message : 'Unknown error'
				});
			}
		}

		await event.locals.nodemailer.dispose();

		const successCount = results.filter(r => r.success).length;
		const failureCount = results.length - successCount;

		return json({
			success: true,
			message: `Bulk email completed: ${successCount} sent, ${failureCount} failed`,
			results
		});

	} catch (error) {
		console.error('Bulk email error:', error);
		return json({
			success: false,
			error: error instanceof Error ? error.message : 'Unknown error'
		}, { status: 500 });
	}
};