import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

interface AttachmentInfo {
    name: string;
    size: number;
    type: string;
    data?: string; // Base64エンコードされたデータ
}

interface ContactFormData {
    name: string;
    email: string;
    message: string;
    attachments?: AttachmentInfo[];
}

interface ContactResponse {
    success: boolean;
    message: string;
}

interface ContactErrorResponse {
    error: string;
}

// CORSヘッダー（ローカル開発用）
const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

export async function contact(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Contact form submission received from ${request.url}`);

    // CORS preflight対応
    if (request.method === 'OPTIONS') {
        return {
            status: 204,
            headers: corsHeaders
        };
    }

    try {
        const formData: ContactFormData = await request.json() as ContactFormData;

        // Validation
        if (!formData.name || !formData.email || !formData.message) {
            const errorResponse: ContactErrorResponse = {
                error: 'お名前、メールアドレス、メッセージは必須です'
            };
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
                body: JSON.stringify(errorResponse)
            };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            const errorResponse: ContactErrorResponse = {
                error: '有効なメールアドレスを入力してください'
            };
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
                body: JSON.stringify(errorResponse)
            };
        }

        // メッセージ長制限
        if (formData.message.length > 10000) {
            const errorResponse: ContactErrorResponse = {
                error: 'メッセージは10000文字以内で入力してください'
            };
            return {
                status: 400,
                headers: { 'Content-Type': 'application/json', ...corsHeaders },
                body: JSON.stringify(errorResponse)
            };
        }

        // 添付ファイルサイズチェック (合計10MB以下)
        const maxTotalSize = 10 * 1024 * 1024; // 10MB
        if (formData.attachments && formData.attachments.length > 0) {
            const totalSize = formData.attachments.reduce((sum, att) => sum + att.size, 0);
            if (totalSize > maxTotalSize) {
                const errorResponse: ContactErrorResponse = {
                    error: '添付ファイルの合計サイズは10MB以下にしてください'
                };
                return {
                    status: 400,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders },
                    body: JSON.stringify(errorResponse)
                };
            }
        }

        // ログ出力（デバッグ用）
        context.log('Contact form data received:', {
            name: formData.name,
            email: formData.email,
            messageLength: formData.message.length,
            attachmentCount: formData.attachments?.length || 0,
            attachmentInfo: formData.attachments?.map(a => ({ name: a.name, size: a.size, type: a.type }))
        });

        // TODO: 実際のメール送信ロジックを追加
        // 選択肢:
        // 1. SendGrid: npm install @sendgrid/mail
        // 2. Azure Communication Services Email
        // 3. Nodemailer (SMTPサーバー経由)
        //
        // 例 (SendGrid):
        // import sgMail from '@sendgrid/mail';
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // await sgMail.send({
        //     to: 'contact@plumiume.com',
        //     from: process.env.SENDGRID_FROM_EMAIL || 'noreply@plumiume.com',
        //     replyTo: formData.email,
        //     subject: `お問い合わせ: ${formData.name}様より`,
        //     text: `差出人: ${formData.name} <${formData.email}>\n\n${formData.message}`,
        //     html: `<h3>差出人</h3><p>${formData.name} &lt;${formData.email}&gt;</p><h3>メッセージ</h3><p>${formData.message.replace(/\n/g, '<br>')}</p>`,
        //     attachments: formData.attachments?.map(att => ({
        //         content: att.data,
        //         filename: att.name,
        //         type: att.type,
        //         disposition: 'attachment'
        //     }))
        // });

        const successResponse: ContactResponse = {
            success: true,
            message: 'お問い合わせを受け付けました。ありがとうございます。'
        };

        return {
            status: 200,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
            body: JSON.stringify(successResponse)
        };
    } catch (error) {
        context.error('Error processing contact form:', error);
        const errorResponse: ContactErrorResponse = {
            error: 'サーバーエラーが発生しました。しばらくしてからお試しください。'
        };
        return {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...corsHeaders },
            body: JSON.stringify(errorResponse)
        };
    }
}

app.http('contact', {
    methods: ['POST', 'OPTIONS'],
    authLevel: 'anonymous',
    handler: contact
});
