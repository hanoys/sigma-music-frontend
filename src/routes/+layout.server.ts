export const load = ({ cookies }) => {
    console.log("access token: ", cookies.get('access_token'))
    return {token: cookies.get('access_token')}
};