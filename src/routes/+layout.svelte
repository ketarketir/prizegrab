<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import Navbar from '@/components/navbar.svelte';
	import FormAuth from '@/components/form-auth.svelte';
	import Footer from '@/components/footer.svelte';
	import BannerBottom from '@/components/banner-bottom.svelte';
	import { ToastContent } from '@/components/toast';
	import FakeNotifyPurchase from '@/components/fake-notify-purchase.svelte';

	let { children } = $props();
</script>

<!-- <svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head> -->
<ToastContent />
<FakeNotifyPurchase />
{#if page.route.id != '/blog'}
	<Navbar />
	{@render children?.()}
	<Footer />
	<BannerBottom />
{:else}
	{@render children?.()}
{/if}
