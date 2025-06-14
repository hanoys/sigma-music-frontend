<script lang="ts">
    import TrackCard from "$lib/components/TrackCard.svelte";

    let {data} = $props()
    console.log(data.tracks)
    console.log(data.tracks_images)
</script>

{#each data.tracks as track}
    <TrackCard name="{track.name}" musician="{data.musician_names[track.id]}" image_url="{data.tracks_images[track.id]}" token="{data.token}" track_id="{track.id}" is_favorite="{track.is_favorite}" stars="{track.stars}"/>
{/each}
