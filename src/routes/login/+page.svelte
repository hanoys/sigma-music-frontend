<script lang="ts">
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
</script>

<div class="h-screen flex items-center justify-center">
	<div class="card max-w-lg w-3/4">
		<form method="POST" action="?/login">
			<header class="card-header flex items-center justify-center">Log in</header>
			<section class="p-4 space-y-6">
				<label class="label">
					<span>Name</span>
					<input class="input input-style" name="name" type="text" placeholder="My name" style="padding-left: 0.5em" required/>
				</label>
				<label class="label">
					<span>Password</span>
					<input class="input input-style" name="password" type="text" placeholder="Password" style="padding-left: 0.5em" required/>
				</label>
			</section>
			<footer class="card-footer flex flex-col items-center justify-center space-y-4">
				<button type="submit" class="btn variant-filled">Log in</button>
				<a class="anchor" href="/signup">Don't have an account yet?</a>
			</footer>
		</form>
	</div>
</div>
