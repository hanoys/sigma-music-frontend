<script lang="ts">
    let {name, image_url, id} = $props();
</script>

<div class="flex justify-center top-0" style="padding-top: 0.5em">
    <a href="{'/musicians/' + id + '/albums'}" class="card card-hover flex justify-between w-3/4">
        <div class="flex" style="padding-left: 0.2em; padding-bottom: 0.2em; padding-top: 0.2em">
            <button type="button" class="btn-icon">
                <img class="rounded-3xl" src="{image_url}" alt="{name} album image" style="aspect-ratio: 1/1"/>
            </button>
            <div class="content-center" style="padding-left: 0.5em">
                <span>{name}</span>
            </div>
        </div>
    </a>
</div>