<script lang="ts">
	import '../app.postcss';
    import '../app.css'
    import { page } from "$app/stores";
    import type { PageData } from './$types';

    import { TabAnchor } from "@skeletonlabs/skeleton";

    import { initializeStores, Toast } from '@skeletonlabs/skeleton';

    initializeStores();
    let { data }: { data: PageData } = $props()
    console.log(data.token)
</script>

<nav class="flex justify-between bg-surface-800">
    <div class="flex">
        <TabAnchor href="/tracks" selected={$page.url.pathname === '/tracks'}
                   active="variant-filled-primary"
                   hover="hover:variant-soft-primary"
                   class="px-6 content-center">
            <span>Tracks</span>
        </TabAnchor>
        <TabAnchor href="/albums" selected={$page.url.pathname === '/albums'}
                   active="variant-filled-primary"
                   hover="hover:variant-soft-primary"
                   class="px-6 content-center">
            <span>Albums</span>
        </TabAnchor>
        <TabAnchor href="/musicians" selected={$page.url.pathname === '/musicians'}
                   active="variant-filled-primary"
                   hover="hover:variant-soft-primary"
                   class="px-6 content-center">
            <span>Musicians</span>
        </TabAnchor>
        {#if data.token}
        <TabAnchor href="/favourite" selected={$page.url.pathname === '/favourite'}
                   active="variant-filled-primary"
                   hover="hover:variant-soft-primary"
                   class="px-6 content-center">
            <span>Favourite</span>
        </TabAnchor>
        {/if}
    </div>

    <div class="flex-grow py-4 px-40">
        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto] ">
            <div class="input-group-shim"><i class="fa-solid fa-magnifying-glass"></i></div>
            <input class="input-style" type="search" placeholder="Search..." />
        </div>
    </div>

    {#if data.token}
    <div class="flex p-3">
        <button type="button" class="btn-icon variant-filled"><i class="fa-solid fa-circle-user"></i></button>
    </div>
    {:else}
        <div class="flex p-3">
            <a href="/login" class="btn variant-filled">Log in</a>
        </div>
    {/if}
</nav>

<Toast />

<slot />
