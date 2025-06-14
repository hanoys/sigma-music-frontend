import { apiRequest } from "$lib/api";
import type { Actions } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

export const actions = {
    register: async ({ cookies, request }) => {
        const signupData = await request.formData()
        const is_musician = signupData.get('is_musician')
        let payload = {
            name: signupData.get('name'),
            email: signupData.get('email'),
            password: signupData.get('password'),
            country: signupData.get('country')
        }
        let apiRoute = '/users/register'
        if (is_musician === 'on') {
            apiRoute = '/musicians/register'
            payload['description'] = signupData.get('description')
        } else {
            payload['phone'] = signupData.get('phone')
        }

        let {response: data, error} = await apiRequest(apiRoute, 'post', payload)
        if (error) {
            return fail(error.status, {
                error: error.error,
            })
        }


    }
} satisfies Actions;