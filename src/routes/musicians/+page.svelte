<script lang="ts">
    import MusicianCard from "$lib/components/MusicianCard.svelte";

    let {data} = $props()
    console.log('data: ', data)
</script>


{#each data.musicians as musician}
    <MusicianCard name="{musician.name}" image_url="{musician.image_url}" id="{musician.id}"/>
{/each}
