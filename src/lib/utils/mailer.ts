import type { RequestEvent } from "@sveltejs/kit";

export async function sendWelcomeEmail(userData: UserData, event: RequestEvent) {
	const { locals } = event
	try {
		await locals.nodemailer.sendTemplateEmail({
			to: userData.email || "",
			from: "welcome@yourapp.com",
			subject: `Welcome to Our App, ${userData.name}!`,
			templatePath: "./templates/welcome.html",
			templateVariables: {
				userName: userData.name,
				userEmail: userData.email,
				activationLink: `https://yourapp.com/activate?token=${userData.id}`
			}
		});

		console.log(`Welcome email sent to ${userData.email}`);
	} catch (error) {
		console.error("Failed to send welcome email:", error);
		throw error;
	} finally {
		await locals.nodemailer.dispose();
	}
}
export async function sendBulkEmailWithFiles(
	recipients: string[],
	subject: string,
	htmlContent: string,
	filePaths: string[],
	event: RequestEvent
) {
	const { locals } = event
	try {
		// Create attachments from file paths
		const attachments: Attachment[] = filePaths.map(filePath =>
			locals.nodemailer.createFileAttachment(filePath)
		);

		// Send to multiple recipients
		for (const recipient of recipients) {
			await locals.nodemailer.sendEmailWithAttachments(
				recipient,
				"bulk@yourapp.com",
				subject,
				{ html: htmlContent },
				attachments
			);

			// Small delay to avoid rate limiting
			await new Promise(resolve => setTimeout(resolve, 100));
		}

		console.log(`Bulk email sent to ${recipients.length} recipients`);
	} catch (error) {
		console.error("Bulk email sending failed:", error);
		throw error;
	} finally {
		await locals.nodemailer.dispose();
	}
}

export { EMAIL_CONFIG } from './email-config';
export * from './email-validator';
export * from './template-processor';
export * from './rate-limiter';
export * from './email-queue';