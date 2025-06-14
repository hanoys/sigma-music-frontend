export async function handle({ event, resolve }) {
    const response = await resolve(event);

    // // Добавляем заголовки CORS
    // response.headers.set('Access-Control-Allow-Origin', 'http://localhost/api/v1');
    // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}