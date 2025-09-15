<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { MetaTags } from 'svelte-meta-tags';
	import { Input } from '@/components/ui/input/index.js';
	import { Label } from '@/components/ui/label';
	import { Button } from '@/components/ui/button';
	import { Textarea } from '@/components/ui/textarea';
	import { LoaderCircle } from '@lucide/svelte';
	import { toast } from '@/stores/toast';
	import InputError from '@/components/input-error.svelte';

	let { data } = $props();
	let metaTags = $derived(data.pageMetaTags);

	const { form, errors, submitting, enhance } = superForm(data.formContact, {
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
				<h1 class="text-right">Contact</h1>
			</div>
		</div>
	</div>
	<div class="container rounded-lg border border-gray-700 bg-gray-50 px-4 py-6 shadow-md">
		<div class="row">
			<div class="col-sm-8">
				<form method="POST" class="grid w-full gap-6" use:enhance>
					<div class="grid">
						<Label for="name" class="text-sm font-semibold">Name *</Label>
						<Input
							type="text"
							bind:value={$form.name}
							name="name"
							class="block w-full"
							autocomplete="name"
							placeholder="Enter Full Name"
						/>
						{#if $errors.name}
							<InputError>{$errors.name}</InputError>
						{/if}
					</div>
					<div class="grid">
						<Label for="email" class="text-sm font-semibold">Email *</Label>
						<Input
							type="email"
							bind:value={$form.email}
							name="email"
							class="block w-full"
							autocomplete="email"
							placeholder="Enter Email"
						/>
						{#if $errors.email}
							<InputError>{$errors.email}</InputError>
						{/if}
					</div>
					<div class="grid">
						<Label for="subject" class="text-sm font-semibold">Subject *</Label>
						<Input
							type="text"
							bind:value={$form.subject}
							name="subject"
							class="block w-full"
							autocomplete="on"
							placeholder="Enter Subject"
						/>
						{#if $errors.subject}
							<InputError>{$errors.subject}</InputError>
						{/if}
					</div>
					<div class="grid">
						<Label for="message" class="text-sm font-semibold">Message *</Label>
						<Textarea
							bind:value={$form.message}
							name="message"
							autocomplete="on"
							placeholder="Type Message Here"
						/>
						{#if $errors.message}
							<InputError>{$errors.message}</InputError>
						{/if}
					</div>
					<div class="grid">
						<Button type="submit" disabled={$submitting}>
							{#if $submitting}
								<LoaderCircle class="h-4 w-4 animate-spin" />
							{/if}
							{$submitting ? 'Please wait...' : 'Send'}
						</Button>
					</div>
				</form>
			</div>
			<div class="col-sm-4">
				<br />
				PrizeGrab<br />
				<a href="mailto:contact@prizegrab.com">contact@prizegrab.com</a><br />
				333 S. E. 2nd Ave., Suite 2000 <br />
				Miami, FL 33131 <br /><br />
				<p>Fill out the contact form and we'll get back to you via email as soon as possible!</p>
			</div>
		</div>
	</div>
</div>
