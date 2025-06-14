import {Actions, error, fail, redirect} from "@sveltejs/kit";
import {apiRequest} from "$lib/api.ts";

export const load = async ({ cookies }) => {
    const token = cookies.get('access_token')
    const {data: tracks, error: terr} = await apiRequest('/tracks');
    if (terr) {
        throw error(500, {message: terr.error})
    }
    let favorites = new Array()
    let comments = new Array()
    if (token) {
        const {data: favoritest, error: tterr} = await apiRequest('/users/me/favorites', 'get', undefined, token);
        if (tterr) {

        }
        favorites = favoritest
        const {data: commentst, error: cterr} = await apiRequest('/users/me/comments', 'get', undefined, token);
        if (cterr) {
            throw error(500, {message: tterr.error})
        }
        comments = commentst
    }
    console.log('favorites: ', favorites)
    console.log('tracks: ', tracks)

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

export const actions = {
    like: async ({ cookies, request }) => {
        const token = cookies.get('access_token')
        if (token) {
            const form_data = await request.formData()
            const track_id = form_data.get('track_id')
            console.log('liked track: ', track_id)
            const {data: musician, error: err} = await apiRequest('/users/me/favorites/' + track_id, 'post', undefined, token);

            if (err) {
                return error(500, {message: err.error})
            }
        } else {
            return {status: 401, error: "Please, authorize to leave a like"}
        }
    },
    dislike: async ({ cookies, request }) => {
        const token = cookies.get('access_token')
        if (token) {
            const form_data = await request.formData()
            const track_id = form_data.get('track_id')
            console.log('liked track: ', track_id)
            const {data: musician, error: err} = await apiRequest('/users/me/favorites/' + track_id, 'delete', undefined, token);

            if (err) {
                return error(500, {message: err.error})
            }
        } else {
            return {status: 401, error: "Please, authorize to leave a like"}
        }

    },
    comment: async ({ cookies, request }) => {
        const token = cookies.get('access_token')
        if (token) {
            const form_data = await request.formData()
            const stars = Number(form_data.get('stars'))
            const track_id = form_data.get('track_id')
            console.log('comment stars: ', stars)
            const {data: musician, error: err} = await apiRequest('/tracks/' + track_id + '/comments', 'post', {
                stars: stars,
                text: "",
            }, token);

            console.log(musician)
            console.log(err)

            if (err) {
                return {status: 500, error: err.error}
            }

            return {status: 200}
        } else {
            console.log('here2')
            return {status: 401, error: "Please, authorize to leave a comment"}
        }
    }
} satisfies Actions;