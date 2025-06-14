import { apiRequest } from "$lib/api";
import type { Actions } from "@sveltejs/kit";
import {fail, redirect} from "@sveltejs/kit";

export const actions = {
    login: async ({ cookies, request }) => {
        const loginData = await request.formData();
        const name = loginData.get('name')
        const password = loginData.get('password')
        console.log(name, password)

        const {data, error} = await apiRequest('/auth/login', 'post', {
            name: name,
            password: password
        })
        console.log("error ", error)
        if (error) {
            return fail(error.status, {
                error: error.error,
            })
        }

        console.log("Data ", data)


        cookies.set('access_token', `Bearer ${data.access_token}`, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 3,
            path: '/'
        });

        cookies.set('refresh_token', `Bearer ${data.refresh_token}`, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 3,
            path: '/'
        });

        return redirect(302, "/tracks")
    }
} satisfies Actions;