<script lang="ts">
	let {
		handleAnchorClick
	}: {
		handleAnchorClick: (e: MouseEvent) => void;
	} = $props();
	const prizeList = [
		{
			label: '$10,000.00 Cash',
			images: 'https://cdn.prizegrab.com/media/img/prizes/prizegrab-10k-2020-sweepstakes.jpg',
			ending: 'Ends Dec 8, 2025'
		},
		{
			label: '$2,500.00 Cash',
			images: 'https://cdn.prizegrab.com/media/img/prizes/cash-bg-6.jpg',
			ending: 'Ends Jan 12, 2026'
		},
		{
			label: 'Indoor Stationary Bike',
			images: 'https://cdn.prizegrab.com/media/img/prizes/Indoor_Stationary_Bike.png',
			ending: 'Ends Mar 9, 2026'
		},
		{
			label: '$100.00 Cash',
			images: 'https://cdn.prizegrab.com/media/img/prizes/100.jpg',
			ending: 'Ends Sep 29, 2025'
		},
		{
			label: '$4,567.89 Cash',
			images: 'https://cdn.prizegrab.com/media/img/prizes/cash-bg-1.jpg',
			ending: 'Ends Jan 26, 2026'
		},
		{
			label: '$7,000.00 Cash',
			images: 'https://cdn.prizegrab.com/media/img/prizes/prizegrab-7000-2021-sweepstakes.jpg',
			ending: 'Ends Dec 22, 2025'
		},
		{
			label: 'Dell Inspiron Laptop',
			images: 'https://cdn.prizegrab.com/media/img/prizes/Dell_Inspiron_Laptop.png',
			ending: 'Ends Jan 19, 2026'
		},
		{
			label: '$750.00 Southwest Airlines Gift Card',
			images: 'https://cdn.prizegrab.com/media/img/prizes/sw_gc_rHUmEIR.png',
			ending: 'Ends Mar 23, 2026'
		},
		{
			label: '$2,222.00 Cash',
			images: 'https://cdn.prizegrab.com/media/img/prizes/cash-bg-2.jpg',
			ending: 'Ends Sep 15, 2025'
		},
		{
			label: '$300.00 Home Depot Gift Card',
			images: 'https://cdn.prizegrab.com/media/img/prizes/home_depot_UUhp0Yn.png',
			ending: 'Ends Oct 6, 2025'
		},
		{
			label: '$300.00 Cash',
			images: 'https://cdn.prizegrab.com/media/img/prizes/300.jpg',
			ending: 'Ends Oct 31, 2025'
		},
		{
			label: '$25,000.00 Cash',
			images: 'https://cdn.prizegrab.com/media/img/prizes/prizegrab-25k-2020-sweepstakes.jpg',
			ending: 'Ends Dec 25, 2025'
		}
	];
</script>

<div id="l-new-prizes">
	<div class="row mt-lg-5 mt-4">
		<div class="order-md-1 order-1 col-12">
			<div class="l-new-prizes__title text-uppercase">New Prizes Weekly</div>
		</div>
		<div class="col-md-9 order-md-2 order-2 col-12">
			<div class="l-new-prizes__copy pt-2">
				PrizeGrab makes it easy and fun to enter a variety of <span class="l-new-prizes__link">
					online sweepstakes
				</span>
				. Piles of cash and hot gadgets are always up for grabs whether you're on your PC or mobile device.
				Play now, it's free!
			</div>
		</div>

		<div class="order-md-4 order-3 my-3 w-100"></div>

		{#each prizeList as prize, i (i)}
			<a
				href="#l-landing"
				class="col-md-4 l-new-prizes__prize-image order-md-5 order-4 col-12"
				onclick={handleAnchorClick}
			>
				<div title={prize.label} aria-label={prize.label}>
					<div
						class="l-new-prizes__prize-image-imgcontainer"
						aria-label={prize.label}
						style={`background-image: url('${prize.images}')`}
					></div>
				</div>
				<div class="l-new-prizes__prize-ending text-uppercase text-center">
					<div>{prize.ending}</div>
				</div>
			</a>
		{/each}
	</div>
</div>
