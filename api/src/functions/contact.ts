import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    attachments?: Array<{
        name: string;
        size: number;
        type: string;
    }>;
}

export async function contact(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Contact form submission received`);

    try {
        const formData: ContactFormData = await request.json() as ContactFormData;

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    error: 'Name, email, and message are required'
                })
            };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    error: 'Invalid email format'
                })
            };
        }

        // TODO: ここに実際のメール送信ロジックを追加
        // 例: SendGrid, Azure Communication Services, など

        context.log('Contact form data:', {
            name: formData.name,
            email: formData.email,
            messageLength: formData.message.length,
            attachmentCount: formData.attachments?.length || 0
        });

        return {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                success: true,
                message: 'お問い合わせを受け付けました。ありがとうございます。'
            })
        };
    } catch (error) {
        context.error('Error processing contact form:', error);
        return {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                error: 'Internal server error'
            })
        };
    }
}

app.http('contact', {
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: contact
});
