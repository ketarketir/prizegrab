import type { MetaTagsProps, MetaTag, LinkTag } from 'svelte-meta-tags';

export const load = async (event) => {
	const { url } = event
	const defaultOrigin = `https://${new URL(url.pathname, url.origin).href}`;
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
		title: "PrizeGrab.com Blog - Funny videos, news and sweepstakes you'll love!",
		description: "Funny videos, news and sweepstakes you'll love!",
		keywords: ["Sweepstakes", "Giveaway", "Free Money", "Gift", "Prizes", " Lottery"],
		robots: 'index,follow',
		canonical: defaultOrigin,
		additionalMetaTags: metaTag,
		additionalLinkTags: linkTag,
		openGraph: {
			type: 'blog',
			url: defaultOrigin,
			locale: 'en_IE',
			title: "PrizeGrab.com Blog - Funny videos, news and sweepstakes you'll love!",
			description: "Funny videos, news and sweepstakes you'll love!",
			siteName: "PrizeGrab.com Blog - Funny videos, news and sweepstakes you'll love!",
			images: [
				{
					url: `/pg-192.webp`,
					alt: "PrizeGrab.com Blog - Funny videos, news and sweepstakes you'll love!",
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