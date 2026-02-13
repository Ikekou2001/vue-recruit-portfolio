import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

export async function echo(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Echo endpoint called: ${request.method} ${request.url}`);

    try {
        // リクエストボディを取得
        let requestBody: any;
        try {
            requestBody = await request.text();
            if (requestBody) {
                requestBody = JSON.parse(requestBody);
            }
        } catch {
            requestBody = null;
        }

        // クエリパラメータを取得
        const queryParams: Record<string, string> = {};
        request.query.forEach((value, key) => {
            queryParams[key] = value;
        });

        // エコーレスポンス
        const echoResponse = {
            message: 'Echo endpoint is working!',
            timestamp: new Date().toISOString(),
            method: request.method,
            url: request.url,
            headers: Object.fromEntries(request.headers.entries()),
            query: queryParams,
            body: requestBody,
            environment: {
                nodeVersion: process.version,
                platform: process.platform
            }
        };

        return {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify(echoResponse, null, 2)
        };
    } catch (error) {
        context.error('Error in echo function:', error);
        return {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            })
        };
    }
}

app.http('echo', {
    methods: ['GET', 'POST', 'OPTIONS'],
    authLevel: 'anonymous',
    route: 'echo',
    handler: echo
});
