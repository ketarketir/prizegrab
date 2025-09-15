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
				<h1 class="text-right">Terms of Use</h1>
			</div>
		</div>
	</div>
	<div class="page-pg container">
		<div class="row">
			<h4>What is PrizeGrab?</h4>
			<p>
				PrizeGrab guarantees <strong>Real Winners Every Day</strong>. Sweepstakes should be simple:
				pick your prize and enter to win.
			</p>
			<p>
				Since 2013, PrizeGrab has been giving away prizes and cash, establishing itself as a
				household name and trusted sweepstakes site.
			</p>
			<h4>Is PrizeGrab real?</h4>
			<p>
				Yes. By guaranteeing Real Winners Every Day, we have thousands of testimonials from
				PrizeGrab members who have won once or multiple times.
			</p>
			<p>
				Need to see it to believe it? Check out our page on Trustpilot.com. Prize winners rated
				PrizeGrab with 4.7 out of 5 stars. PrizeGrab has given away more than $2.3 million in prizes
				to over 10,000 lucky winners.
			</p>
			<p>
				PrizeGrab takes the safety of our members seriously. Winners are only notified via email and
				PrizeGrab never asks for payment.
			</p>
			<h4>Do people really win?</h4>
			<p>
				Yes. Winners are announced daily in PrizeGrab emails and on the <strong
					><a href="/">Winners</a></strong
				> page. There are at least 2 winners announced every day so make sure to subscribe to our email
				list.
			</p>
			<h4>How do I win?</h4>
			<p>
				Enter to win from the prizes page to maximize your entries permitted per prize per day. The
				more entries you have for a prize, the more chances you have to win.
			</p>
			<h4>What are my odds of winning?</h4>
			<p>
				Odds can fluctuate based on the prize value and duration. We urge all members to maximize
				their entries daily so they have the best odds of winning.
			</p>
			<h4>How do I know if I won?</h4>
			<p>
				PrizeGrab contacts winners at the email address you signed up with at PrizeGrab. Check your
				email daily!
			</p>
			<p>
				Email is the only way we will notify you if you've won. Add contact@prizegrab.com to your
				Address Book and make sure it's not going to Spam or Junk folders.
			</p>

			<h4>What are "entry streaks"?</h4>
			<p>
				10 entries in a single day start an entry streak. Reach 10 or more entries each day to
				continue streaking. The longer the streak, the more points and bonus entry opportunities
				will become available.
			</p>

			<h4>How do I earn points?</h4>
			<p>
				PrizeGrabbers can now earn points by entering prizes, reaching and extending an entry
				streak, returning for consecutive days, and more! Each achievement will add points to your
				account, and those points will result in some incredible bonus opportunities. Track your
				points and achievements in <strong><a href="/">Your Account</a></strong>.
			</p>

			<h4>What are points worth?</h4>
			<p>
				While there is no specific monetary value, collecting points will catapult you to higher
				levels. From bronze to silver, silver to gold - advance to more than a dozen levels! As you
				advance to higher levels you will be rewarded with larger bonus prize opportunities.
			</p>

			<h4>Is it possible to win more than one prize at a time?</h4>
			<p>
				Yes, it is possible to win more than one prize at a time. Prize drawings are automated
				processes. We have over 2,500 members who have won multiple times <strong
					>(yes, really!)</strong
				>. Check out this blog post highlighting
				<strong><a href="/">Francisco's 5 wins on PrizeGrab.</a></strong>
			</p>
			<h4>If I win do I have to pay shipping costs for the prize?</h4>
			<p>No, PrizeGrab never asks for members to pay to receive a prize.</p>

			<h4>Can prizes be transferred?</h4>
			<p>
				No, the actual winner must claim the prize. Winners cannot transfer the prize to another
				person in the event that they do not want the prize.
			</p>
			<h4>Can I play from my mobile device?</h4>
			<p>
				Yes. We've made sure you can play PrizeGrab anywhere you are—whether you're on your PC,
				mobile device, or tablet.
			</p>
			<p>All you need is to login or join now.</p>
			<h4>Who can win?</h4>
			<p>
				PrizeGrab.com sweepstakes is open to legal residents of the fifty (50) United States
				(including District of Columbia), Guam, Puerto Rico, U.S. Virgin Islands, and other U.S.
				territories who are eighteen (18) years or older at the time of entry. Void outside of the
				fifty (50) United States, District of Columbia, Guam, Puerto Rico, U.S. Virgin Islands, and
				where prohibited by law.
			</p>
			<p>Employees of PrizeGrab.com and their close family/household members are not eligible.</p>
			<h4>How do I enter?</h4>
			<p>
				Login or signup at PrizeGrab from your laptop, phone or tablet. Choose a prize you are
				interested in and click “enter now”. After your 1-click entry, you'll see a "Processing
				Entry" confirmation and that's it!
			</p>
			<p>
				You can continue entering to win any of your favorite prizes on PrizeGrab. Go to the Prizes
				page to see all available prizes.
			</p>
			<p>
				PrizeGrabbers can also enter exclusive sweepstakes from PrizeGrab emails. These prizes are
				not always available on the <a href="/">Prizes page</a>, so make sure you check your email
				daily for email-only exclusives!
			</p>
			<h4>Can I follow PrizeGrab on social media?</h4>
			<p>
				Yes! Follow us on <a href="http://facebook.com/PrizeGrab/">Facebook</a> and
				<a href="http://twitter.com/PrizeGrab">Twitter</a> for exclusive chances to win!
			</p>
			<h4>What is a Cashanova?</h4>
			<p>
				Cashanovas are PrizeGrab associates who love giving away cash and prizes. You may have seen
				Cashanova’s Adam and Greg in videos giving PrizeGrab winners a massive check. AJ is our
				Cashanova intern, he loves being on camera and you might have seen him on our Facebook page!
			</p>
			<h4>Does it cost anything to enter?</h4>
			<p>
				Entering is FREE! Just go to PrizeGrab.com and create a free account. Once you have an
				account you will be able to enter all of our sweepstakes for free.
			</p>
			<h4>How many times can I enter per day?</h4>
			<p>
				Each prize on Prizegrab has a different maximum allowable entries per day. Sometimes 5
				entries are permitted per day, sometimes only one per day! Check out the Prizegrab Prizes
				page and see each prize's Official Rules.
			</p>
			<p>Bonus entries are sent via email – double or triple chances to win.</p>
			<p>Remember, each "day" refers to 12AM ET - 11:59PM ET.</p>
			<h4>When do you add new prizes?</h4>
			<p>
				The PrizeGrab team is constantly adding new prizes. Cash, electronics, Apple products, Gift
				Cards and other items that PrizeGrabbers have requested via email and on Facebook.
			</p>
			<h4>I have an idea for a prize?</h4>
			<p>The PrizeGrab team would love to hear from you.</p>
			<p>
				Email Hope, PrizeGrab Community Manager, with your comments at Contact@PrizeGrab.com. She
				reads all emails and sincerely appreciates suggestions and recommendations.
			</p>

			<h4>How do you deliver prizes?</h4>
			<p>
				Our Prize Fulfillment team makes sure that all prizes are awarded as offered. Since prizes
				come in all shapes and sizes, from a fridge to an e-gift card, our dedicated team will work
				with the winner to find the best method of delivery.
			</p>

			<h4>I forgot my password. How can I reset it?</h4>
			<p>
				You can reset your password by clicking Login from the top menu, then clicking the "Reset
				Password" in that window. Or you can reset your password by clicking this link:
				<a href="/">http://prizegrab.com/account/password/reset/</a>
			</p>
			<h4>I have an issue. Where can I report it?</h4>
			<p>Please contact our support department at Help@PrizeGrab.com.</p>
			<h4>I think I am being scammed. What should I do?</h4>
			<p>Please review our <a href="/">Fraud Prevention</a> page and contact us immediately.</p>
		</div>
	</div>
</div>

<style scoped>
	h4 {
		width: 100%;
		color: #fc494d;
		font-family: 'proxima-sbold', 'Helvetica Neue', Helvetica, arial, sans-serif;
		font-size: 28px;
		margin-top: 25px;
	}

	p {
		font-size: 18px;
		color: #767a7b;
		line-height: 24px;
	}
</style>
