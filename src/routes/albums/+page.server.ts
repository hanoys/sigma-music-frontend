import {error} from "@sveltejs/kit";
import {apiRequest} from "$lib/api.ts";

export const load = async ({ params }) => {
    const {data: albums, error: aerr} = await apiRequest('/albums');
    if (aerr) {
        throw error(500, {message: aerr.error})
    }
    console.log(albums)
    let musician_names = {};

    for (const album of albums) {
        const {data: musician, error: merr} = await apiRequest('/albums/' + album.id + '/musicians');

        if (merr) {
            throw error(500, {message: merr.error})
        }

        musician_names[album.id] = musician.name
        console.log(musician.name);
    }

    return {albums, musician_names};
};