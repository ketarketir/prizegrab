import type { MetaTagsProps, MetaTag, LinkTag } from 'svelte-meta-tags';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { contactSchema, type ContactSchema } from '@/utils/form-schema.js';

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
		title: 'Contact - PrizeGrab',
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
			title: 'Contact - PrizeGrab',
			description: "PrizeGrab - Daily Sweepstakes! You can win Cash Prizes, Electronics, TV's, iPads, Gift Cards and More!",
			siteName: 'Contact - PrizeGrab',
			images: [
				{
					url: `/pg-192.webp`,
					alt: 'Contact - PrizeGrab',
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

	const formContact = await superValidate(zod(contactSchema));
	return {
		pageMetaTags,
		formContact
	}
}
export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(contactSchema));
		if (!form.valid) {
			return fail(400, {
				success: false,
				form,
				error: { message: 'Invalid input', fields: form.errors }
			});
		}
		try {
			await locals.nodemailer.sendTextEmail({
				to: ["santisimilikiti93@gmail.com", "jgal70594@gmail.com"],
				from: "contact@prizegrab.com",
				subject: form.data.subject,
				message: form.data.message,

			})
			return {
				success: true,
				form,
				message: 'Message send successfully!.',
			};
		} catch (error) {
			console.error('Message submission error:', error);

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
				error: { message: "Send message failed. Please try again." }
			});
		}
	}
}
function createContactHtml(formData: ContactSchema) {
	const currentDate = new Date().toLocaleString();
	return `<!doctype html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>New Contact Message From ${formData.name}</title>
				<style>
					body {
						margin: 0;
						padding: 0;
						font-family: Arial, sans-serif;
						background-color: #f4f4f4;
						line-height: 1.6;
					}
					.container {
						max-width: 600px;
						margin: 0 auto;
						background-color: #ffffff;
						border-radius: 8px;
						overflow: hidden;
						box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
					}
					.header {
						background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
						color: white;
						padding: 40px 20px;
						text-align: center;
					}
					.header h1 {
						margin: 0;
						font-size: 28px;
						font-weight: 300;
					}
					.content {
						padding: 40px 30px;
					}
					.welcome-message {
						font-size: 18px;
						color: #333;
						margin-bottom: 30px;
					}
					.info-box {
						background-color: #f8f9fa;
						border-left: 4px solid #667eea;
						padding: 20px;
						margin: 20px 0;
					}
					.button {
						display: inline-block;
						background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
						color: white;
						padding: 15px 30px;
						text-decoration: none;
						border-radius: 5px;
						font-weight: bold;
						margin: 20px 0;
						text-align: center;
					}
					.button:hover {
						opacity: 0.9;
					}
					.footer {
						background-color: #f8f9fa;
						padding: 30px;
						text-align: center;
						color: #666;
						border-top: 1px solid #e9ecef;
					}
					.social-links {
						margin-top: 20px;
					}
					.social-links a {
						display: inline-block;
						margin: 0 10px;
						color: #667eea;
						text-decoration: none;
					}
					@media only screen and (max-width: 600px) {
						.container {
							margin: 0 10px;
						}
						.content {
							padding: 20px 15px;
						}
					}
				</style>
			</head>
			<body>
				<div class="container">
					<div class="header">
						<h1>Dear Teams!</h1>
					</div>

					<div class="content">
						<div class="welcome-message">
							<h2>${formData.subject}!</h2>
							<p>
								${formData.message}
							</p>
						</div>

						<div class="info-box">
							<h3>User Details:</h3>
							<p><strong>Name:</strong> ${formData.name}</p>
							<p><strong>Email:</strong> ${formData.email}</p>
							<p><strong>Email:</strong> ${formData.subject}</p>
							<p><strong>Message Date:</strong> ${currentDate}</p>
						</div>
					</div>

					<div class="footer">
						<p>Thank you!</p>
						<p>Best regards,<br />${formData.name}</p>

						<div class="social-links">
							<a href="https://twitter.com/yourapp">Twitter</a>
							<a href="https://facebook.com/yourapp">Facebook</a>
							<a href="https://linkedin.com/company/yourapp">LinkedIn</a>
						</div>

						<p style="font-size: 12px; margin-top: 30px">
							This email was sent from contact page.
							email.
							<br />
							<a href="{{unsubscribeLink}}" style="color: #666">Unsubscribe</a> |
							<a href="https://yourapp.com/privacy" style="color: #666">Privacy Policy</a>
						</p>
					</div>
				</div>
			</body>
		</html>
		`
}