<script lang="ts">
    import {Ratings} from "@skeletonlabs/skeleton";
    import { getToastStore } from '@skeletonlabs/skeleton';
    import type { ToastSettings } from "@skeletonlabs/skeleton";
    const toastStore = getToastStore();
    function errorToast(error: string) {
        const t: ToastSettings = {
            message: error,
            background: 'variant-filled-error',
        };
        toastStore.trigger(t);
    }
    let {name, musician, image_url, token, track_id, is_favorite, stars} = $props();



    let star_value = $state({ current: stars, max: 5 });
    async function starClick(event: CustomEvent<{index:number}>) {
        let form_data = new FormData();
        form_data.set('stars', event.detail.index.toString())
        form_data.set('track_id', track_id)
        const response = await fetch("/tracks?/comment", {
            method: 'POST',
            body: form_data
        })
        console.log('response:', response)
        const result = await response.json();
        const data = JSON.parse(result.data)
        console.log(data)
        if (data && data[1] != 200) {
            console.log("200")
            errorToast(data[2])
        } else {
            star_value.current = event.detail.index;
        }
    }

    let is_favorite_s = $state(is_favorite)
    async function btnHeartClick() {
        let form_data = new FormData();
        form_data.set('track_id', track_id)

        if (is_favorite_s) {
            const response = await fetch("/tracks?/dislike", {
                method: 'POST',
                body: form_data
            })
            console.log('response:', response)
            const result = await response.json();
            const data = JSON.parse(result.data)
            console.log(data)
            if (data[1] && data[1] != 200) {
                errorToast(data[2])
            } else {
                is_favorite_s = !is_favorite_s;
            }
        } else {
            const response = await fetch("/tracks?/like", {
                method: 'POST',
                body: form_data
            })
            console.log('response:', response)
            const result = await response.json();
            const data = JSON.parse(result.data)
            console.log(data)
            if (data[1] && data[1] != 200) {
                errorToast(data[2])
            } else {
                is_favorite_s = !is_favorite_s;
            }
        }

    }
</script>

<div class="flex justify-center top-0" style="padding-top: 0.5em">
    <div class="card card-hover flex justify-between w-3/4">
        <div class="flex" style="padding-left: 0.2em">
            <button type="button" class="btn-icon">
                <img class="rounded-3xl" src="{image_url}" alt="{name} album image" style="aspect-ratio: 1/1"/>
            </button>
            <div class="flex-col">
                <div style="padding-left: 0.5em">
                    <span class="flex">{name}</span>
                    <span class="flex">{musician}</span>
                </div>

            </div>
        </div>
        <div class="flex space-x-4" style="padding-right: 2em">
            <Ratings bind:value={star_value.current} max={star_value.max} interactive on:icon={starClick}>
                <svelte:fragment slot="empty">
                    <i class="fa-regular fa-star"></i>
                </svelte:fragment>
                <svelte:fragment slot="full">
                    <i class="fa-solid fa-star" style="color: rgba(var(--color-warning-500) / 1)"></i>
                </svelte:fragment>
            </Ratings>
            <button class="btn btn-icon" on:click={btnHeartClick}>
                {#if is_favorite_s}
                    <i class="fa-solid fa-heart" style="color: rgba(var(--color-primary-500) / 1)"></i>
                {:else}
                    <i class="fa-regular fa-heart"></i>
                {/if}
            </button>
        </div>
    </div>
</div>