<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';

	let {
		open = $bindable(),
		onclose
	}: {
		open: boolean;
		onclose?: () => void;
	} = $props();

	onMount(() => {
		window.addEventListener('error', (e) => {
			if (e.message.includes('googleads.g.doubleclick.net')) {
				e.preventDefault();
			}
		});
	});

	function handleClose() {
		open = false;
		onclose?.();
	}
</script>

<Dialog.Root bind:open>
	<Dialog.Content
		class="mx-auto flex min-w-max flex-col items-center justify-center border-none border-transparent bg-transparent p-0 outline-transparent outline-none"
	>
		<Dialog.Header
			class="border-none border-transparent bg-transparent  p-0 outline-transparent outline-none"
		>
			<Dialog.Title></Dialog.Title>
			<Dialog.Description></Dialog.Description>
		</Dialog.Header>
		<div class="relative h-0 w-full overflow-hidden pb-[56.25%]">
			<iframe
				class="absolute top-0 left-0 h-full w-full border-none"
				src="https://www.youtube.com/embed/iMNLin1d484?si=3caJheQhIDdmmLAP"
				title="YouTube video player"
				frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				referrerpolicy="strict-origin-when-cross-origin"
				allowfullscreen
			></iframe>
		</div>
	</Dialog.Content>
</Dialog.Root>
