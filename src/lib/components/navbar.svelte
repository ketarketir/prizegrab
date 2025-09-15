<script lang="ts">
	import { onMount } from 'svelte';

	let showWelcomeMessage = $state(false);
	let isScrolled = $state(false);

	function showFauxNav() {
		showWelcomeMessage = true;

		// Hapus elemen yang tidak diperlukan
		const navbarCollapse = document.getElementById('navbarCollapse');
		const navbarStreaksBar = document.getElementById('navbarStreaksBar');
		const navbarToggler = document.querySelector('.navbar-toggler');
		const pgLogo = document.getElementById('navbarPGLogo');

		if (navbarCollapse) navbarCollapse.remove();
		if (navbarStreaksBar) navbarStreaksBar.remove();
		if (navbarToggler) navbarToggler.remove();

		// Set cursor dan prevent default click
		if (pgLogo) {
			pgLogo.style.cursor = 'default';
			pgLogo.onclick = (e) => e.preventDefault();
		}
	}

	function handleScroll() {
		// Threshold untuk menentukan kapan background muncul (50px dari top)
		const scrollThreshold = 50;
		isScrolled = window.scrollY > scrollThreshold;
	}

	// Expose function ke global scope jika diperlukan
	onMount(() => {
		(window as any).prizegrab = (window as any).prizegrab || {};
		(window as any).prizegrab.showFauxNav = showFauxNav;

		// Event listener untuk scroll
		window.addEventListener('scroll', handleScroll, { passive: true });

		// Cleanup
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});

	function triggerFauxNav() {
		showWelcomeMessage = true;
		if ((window as any).prizegrab && (window as any).prizegrab.showFauxNav) {
			(window as any).prizegrab.showFauxNav();
		}
	}
</script>

<nav
	id="l-nav"
	class="navbar navbar-expand-lg navbar-dark fixed-top transition-all duration-300 ease-in-out"
	class:scrolled={isScrolled}
>
	<a href="/" class="l-nav__logo d-inline-block order-lg-1 order-1" style:cursor="pointer">
		<img src="//cdn.prizegrab.com/static/img/prizes/logo-white.png" alt="PrizeGrab Logo" />
	</a>
</nav>

<style scoped>
	.navbar {
		background-color: transparent;
		backdrop-filter: none;
		transition: all 0.3s ease-in-out;
	}

	.navbar.scrolled {
		background-color: rgba(0, 0, 0, 0.7);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
		padding: 10px 10px;
	}

	/* Optional: Smooth logo transition saat scroll */
	.l-nav__logo img {
		transition: all 0.3s ease-in-out;
		height: 40px; /* Sesuaikan dengan ukuran logo Anda */
	}

	.navbar.scrolled .l-nav__logo img {
		height: 35px; /* Logo sedikit mengecil saat scroll */
	}

	/* Untuk memastikan navbar tetap di atas */
	.navbar {
		z-index: 1050;
	}
</style>
