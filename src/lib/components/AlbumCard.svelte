<script lang="ts">
    let {name, musician, image_url, id} = $props();
</script>

<div class="flex justify-center top-0" style="padding-top: 0.5em">
    <a href="{'/albums/' + id + '/tracks'}" class="block card card-hover">
        <section class="flex-col">
            <div class="flex" style="height: 15em; width: auto">
                <img class="rounded-container-token p-2" src="{image_url}" alt="{name} album image" style="aspect-ratio: 1/1"/>
            </div>
            <div class="pt-4 pb-2">
                <span class="flex justify-center">{musician}</span>
                <span class="flex justify-center">{name}</span>
            </div>
        </section>
    </a>
</div>