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
				<h1 class="text-right">About PrizeGrab</h1>
			</div>
		</div>
	</div>
	<div class="page-pg about-page container">
		<div class="row">
			<div class="col-12">
				<h2>PrizeGrab is the Real Deal</h2>
				<img
					src="//cdn.prizegrab.com/static/img/about-us.jpg"
					alt=""
					class="about-img"
					style="float: left;"
				/>
				<p>
					PrizeGrab guarantees <strong>Real Winners Every Day</strong>. PrizeGrab was born when two
					Cashanovas decided to change people’s lives by giving away prizes and cash. The passion
					for giving away prizes is fueled by the thrill they have when seeing and hearing about
					winning moments.
				</p>
				<p>
					The Cashanovas and the PrizeGrab Team started by building a website in 2013 to create a
					safe, fun environment to play sweepstakes. Over time, they have given away more than $2.3
					Million in prizes to more than 10,000 winners.
				</p>
				<p>
					Eight years later, PrizeGrab has grown to be a household name and trusted sweepstakes
					brand. The Cashanovas continue their quest to travel America surprising winners. What
					started as a two-man operation now proudly employs 15 hardworking PrizeGrab associates.
				</p>
				<p>
					The PrizeGrab Team is extremely passionate and interact with members daily. Winners are
					chosen at random, but PrizeGrab associates make sure there are multiple daily winners
					announced and that they are offering prizes that PrizeGrabbers want and need.
				</p>
				<p><strong>Mission</strong></p>
				<p>
					Our goal is to positively impact PrizeGrabbers by inspiring hope and joy in everyday life.
					We believe any individual has the opportunity to sign up easily and enter to win prizes.
					Unlike other sweepstakes sites, personal information like telephone numbers and addresses
					is not required to sign up. Additionally, we want to offer a variety of prizes that all
					users would enjoy.
				</p>
				<p><strong>Innovation</strong></p>
				<p>
					PrizeGrab is the #1 sweepstakes site in America. Members are inspired to tailor PrizeGrab
					to their preference, entering to win cash or prizes that they are specifically interested
					in. The PrizeGrab team often asks members what prizes they would like to see on the site
					and accommodate those requests in real-time.
				</p>
				<p><strong>PrizeGrab Team</strong></p>
				<p>
					PrizeGrab is supported by a creative and diverse global team that uses innovative
					marketing techniques to elevate PrizeGrab member's experience.
				</p>
				<p><strong>The Future of Sweepstakes</strong></p>
				<p>Real - Guarantees Real Winners Every Day</p>
				<p>Genuine - Transparent intentions and genuine experiences</p>
				<p>Simple - Simple signup and free to play</p>
			</div>
		</div>
	</div>
</div>
