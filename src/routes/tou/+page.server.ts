import type { MetaTagsProps, MetaTag, LinkTag } from 'svelte-meta-tags';

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
		title: 'Terms of Use - PrizeGrab',
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
			title: 'Terms of Use - PrizeGrab',
			description: "PrizeGrab - Daily Sweepstakes! You can win Cash Prizes, Electronics, TV's, iPads, Gift Cards and More!",
			siteName: 'Terms of Use - PrizeGrab',
			images: [
				{
					url: `/pg-192.webp`,
					alt: 'Terms of Use - PrizeGrab',
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

	return {
		pageMetaTags
	}
}