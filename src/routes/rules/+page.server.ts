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
		title: 'PrizeGrab Official Rules',
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
			title: 'PrizeGrab Official Rules',
			description: "PrizeGrab - Daily Sweepstakes! You can win Cash Prizes, Electronics, TV's, iPads, Gift Cards and More!",
			siteName: 'PrizeGrab Official Rules',
			images: [
				{
					url: `/pg-192.webp`,
					alt: 'PrizeGrab Official Rules',
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