import type { MetaTagsProps, MetaTag, LinkTag } from 'svelte-meta-tags';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { unsubscribeSchema, type UnsubscribeSchema } from '@/utils/form-schema.js';

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
		title: 'Unsubscribe - PrizeGrab',
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
			title: 'Unsubscribe - PrizeGrab',
			description: "PrizeGrab - Daily Sweepstakes! You can win Cash Prizes, Electronics, TV's, iPads, Gift Cards and More!",
			siteName: 'Unsubscribe - PrizeGrab',
			images: [
				{
					url: `/pg-192.webp`,
					alt: 'Unsubscribe - PrizeGrab',
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


	const unsubscribeForm = await superValidate(zod(unsubscribeSchema));
	return {
		pageMetaTags,
		unsubscribeForm
	}
}
export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(unsubscribeSchema));
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
				subject: "Unsubscribe user",
				message: `Unsubscribe user from email ${form.data.email}`,

			})
			return {
				success: true,
				form,
				message: 'Unsubscribe successfully!.',
			};
		} catch (error) {
			console.error('Unsubscribe submission error:', error);

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
				error: { message: "Unsubscribe failed. Please try again." }
			});
		}
	}
}