<script lang="ts">
    import AlbumCard from "$lib/components/AlbumCard.svelte";

    let {data} = $props()
    console.log('debug:', data.albums)
</script>

<div class="flex justify-center">
    <div class="grid grid-cols-4 gap-x-2">
        {#each data.albums as album}
            <AlbumCard name="{album.name}" musician="{data.musician_names[album.id]}" image_url="{album.image_url}" id="{album.id}"/>
        {/each}
    </div>
</div>

