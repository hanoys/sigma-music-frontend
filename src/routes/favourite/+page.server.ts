import {error} from "@sveltejs/kit";
import {apiRequest} from "$lib/api.ts";

export const load = async ({ cookies }) => {
    const token = cookies.get('access_token')
    console.log('token:', token)
    const {data: tracks, error: terr} = await apiRequest('/users/me/favorites', 'get', undefined, token);
    console.log('error', terr)
    console.log('data', tracks)
    if (terr) {
        throw error(500, {message: terr.error})
    }
    console.log(tracks)

    const {data: favorites, error: tterr} = await apiRequest('/users/me/favorites', 'get', undefined, token);

    if (tterr) {
        throw error(500, {message: tterr.error})
    }

    const {data: comments, error: cterr} = await apiRequest('/users/me/comments', 'get', undefined, token);

    if (cterr) {
        throw error(500, {message: cterr.error})
    }

    let musician_names = {};
    let tracks_images = {};

    for (const track of tracks) {
        const {data: musician, error: merr} = await apiRequest('/tracks/' + track.id + '/musicians');

        if (merr) {
            throw error(500, {message: merr.error})
        }

        musician_names[track.id] = musician.name
        track['is_favorite'] = favorites.some(t => t.id === track.id)
        const found_commented_track = comments.find(c => c.track_id === track.id)
        if (found_commented_track) {
            track['stars'] = found_commented_track.stars
        } else {
            track['stars'] = 0
        }

        if (track.id  in tracks_images)
            continue;

        const {data: album, error: aerr} = await apiRequest('/albums/' + track.album_id);
        if (aerr) {
            throw error(500, {message: aerr.error})
        }
        tracks_images[track.id] = album.image_url;
        console.log(musician.name);
    }

    return {tracks, musician_names, tracks_images};
};