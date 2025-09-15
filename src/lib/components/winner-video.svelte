<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { cubicInOut } from 'svelte/easing';

	let {
		open = $bindable(),
		videoId = 'iMNLin1d484',
		onclose
	}: {
		open: boolean;
		videoId?: string;
		onclose?: () => void;
	} = $props();

	let modalElement = $state<HTMLDivElement>();

	onMount(() => {
		// Handle ad blocker errors
		window.addEventListener('error', (e) => {
			if (e.message.includes('googleads.g.doubleclick.net')) {
				e.preventDefault();
			}
		});

		// Handle escape key
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && open) {
				handleClose();
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	});

	function handleClose() {
		open = false;
		onclose?.();
	}

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === modalElement) {
			handleClose();
		}
	}

	// Custom transition yang menggabungkan fade dan scale
	function fadeScale(
		node: Element,
		{ delay = 0, duration = 300, easing = cubicInOut, baseScale = 0.8 }
	) {
		const o = +getComputedStyle(node).opacity;
		const transform = getComputedStyle(node).transform;
		const scale_match = transform.match(/scale\(([0-9.]+)\)/);
		const scale_value = scale_match ? parseFloat(scale_match[1]) : 1;

		return {
			delay,
			duration,
			css: (t: number) => {
				const eased = easing(t);
				const opacity = eased * o;
				const scale = baseScale + (scale_value - baseScale) * eased;
				return `opacity: ${opacity}; transform: scale(${scale});`;
			}
		};
	}
</script>

{#if open}
	<!-- Modal Backdrop -->
	<div
		bind:this={modalElement}
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm"
		role="dialog"
		aria-modal="true"
		aria-labelledby="modal-title"
		tabindex="-1"
		onclick={handleBackdropClick}
		onkeydown={(e) => {
			if ((e.key === 'Enter' || e.key === ' ') && e.target === modalElement) {
				handleClose();
			}
		}}
		in:fade={{ duration: 200, easing: cubicInOut }}
		out:fade={{ duration: 150, easing: cubicInOut }}
	>
		<!-- Modal Container -->
		<div
			class="relative mx-4 w-full max-w-4xl overflow-hidden rounded-lg bg-black shadow-2xl"
			in:fadeScale={{
				delay: 100,
				duration: 300,
				easing: cubicInOut,
				baseScale: 0.9
			}}
			out:fadeScale={{
				delay: 0,
				duration: 200,
				easing: cubicInOut,
				baseScale: 0.9
			}}
		>
			<!-- Close Button -->
			<button
				class="absolute top-4 right-4 z-10 transform rounded-full bg-black/50 p-2 text-white transition-all duration-200 hover:scale-110 hover:bg-black/75 hover:text-gray-300"
				aria-label="Close modal"
				onclick={handleClose}
			>
				<svg
					class="h-6 w-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					></path>
				</svg>
			</button>

			<!-- Video Container -->
			<div
				class="relative aspect-video w-full"
				in:scale={{
					delay: 200,
					duration: 400,
					start: 0.95,
					easing: cubicInOut
				}}
				out:scale={{
					delay: 0,
					duration: 200,
					start: 0.95,
					easing: cubicInOut
				}}
			>
				<iframe
					src="https://www.youtube.com/embed/{videoId}?autoplay=1&rel=0&modestbranding=1"
					title="YouTube video player"
					class="h-full w-full"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerpolicy="strict-origin-when-cross-origin"
					allowfullscreen
				></iframe>
			</div>
		</div>
	</div>
{/if}

<style>
	/* Mencegah scroll pada body ketika modal terbuka */
	:global(body:has(.modal-open)) {
		overflow: hidden;
	}
</style>
