<script lang="ts">
	import { SlideToggle } from "@skeletonlabs/skeleton";
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { ToastSettings } from "@skeletonlabs/skeleton";
	import type { PageData, ActionData } from './$types';
	const toastStore = getToastStore();

	function errorToast(error: string) {
		const t: ToastSettings = {
			message: error,
			background: 'variant-filled-error',
		};
		toastStore.trigger(t);
	}
	let { data, form }: { data: PageData, form: ActionData } = $props();
	if (form?.error) {
		errorToast(form?.error);
	}

	let is_musician = $state(false)
</script>

<div class="h-screen flex items-center justify-center">
	<div class="card max-w-lg w-3/4">
		<form method="POST" action="?/register">
			<header class="card-header flex items-center justify-center">Create an account</header>
			<section class="p-4 space-y-6">
				<label class="label">
					<span>Name</span>
					<input class="input input-style" name="name" type="text" placeholder="My name" style="padding-left: 0.5em"/>
				</label>
				<label class="label">
					<span>Mail</span>
					<input class="input input-style" name="email" type="email" placeholder="mail@mail.com" style="padding-left: 0.5em" required/>
				</label>
				<label class="label">
					<span>Password</span>
					<input class="input input-style" name="password" type="password" placeholder="password" style="padding-left: 0.5em" required/>
				</label>
				<label class="label">
					<span>Country</span>
					<input class="input input-style" name="country" type="text" placeholder="Russia" style="padding-left: 0.5em" required/>
				</label>
				{#if is_musician === false}
					<label class="label">
						<span>Phone</span>
						<input class="input input-style" name="phone" type="tel" placeholder="+79999999999" style="padding-left: 0.5em" required/>
					</label>
				{:else}
					<label class="label">
						<span>Description</span>
						<input class="input input-style" name="description" type="text" placeholder="About you" style="padding-left: 0.5em"/>
					</label>
				{/if}
				<SlideToggle name="is_musician" active="variant-filled-primary" bind:checked={is_musician}>I am musician</SlideToggle>
			</section>
			<footer class="card-footer flex items-center justify-center">
				<button type="submit" class="btn variant-filled">Sign up</button>
			</footer>
		</form>
	</div>
</div>

