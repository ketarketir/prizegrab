<script lang="ts">
	import { MetaTags } from 'svelte-meta-tags';
	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { LoaderCircle } from '@lucide/svelte';
	import { toast } from '@/stores/toast';
	import InputError from '@/components/input-error.svelte';
	import { cn } from '@/utils.js';

	let { data } = $props();
	let metaTags = $derived(data.pageMetaTags);

	const { form, errors, submitting, enhance } = superForm(data.unsubscribeForm, {
		resetForm: true,
		async onUpdate(event) {
			if (event.result.type === 'failure') {
				const errorMessage = event.result.data?.error?.message || 'Submit failed';
				toast.error(errorMessage);
				await invalidateAll();
				return;
			}
			const successMessage = event.result.data?.message || 'Submit successfully';
			toast.success(successMessage);
			await invalidateAll();
		},
		onError: ({ result }) => {
			toast.error(result.error.message);
		}
	});
</script>

<MetaTags {...metaTags} />
<div class="pg__wrap" style="min-height: calc(100vh - 379px);">
	<div class="header-wrap-pg">
		<div class="header-pg container flex items-center justify-center">
			<div class="row">
				<h1 class="text-right">Unsubscribe</h1>
			</div>
		</div>
	</div>
	<div class="page-pg simple-form-page unsub-page container">
		<div class="row">
			<div class="col-sm-12 text-center">
				<h2>We'd Hate to See You Leave</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6 unsub-left">
				<p>
					<strong
						>Unsubscribing means you will no longer receive prize alerts, exclusive emails and
						important winner notifications.</strong
					>
				</p>
				<p>If you're sure you want to unsubscribe, use the form below:</p>
				<form method="POST" use:enhance>
					<p>
						<label for="id_email">Email:</label>
						<input
							type="email"
							name="email"
							bind:value={$form.email}
							maxlength="254"
							id="id_email"
							autocomplete="email"
							placeholder="Enter your valid email"
						/>
						{#if $errors.email}
							<InputError>$errors.email</InputError>
						{/if}
					</p>
					<button
						type="submit"
						class={cn(
							'btn-round inline-flex items-center justify-center gap-2 rounded border-none bg-[#17a2b8] px-6 py-2 font-bold text-white capitalize hover:bg-[#0e8294] focus:border-none active:border-none',
							$submitting ? 'cursor-not-allowed' : 'cursor-pointer'
						)}
						disabled={$submitting}
					>
						{#if $submitting}
							<LoaderCircle class="h-4 w-4 animate-spin" />
						{/if}
						{$submitting ? 'Please wait...' : 'Unsubscribe'}
					</button>
				</form>
			</div>
			<div class="col-sm-6 unsub-right">
				<div class="ending-soon-box">
					<h4 class="red-text text-center uppercase">Winners to be Announced Soon</h4>

					<div class="row ending-soon-item">
						<div class="col-sm-3">
							<a href="/" aria-label="View $2,222.00 Cash Giveaway"
								><img
									src="//cdn.prizegrab.com/media/img/prizes/cash-bg-2.jpg"
									alt="$2,222.00 Cash Giveaway"
									class="img-fluid"
								/></a
							>
						</div>
						<div class="col-sm-9">
							<span class="red-text uppercase"> Ending in 1&nbsp;day, 1&nbsp;hour! </span><br />
							<a href="/prize/3241/2222-cash-giveaway-/"
								>$2,222.00 Cash <i class="fa fa-chevron-circle-right"></i></a
							>
						</div>
					</div>

					<div class="row ending-soon-item">
						<div class="col-sm-3">
							<a href="/" aria-label="View $2,222.00 Cash Giveaway"
								><img
									src="//cdn.prizegrab.com/media/img/prizes/darden.png"
									alt="$2,222.00 Cash Giveaway"
									class="img-fluid"
								/></a
							>
						</div>
						<div class="col-sm-9">
							<span class="red-text uppercase"> Ending in 1&nbsp;week, 1&nbsp;day! </span><br />
							<a href="/">
								$250.00 Darden Restaurant Gift Card <i class="fa fa-chevron-circle-right"></i>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style scoped>
	.unsub-page h2 {
		font-weight: 900;
		font-size: 38px;
		padding-bottom: 16px;
		margin-top: 0;
	}

	.unsub-left {
		font-size: 16px;
	}

	.unsub-left strong {
		font-weight: 800;
		font-size: 18px;
	}

	.ending-soon-box {
		border-radius: 5px;
		border: 4px solid #ffcc27;
		padding: 14px;
		font-weight: 800;
	}

	.ending-soon-box h4 {
		font-size: 20px;
		font-weight: 800;
	}

	.ending-soon-box a {
		font-size: 18px;
		color: #333;
	}

	.uppercase {
		text-transform: uppercase;
	}

	.red-text {
		color: #fc494d;
	}

	.ending-soon-item {
		padding-top: 14px;
	}

	@media screen and (max-width: 769px) {
		.unsub-page h2 {
			font-size: 20px;
			padding-bottom: 2px;
		}

		.unsub-left strong {
			font-size: 16px;
		}

		.unsub-left .btn {
			margin-bottom: 12px;
		}

		.unsub-left form p {
			margin: 0 0 4px;
		}
	}
</style>
