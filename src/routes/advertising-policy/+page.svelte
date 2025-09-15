<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';

	let { data } = $props();
	let metaTags = $derived(data.pageMetaTags);
</script>

<MetaTags {...metaTags} />
<div class="pg__wrap" style="min-height: calc(100vh - 379px);">
	<div class="header-wrap-pg">
		<div class="header-pg container flex items-center justify-center">
			<div class="row">
				<h1 class="text-right">Advertising Policy</h1>
			</div>
		</div>
	</div>
	<div class="page-pg container">
		<h2>Fun Grab LLC</h2>

		<p>
			The Fun Grab LLC Advertising Policy applies to all digital advertising services provided by or
			on behalf of Fun Grab LLC ("PrizeGrab") brands, including (i) advertising on websites, mobile
			or wireless devices, and electronic newsletters and (ii) other digital advertising services
			provided by or on behalf of PrizeGrab, including digital advertising using third party
			technologies or services (collectively, “Digital Advertising”).
		</p>

		<p>
			PrizeGrab requires that advertisers comply with this Advertising Policy below in addition to
			all applicable laws and regulations. When we find content that violates these requirements,
			the content will be blocked from appearing and in cases of repeated or egregious violations,
			we will disable the advertising partner from advertising with us.
		</p>

		<h2><strong>Prohibited / Restricted Content</strong></h2>

		<h3>1. The sale or promotion of counterfeit goods is prohibited.</h3>
		<p>
			Counterfeit goods contain a trademark or logo that is identical to or substantially
			indistinguishable from the trademark of another. They mimic the brand features of the product
			in an attempt to pass themselves off as a genuine product of the brand owner. This policy
			applies to the content of your ad and your website or app.
		</p>

		<h3>2. The promotion of dangerous products or services is prohibited.</h3>
		<p>
			Examples of these products are illegal, or recreational drugs and substances, weapons,
			ammunition, explosive materials, harmful products such as alcohol or tobacco products. Ads
			cannot facilitate or promote illegal services or activities.
		</p>

		<h3>3. Dishonest behavior is prohibited.</h3>
		<p>
			We value fairness, transparency, and honesty. We don't allow the promotion of products or
			services that are designed to enable dishonest behavior.
		</p>
		<p>
			Examples of dishonest behavior are: hacking software, fake brands or accounts, or multi-level
			marketing. Ads promoting income opportunities must fully describe the associated product or
			business model, and must not promote business models offering quick compensation for little
			investment.
		</p>

		<h3>4. Inappropriate and controversial content is prohibited.</h3>
		<p>
			We do not allow ads that display shocking content, profanity, promote intolerance,
			discrimination, violence or controversial social issues.
		</p>

		<h3>5. Third-party infringement is prohibited.</h3>
		<p>
			PrizeGrab abides by copyright laws and protect the rights of copyright holders. Ads must not
			contain content that infringes upon trademark, privacy or proprietary rights.
		</p>

		<h3>6. Adult content is prohibited.</h3>
		<p>
			Adult content contains but is not limited to adult products or services for family planning
			and contraceptive. Ads cannot contain nudity, depictions of people in suggestive positions, or
			activities that are sexually provocative.
		</p>

		<h3>7. Real Money gambling is prohibited.</h3>
		<p>
			Ads that promote or facilitate online real money gambling, real money lotteries, casino,
			sportsbook, bingo or poker are prohibited.
		</p>

		<h3>8. Political content</h3>
		<p>
			We support responsible political advertising and expect all political ads and destinations to
			comply with local campaign and election laws for any areas they target.
		</p>

		<h3>9.Financial services content</h3>
		<p>
			We want users to have adequate information to make informed financial decisions. You must give
			users information to weigh the costs associated with financial products and services, and to
			protect users from harmful or deceitful practices.
		</p>

		<h3>10.Legal requirements</h3>
		<p>
			You are always responsible for ensuring that you comply with all applicable laws and
			regulations, in addition to this Advertising Policy, for all of the locations where your ads
			are showing.
		</p>

		<h2><strong>Prohibited Practices</strong></h2>

		<h3>1. Misuse of ads is prohibited.</h3>
		<p>
			We do not allow advertisers to run ads or content that attempt to trick or circumvent our ad
			review. Examples of misuse include content containing malware, "cloaking" or otherwise
			manipulating the user experience to hide the true destination that users are direct to.
		</p>

		<h3>2. Misrepresentation of data collection and use is prohibited.</h3>
		<p>
			We do not allow advertisers to misuse user information they collect, or collect it for unclear
			purposes or without appropriate security measures.
		</p>
	</div>
</div>
