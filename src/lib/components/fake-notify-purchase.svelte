<script lang="ts" module>
	type Notification = {
		id: number;
		user: string;
		product: string;
		price: string;
		image: string;
		timeAgo: string;
		timestamp: string;
	};
</script>

<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { CheckCircle, X } from '@lucide/svelte';

	import { writable } from 'svelte/store';

	let notifications = writable<Notification[]>([]);

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
			images: 'https://cdn.prizegrab.com/media/img/prizes/image_23.png'
		},
		{
			name: '$50.00 Daily Dozen Cash',
			price: '$50.00',
			images:
				'https://t4.ftcdn.net/jpg/00/05/18/93/360_F_5189300_4oEJSg9pMviaRZm4jv601R7gRUclkfif.jpg'
		},
		{
			name: 'Daily $50.00 Target Gift Card',
			price: '$50.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/New_Target.jpg'
		},
		{
			name: '$50.00 Amazon.com Gift Card',
			price: '$50.00',
			images: 'https://m.media-amazon.com/images/I/51lcnBqAnvL.jpg'
		},
		{
			name: '$350.00 Cash',
			price: '$350.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/cash_pile.jpeg'
		},
		{
			name: '$150.00 Weekly Cash',
			price: '$150.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/50_weekly_cash.png'
		},
		{
			name: '$5,000 Cash',
			price: '$5,000.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/prizegrab-5k-cash-2-sweepstakes.jpg'
		},
		{
			name: '$500.00 Grocery Stimulus Cash',
			price: '$500.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/groceries2_1.png'
		},
		{
			name: 'Portable iPhone Charger',
			price: '$30.00',
			images: 'https://target.scene7.com/is/image/Target/GUEST_5bbfb5f6-c55d-4cf5-956b-6c7a5057aac7'
		},
		{
			name: 'Chromebook Laptop',
			price: '$1,300.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/Chromebook_Laptop.png'
		},
		{
			name: '$300.00 Sephora Gift Card',
			price: '$300.00',
			images: 'https://images-cdn.ubuy.co.id/63d5d35f931f005fd2579d83-sephora-gift-cards.jpg'
		},
		{
			name: 'Sony PlayStation 5',
			price: '$600.00',
			images: 'https://cdn.prizegrab.com/media/img/prizes/Sony_PlayStation_5_copy.jpg'
		}
	];
	const generateNotification = () => {
		const user = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
		const product = fakeProducts[Math.floor(Math.random() * fakeProducts.length)];
		// Random waktu dalam 1-30 menit terakhir
		const minutesAgo = Math.floor(Math.random() * 30) + 1;
		const timeAgo = minutesAgo === 1 ? 'just now' : `${minutesAgo} minutes ago`;

		const notification = {
			id: Date.now() + Math.random(),
			user,
			product: product.name,
			price: product.price,
			image: product.images,
			timeAgo,
			timestamp: new Date().toLocaleTimeString('en-US', {
				hour: '2-digit',
				minute: '2-digit'
			})
		};

		return notification;
	};
	const addNotification = () => {
		const newNotification = generateNotification();
		notifications.update((prev: Notification[]) => [newNotification, ...prev.slice(0, 4)]); // Keep max 5 notifications
		// Auto remove after 8 seconds
		setTimeout(() => {
			notifications.update((prev: Notification[]) =>
				prev.filter((notif) => notif.id !== newNotification.id)
			);
		}, 8000);
	};
	const removeNotification = (id: number) => {
		notifications.update((prev: Notification[]) => prev.filter((notif) => notif.id !== id));
	};
	$effect(() => {
		setTimeout(addNotification, 2000);

		const generateRandomNotification = () => {
			const randomDelay = Math.random() * 10000 + 5000; // 5-15 seconds
			setTimeout(() => {
				addNotification();
				generateRandomNotification();
			}, randomDelay);
		};

		generateRandomNotification();
	});
</script>

<div class="fixed bottom-4 left-4 z-50 max-w-md space-y-3 lg:max-w-lg">
	{#each $notifications as item, index (index)}
		<div
			class={`
            transform rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-lg transition-all duration-500 ease-out
            ${index === 0 ? 'animate-slide-in' : ''}
          `}
			style="animation: {index === 0 ? 'slideIn 0.5s ease-out' : 'none'};"
		>
			<div class="flex w-full flex-col gap-2">
				<div class="min-w-0 flex-1">
					<div class="flex items-start justify-between">
						<div class="flex-1 space-y-2">
							<div class="flex items-center gap-2">
								<CheckCircle class="h-6 w-6 text-green-600" />
								<div class="text-sm font-medium text-gray-900">
									Congratulations <span class="font-bold text-green-700">"{item.user}" 🎉</span>
								</div>
							</div>
							<div class="flex items-center gap-2">
								<Avatar.Root>
									<Avatar.Image src={item.image} alt={item.product} />
									<Avatar.Fallback>{item.user.slice(0, 2).toUpperCase()}</Avatar.Fallback>
								</Avatar.Root>
								<p class="mt-1 text-xs font-medium text-black">
									<span class="font-bold text-blue-700">{item.user}</span> Have become a new winner,
									get a prize
									<span class="font-bold text-red-700">"{item.product}"</span>
								</p>
							</div>
							<div class="flex items-center justify-between">
								<span class="text-xs text-gray-900">
									Total prize value : <span class="font-bold text-green-600">{item.price}</span>
								</span>
								<span class="text-xs text-gray-900">
									{item.timeAgo}
								</span>
							</div>
						</div>
						<button
							class="ml-2 flex-shrink-0 cursor-pointer rounded-full p-1 transition-colors hover:bg-gray-100"
							onclick={() => removeNotification(item.id)}
						>
							<X class="h-4 w-4 text-black" />
						</button>
					</div>
				</div>
			</div>
			<div class="mt-3 h-1 w-full rounded-full bg-gray-200">
				<div
					class="animate-progress h-1 rounded-full bg-green-600"
					style="animation: 'progress 8s linear forwards'"
				></div>
			</div>
		</div>
	{/each}
</div>

<style scoped>
	@keyframes slideIn {
		from {
			transform: translateX(-100%);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes progress {
		from {
			width: 100%;
		}
		to {
			width: 0%;
		}
	}

	.animate-progress {
		animation: progress 8s linear forwards;
	}
</style>
