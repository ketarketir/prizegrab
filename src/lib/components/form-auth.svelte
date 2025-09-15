<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { registerSchema, type RegisterSchema } from '@/utils/form-schema';
	import Icon from '@iconify/svelte';
	import { Input } from './ui/input';
	import InputError from './input-error.svelte';
	import { LoaderCircle } from '@lucide/svelte';
	import { formHeaderRequest } from '@/utils/form-helper';
	import { toast } from '@/stores/toast';
	import { cn } from '@/utils';

	let {
		open = $bindable(),
		formSchema
	}: {
		open: boolean;
		formSchema: SuperValidated<RegisterSchema>;
	} = $props();

	let ssnPreview: string | null = null;
	let passportPreview: string | null = null;

	const { form, errors, submitting, enhance } = superForm(formSchema, {
		resetForm: true,
		validators: zod(registerSchema),
		onSubmit(input) {
			input.customRequest(formHeaderRequest);
			const formData = input.formData;
			formData.append('name', $form.name);
			formData.append('email', $form.email);
			formData.append('ssn_photo', $form.ssn_photo);
			formData.append('passport_photo', $form.passport_photo);
		},
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

	function handleSSNChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const fileInput = input.files?.[0];

		if (!fileInput) return;

		const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
		const maxSize = 2 * 1024 * 1024; // 2MB

		if (!validTypes.includes(fileInput.type)) {
			errors.set({ ssn_photo: ['Only JPEG, PNG, and WebP files are allowed'] });
			return;
		}

		if (fileInput.size > maxSize) {
			errors.set({ ssn_photo: ['File size must be less than 2MB'] });
			return;
		}
		$form.ssn_photo = fileInput;
		const reader = new FileReader();
		reader.readAsDataURL(fileInput);
	}
	function handlePassportChange(event: Event) {
		const input = event.target as HTMLInputElement;
		const fileInput = input.files?.[0];

		if (!fileInput) return;

		const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
		const maxSize = 2 * 1024 * 1024; // 2MB

		if (!validTypes.includes(fileInput.type)) {
			errors.set({ passport_photo: ['Only JPEG, PNG, and WebP files are allowed'] });
			return;
		}

		if (fileInput.size > maxSize) {
			errors.set({ passport_photo: ['File size must be less than 2MB'] });
			return;
		}
		$form.passport_photo = fileInput;
		const reader = new FileReader();
		reader.readAsDataURL(fileInput);
	}
	function handleFilePreview(event: Event, type: 'ssn' | 'passport') {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const result = e.target?.result as string;
				if (type === 'ssn') {
					ssnPreview = result;
				} else {
					passportPreview = result;
				}
			};
			reader.readAsDataURL(file);
		}
	}
</script>

<div id="l-landing" class="row text-center">
	<div class="col-lg-7 ending-soon col-12 px-0">
		<img class="img-fluid ml-n5" src="//cdn.prizegrab.com/static/img/prizes/10000.png" alt="" />
	</div>
	<div class="l-landing__banner d-lg-none col-12">
		<img class="img-fluid" src="//cdn.prizegrab.com/static/img/prizes/cashflow.png" alt="" />
	</div>
	<div class="l-landing__form col-lg-5 border-dash col-12 bg-white p-5">
		{#if !open}
			<div class="l-landing__title text-uppercase" style="display: block;">Enter to Win</div>
			<div class="l-landing__sub-title text-uppercase mb-3" style="display: block;">
				And be our next winner
			</div>

			<div id="lander-new-user">
				<div id="options" style="">
					<button
						type="button"
						class="btn-round inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-[#f21c49] py-2 font-bold text-white capitalize focus:border-none active:border-none"
						onclick={() => (open = true)}
					>
						<Icon icon="mdi:gift" />
						ENTER NOW
					</button>
					<span class="headline-note mt-3">
						No Purchase Necessary. <a href="/rules">Official Rules</a>.
					</span>
				</div>
			</div>
		{:else}
			<form
				method="POST"
				action="?/register"
				enctype="multipart/form-data"
				class="grid w-full gap-2"
				use:enhance
			>
				<div class="grid gap-1">
					<div class="flex items-center justify-center gap-2">
						<Icon icon="fa-user" />
						<Input
							type="text"
							bind:value={$form.name}
							name="name"
							class="block w-full"
							autocomplete="name"
							placeholder="Full Name"
							disabled={$submitting}
						/>
					</div>
					<div class="flex items-center justify-start ps-8 text-start text-xs">
						{#if $errors.name}
							<InputError class="mt-1">{$errors.name}</InputError>
						{/if}
					</div>
				</div>
				<div class="grid gap-1">
					<div class="flex items-center justify-center gap-2">
						<Icon icon="fa-envelope" />
						<Input
							type="email"
							bind:value={$form.email}
							name="email"
							class="block w-full"
							autocomplete="email"
							placeholder="Email address"
							disabled={$submitting}
						/>
					</div>
					<div class="flex items-center justify-start ps-8 text-start text-xs">
						{#if $errors.email}
							<InputError class="mt-1">{$errors.email}</InputError>
						{/if}
					</div>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center justify-start gap-2 text-start text-xs">
						<Icon icon="fa-image" />
						<div class="text-sm font-semibold text-black">SSN Photo</div>
					</div>
					<input
						type="file"
						class="w-full cursor-pointer rounded bg-gray-100 text-sm font-medium text-slate-500 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-800 file:px-4 file:py-2 file:text-white file:hover:bg-gray-700"
						accept="image/jpeg, image/png, image/webp"
						disabled={$submitting}
						onchange={handleSSNChange}
					/>
					<div class="flex items-center justify-start ps-8 text-start text-xs">
						{#if $errors.ssn_photo}
							<InputError class="mt-1">{$errors.ssn_photo}</InputError>
						{/if}
					</div>
				</div>
				<div class="grid gap-2">
					<div class="flex items-center justify-start gap-2 text-start text-xs">
						<Icon icon="fa-image" />
						<div class="text-sm font-semibold text-black">Passport Photo</div>
					</div>
					<input
						type="file"
						class="w-full cursor-pointer rounded bg-gray-100 text-sm font-medium text-slate-500 file:mr-4 file:cursor-pointer file:border-0 file:bg-gray-800 file:px-4 file:py-2 file:text-white file:hover:bg-gray-700"
						accept="image/jpeg, image/png, image/webp"
						disabled={$submitting}
						onchange={handlePassportChange}
					/>
					<div class="flex items-center justify-start ps-8 text-start text-xs">
						{#if $errors.passport_photo}
							<InputError class="mt-1">{$errors.passport_photo}</InputError>
						{/if}
					</div>
				</div>
				<div class="form-group">
					<small
						>By entering I confirm that I'm over 18, agree to the <a href="/privacy" target="_blank"
							><u>privacy policy</u></a
						>, and to receive emails from PrizeGrab.com. I'll be notified at the email address above
						if I've won.</small
					>
				</div>
				<div class="form-group">
					<button
						type="submit"
						class={cn(
							'btn-round inline-flex w-full items-center justify-center gap-2 rounded-xl border-none bg-blue-600 py-2 font-bold text-white capitalize hover:bg-blue-700 focus:border-none active:border-none',
							$submitting ? 'cursor-not-allowed' : 'cursor-pointer'
						)}
						disabled={$submitting}
					>
						{#if $submitting}
							<LoaderCircle class="h-4 w-4 animate-spin" />
						{/if}
						{$submitting ? 'Please wait...' : 'Submit Entry'}
					</button>
				</div>
				<button
					type="button"
					class="form-alt-link go-login cursor-pointer border-none text-center hover:underline focus:border-none active:right-0 active:border-none active:outline-none"
					onclick={() => (open = false)}
				>
					← Cancel.
				</button>
			</form>
		{/if}
	</div>
</div>
