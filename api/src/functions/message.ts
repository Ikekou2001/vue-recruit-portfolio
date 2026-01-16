import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function message(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    return {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: 'Hello from the API!',
            timestamp: new Date().toISOString()
        })
    };
}

app.http('message', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: message
});
