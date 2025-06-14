import {error} from "@sveltejs/kit";
import {apiRequest} from "$lib/api.ts";

export const load = async ({ params}) => {
    const {data: musicians, error: terr} = await apiRequest('/musicians');
    if (terr) {
        throw error(500, {message: terr.error})
    }
    console.log(musicians)

    return {musicians};
};