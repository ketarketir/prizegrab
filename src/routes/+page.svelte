<script lang="ts">
	import { onMount } from 'svelte';
	import { MetaTags } from 'svelte-meta-tags';
	import FormAuth from '@/components/form-auth.svelte';
	import PrizeList from '@/components/prize-list.svelte';
	import WinnerVideo from '@/components/winner-video.svelte';
	import FakeBoxWinner from '@/components/fake-box-winner.svelte';

	let { data } = $props();
	let metaTags = $derived(data.pageMetaTags);

	let openVideoDialog = $state(false);
	let openRegisterForm = $state(false);
	let totalWinners = $state(12847);
	let onlineUsers = $state(234);

	function handleAnchorClick(event: MouseEvent) {
		event.preventDefault();
		const link = event.currentTarget as HTMLAnchorElement;
		const anchorId = new URL(link?.href).hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor?.offsetTop,
			behavior: 'smooth'
		});
		openRegisterForm = true;
	}
	onMount(() => {
		const salesInterval = setInterval(() => {
			if (Math.random() > 0.7) {
				// 30% chance
				totalWinners += Math.floor(Math.random() * 3) + 1;
			}
		}, 2000);

		const usersInterval = setInterval(() => {
			// Simulate users coming and going
			const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
			onlineUsers = Math.max(100, onlineUsers + change);
		}, 5000);

		return () => {
			clearInterval(salesInterval);
			clearInterval(usersInterval);
		};
	});
</script>

<MetaTags {...metaTags} />
<div class="pgbg">
	<div class="container">
		<!-- Landing -->
		<FormAuth bind:open={openRegisterForm} formSchema={data.formRegister} />

		<!-- Hero -->
		<div id="l-hero" class="row mt-lg-5 mt-4">
			<div class="l-hero__banner col-12"></div>
			<div class="mb-lg-0 col-lg-4 l-hero__col--randy-video video-play col-12 mb-2 p-0">
				<div
					class="popup-youtube"
					aria-label="Watch Randy win $10,000 on YouTube"
					role="button"
					onclick={(e) => {
						e.preventDefault();
						openVideoDialog = true;
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							openVideoDialog = true;
						}
					}}
					tabindex="0"
				>
					<div class="angled-bg d-none d-lg-block"></div>
					<img
						src="//cdn.prizegrab.com/media/img/prizes/randy.png"
						alt="Randy holding prize check"
					/>
				</div>
			</div>
			<div class="mb-lg-0 col-lg-4 l-hero__col--randy-won col-12 mb-2 bg-white p-5 text-center">
				<div class="l-hero__title text-uppercase mb-3">Randy Won $10,000 on PrizeGrab</div>
				<p>And so could you! We’ve awarded over $2,000,000 in prizes! We have winners every day!</p>
				<div
					class="l-hero__link bold-link popup-youtube"
					aria-label="Watch Randy win $10,000 on YouTube"
					role="button"
					onclick={(e) => {
						e.preventDefault();
						openVideoDialog = true;
					}}
					onkeydown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							openVideoDialog = true;
						}
					}}
					tabindex="0"
				>
					Watch our $10,000 delivery
				</div>
			</div>
			<div class="l-hero__col--winners d-none d-lg-block col-lg-4 p-5">
				<div class="l-hero__title--small text-uppercase mb-3">Recent Winners</div>
				<table class="table-sm">
					<tbody
						><tr>
							<td><div>Rita Sigafus</div></td>
							<td><div>Loudon, TN</div></td>
						</tr>

						<tr>
							<td><div>James Mullens</div></td>
							<td><div>Island Lake, IL</div></td>
						</tr>

						<tr>
							<td><div>Tom Bolton</div></td>
							<td><div>Cudahy, WI</div></td>
						</tr>

						<tr>
							<td><div>Sharon Wyse</div></td>
							<td><div>Inglewood, CA</div></td>
						</tr>

						<tr>
							<td><div>Gary Hangartner</div></td>
							<td><div>San Diego, CA</div></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Featured Winners -->
		<div id="l-featured-winners" class="row mt-lg-5 mt-4">
			<div class="col-lg-3 l-featured-winners__photo col-6 p-0">
				<img
					class="img-fluid"
					src="//cdn.prizegrab.com/static/img/prizes/thurmond_memphis__calphalon_cookset.png"
					alt=""
				/>
			</div>
			<div class="col-lg-3 l-featured-winners__quote edge--bottom col-6">
				I enjoy playing every day! We are so happy! Thank you PrizeGrab!
				<div class="l-featured-winners__quote--name pt-1">Thurmond R.</div>
			</div>
			<div class="d-block d-lg-none col-12 my-2"></div>
			<div class="col-lg-3 l-featured-winners__photo col-6 p-0">
				<img
					class="img-fluid"
					src="//cdn.prizegrab.com/static/img/prizes/kirsten_chattanooga__5000cash.png"
					alt=""
				/>
			</div>
			<div class="col-lg-3 l-featured-winners__quote callout-2 edge--bottom col-6">
				Thank you all so much! I love playing PrizeGrab! You're the best website out there!
				<div class="l-featured-winners__quote--name pt-1">Kirsten S.</div>
			</div>
		</div>
	</div>
</div>

<div class="container space-y-5">
	<!-- Featured Winners -->
	<div id="l-featured-winners" class="row mt-lg-5 mt-4">
		<div class="col-lg-3 l-featured-winners__photo col-6 p-0">
			<img class="img-fluid" src="https://cdn.prizegrab.com/media/img/prizes/image_23.png" alt="" />
		</div>
		<div class="col-lg-3 l-featured-winners__quote edge--bottom col-6">
			Thanks very much, I finally got a good entry and I can’t begin to tell you how much it means
			to me.
			<div class="l-featured-winners__quote--name pt-1">James Mullens.</div>
		</div>
		<div class="d-block d-lg-none col-12 my-2"></div>
		<div class="col-lg-3 l-featured-winners__photo col-6 p-0">
			<img
				class="img-fluid"
				src="https://cdn.prizegrab.com/media/img/prizes/prizegrab-5k-cash-2-sweepstakes.jpg"
				alt=""
			/>
		</div>
		<div class="col-lg-3 l-featured-winners__quote callout-2 edge--bottom col-6">
			Thank you so so much, it comes as I am playing catch up from my car breaking down.
			<div class="l-featured-winners__quote--name pt-1">Richard James.</div>
		</div>
	</div>
	<PrizeList {handleAnchorClick} />
	<!-- Recent Activities -->
	<div class="space-y-6">
		<FakeBoxWinner title="Live Winners" maxItems={25} autoScroll={true} scrollSpeed={30} />
	</div>
</div>
{#if openVideoDialog}
	<WinnerVideo
		bind:open={openVideoDialog}
		videoId="iMNLin1d484"
		onclose={() => (openVideoDialog = false)}
	/>
{/if}
