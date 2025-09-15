<script lang="ts" module>
	type Notification = {
		id: number;
		user: string;
		product: string;
		price: string;
		image: string;
		category: string;
		status: string;
		date: string;
		time: string;
	};
</script>

<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let {
		title = 'New winner',
		maxItems = 20,
		autoScroll = true,
		scrollSpeed = 50 // pixel per detik
	}: {
		title?: string;
		maxItems?: number;
		autoScroll?: boolean;
		scrollSpeed?: number;
	} = $props();

	let purchases = $state<Notification[]>([]);
	let marqueeContainer = $state<HTMLDivElement>();
	let isPaused = $state(false);

	const fakeUsers = [
		'James Mullens',
		'Kathlyn Valianti',
		'Matt Beirl',
		'James Webster',
		'Rita Sigafus',
		'Birl Smith',
		'Tom Bolton',
		'Sharon Wyse',
		'Gary Hangartner',
		'Ken Lynn Trimpe',
		'Clare Smith',
		'Lorie Geyer',
		'Ann Patton',
		'Shirley Johnson',
		'Pamela Arismendez',
		'Glenn Willey',
		'Ken Kerstein',
		'James Curry',
		'Stephen Mann',
		'Lisa Sikes',
		'Michele Stemples',
		'Lynn Watson',
		'Evelyn Costi',
		'Richard James',
		'Susan Adams',
		'Mary kay Straka',
		'Michael Hernandez'
	];
	const fakeProducts = [
		{
			name: '$500.00 Cash App',
			price: '$500.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/image_23.png',
			category: 'Cash'
		},
		{
			name: '$50.00 Daily Dozen Cash',
			price: '$50.00',
			images:
				'https://t4.ftcdn.net/jpg/00/05/18/93/360_F_5189300_4oEJSg9pMviaRZm4jv601R7gRUclkfif.jpg',
			category: 'Cash'
		},
		{
			name: 'Daily $50.00 Target Gift Card',
			price: '$50.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/New_Target.jpg',
			category: 'Gift Card'
		},
		{
			name: '$50.00 Amazon.com Gift Card',
			price: '$50.00',
			images: 'https://m.media-amazon.com/images/I/51lcnBqAnvL.jpg',
			category: 'Gift Card'
		},
		{
			name: '$350.00 Cash',
			price: '$350.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/cash_pile.jpeg',
			category: 'Cash'
		},
		{
			name: '$150.00 Weekly Cash',
			price: '$150.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/50_weekly_cash.png',
			category: 'Cash'
		},
		{
			name: '$5,000 Cash',
			price: '$5,000.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/prizegrab-5k-cash-2-sweepstakes.jpg',
			category: 'Cash'
		},
		{
			name: '$500.00 Grocery Stimulus Cash',
			price: '$500.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/groceries2_1.png',
			category: 'Cash'
		},
		{
			name: 'Portable iPhone Charger',
			price: '$30.00',
			images:
				'https://target.scene7.com/is/image/Target/GUEST_5bbfb5f6-c55d-4cf5-956b-6c7a5057aac7',
			category: 'Electronics'
		},
		{
			name: 'Chromebook Laptop',
			price: '$1,300.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/Chromebook_Laptop.png',
			category: 'Electronics'
		},
		{
			name: '$300.00 Sephora Gift Card',
			price: '$300.00',
			images: 'https://images-cdn.ubuy.co.id/63d5d35f931f005fd2579d83-sephora-gift-cards.jpg',
			category: 'Gift Card'
		},
		{
			name: 'Sony PlayStation 5',
			price: '$600.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/Sony_PlayStation_5_copy.jpg',
			category: 'Electronics'
		}
	];

	const statusList = ['Succeed', 'Confirmed', 'Processed', 'Completed'];

	function generatePurchase() {
		const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
		const product = fakeProducts[Math.floor(Math.random() * fakeProducts.length)];
		const status = statusList[Math.floor(Math.random() * statusList.length)];

		// Random waktu dalam 5 jam terakhir
		const hoursAgo = Math.floor(Math.random() * 5);
		const minutesAgo = Math.floor(Math.random() * 60);

		const now = new Date();
		const purchaseTime = new Date(
			now.getTime() - hoursAgo * 60 * 60 * 1000 - minutesAgo * 60 * 1000
		);

		return {
			id: Date.now() + Math.random(),
			user,
			product: product.name,
			price: product.price,
			category: product.category,
			image: product.images,
			status,
			time: purchaseTime.toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit'
			}),
			date: purchaseTime.toLocaleDateString('en-US', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric'
			})
		};
	}
	function addPurchase() {
		const newPurchase = generatePurchase();
		purchases = [newPurchase, ...purchases.slice(0, maxItems - 1)];
	}
	// Initialize with some data
	function initializePurchases() {
		const initialPurchases = [];
		for (let i = 0; i < Math.min(maxItems, 15); i++) {
			initialPurchases.push(generatePurchase());
		}
		purchases = initialPurchases;
	}
	function startAutoScroll() {
		if (!marqueeContainer || !autoScroll) return;

		const scroll = () => {
			if (!isPaused && marqueeContainer) {
				marqueeContainer.scrollTop += scrollSpeed / 60; // 60fps

				// Reset scroll jika sudah sampai bawah
				if (
					marqueeContainer.scrollTop >=
					marqueeContainer.scrollHeight - marqueeContainer.clientHeight
				) {
					marqueeContainer.scrollTop = 0;
				}
			}
		};

		const intervalId = setInterval(scroll, 1000 / 60); // 60fps
		return intervalId;
	}
	onMount(() => {
		// Initialize data
		initializePurchases();

		// Add new purchase every 3-8 seconds
		const addPurchaseInterval = setInterval(
			() => {
				addPurchase();
			},
			Math.random() * 5000 + 3000
		);

		// Start auto scroll
		let scrollInterval: ReturnType<typeof setInterval> | undefined;
		if (autoScroll) {
			setTimeout(() => {
				scrollInterval = startAutoScroll();
			}, 1000);
		}

		// Cleanup
		return () => {
			clearInterval(addPurchaseInterval);
			if (scrollInterval) clearInterval(scrollInterval);
		};
	});
	function handleMouseEnter() {
		if (autoScroll) isPaused = true;
	}

	function handleMouseLeave() {
		if (autoScroll) isPaused = false;
	}
	function getCategoryColor(category: string) {
		const colors = {
			'Gift Card': 'bg-blue-100 text-blue-800',
			Cash: 'bg-green-100 text-green-800',
			Electronics: 'bg-gray-100 text-gray-800'
		};
		return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
	}
	function getStatusColor(status: string) {
		const colors = {
			Succeed: 'bg-green-100 text-green-800 border-green-200',
			Confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
			Processed: 'bg-yellow-100 text-yellow-800 border-yellow-200',
			Completed: 'bg-emerald-100 text-emerald-800 border-emerald-200'
		};
		return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
	}
</script>

<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
	<!-- Header -->
	<div class="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
		<div class="flex items-center justify-between">
			<h3 class="flex items-center text-lg font-semibold">
				<svg class="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
					/>
				</svg>
				{title}
			</h3>
			<div class="flex items-center text-sm">
				<div class="mr-2 h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
				Live
			</div>
		</div>
	</div>

	<!-- Purchase List -->
	<div
		bind:this={marqueeContainer}
		class="relative h-96 overflow-y-hidden"
		role="region"
		aria-label="Live purchase updates"
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
	>
		<div class="space-y-1 p-2">
			{#each purchases as purchase, index (purchase.id)}
				<div
					class="rounded-r-lg border-l-4 border-blue-500 bg-gray-50 p-3 transition-colors duration-200 hover:bg-gray-100"
					style="animation: fadeIn 0.5s ease-out;"
				>
					<div class="mb-2 flex items-start justify-between">
						<div class="flex-1">
							<div class="mb-1 flex items-center">
								<span class="text-xs text-gray-600"><Icon icon="fa-user" /></span>
								<span class="mx-2 text-gray-400">•</span>
								<span class="text-sm font-semibold text-gray-900">{purchase.user}</span>
							</div>

							<div class="flex items-center justify-start gap-2 text-center">
								<Avatar.Root>
									<Avatar.Image src={purchase.image} alt={purchase.product} />
									<Avatar.Fallback>{purchase.user.slice(0, 2).toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
								<p class="mt-3 text-sm font-medium text-gray-800">
									{purchase.product}
								</p>
							</div>
						</div>
						<div class="text-right">
							<span class="text-sm font-bold text-green-600">{purchase.price}</span>
						</div>
					</div>

					<div class="flex items-center justify-between">
						<div class="flex items-center space-x-2">
							<span
								class="inline-block rounded-full px-2 py-1 text-xs font-medium {getCategoryColor(
									purchase.category
								)}"
							>
								{purchase.category}
							</span>
							<span
								class="inline-block rounded-full border px-2 py-1 text-xs font-medium {getStatusColor(
									purchase.status
								)}"
							>
								✓ {purchase.status}
							</span>
						</div>
						<div class="text-xs text-gray-500">
							{purchase.date}
							{purchase.time}
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Fade gradient at bottom -->
		<div
			class="pointer-events-none absolute right-0 bottom-0 left-0 h-8 bg-gradient-to-t from-white to-transparent"
		></div>
	</div>

	<!-- Footer Stats -->
	<div class="border-t border-gray-200 bg-gray-50 px-4 py-3">
		<div class="flex items-center justify-between text-sm text-gray-600">
			<span>Total: {purchases.length} winners</span>
			<div class="flex items-center">
				{#if autoScroll}
					<div class="mr-2 h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
					Auto-scroll {isPaused ? 'paused' : 'active'}
				{:else}
					<span>Manual scroll</span>
				{/if}
			</div>
		</div>
	</div>
</div>

<style scoped>
	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* Custom scrollbar */
	.overflow-y-hidden::-webkit-scrollbar {
		width: 4px;
	}

	.overflow-y-hidden::-webkit-scrollbar-track {
		background: #f1f5f9;
	}

	.overflow-y-hidden::-webkit-scrollbar-thumb {
		background: #cbd5e1;
		border-radius: 2px;
	}

	.overflow-y-hidden::-webkit-scrollbar-thumb:hover {
		background: #94a3b8;
	}
</style>
