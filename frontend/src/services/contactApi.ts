/**
 * Contact API サービス
 * Azure Functions との通信を行う
 */

import type { ContactFormData, ContactApiResponse, AttachmentInfo } from '@/types/contact'

// Azure Functions のベースURL
// ローカル開発時: http://localhost:7071/api
// 本番環境 (SWA統合): /api
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

/**
 * ファイルをBase64に変換
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const result = reader.result as string
      // data:mime/type;base64, のプレフィックスを除去
      const base64 = result.split(',')[1]
      resolve(base64)
    }
    reader.onerror = error => reject(error)
  })
}

/**
 * ファイル配列をAttachmentInfo配列に変換
 */
export async function filesToAttachments(files: File[]): Promise<AttachmentInfo[]> {
  const attachments: AttachmentInfo[] = []
  
  for (const file of files) {
    const data = await fileToBase64(file)
    attachments.push({
      name: file.name,
      size: file.size,
      type: file.type,
      data
    })
  }
  
  return attachments
}

/**
 * お問い合わせフォームを送信
 */
export async function submitContactForm(
  formData: {
    name: string
    email: string
    message: string
    attachments?: File[]
  }
): Promise<ContactApiResponse> {
  // 添付ファイルをBase64に変換
  let attachmentInfos: AttachmentInfo[] | undefined
  if (formData.attachments && formData.attachments.length > 0) {
    attachmentInfos = await filesToAttachments(formData.attachments)
  }

  const requestBody: ContactFormData = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
    attachments: attachmentInfos
  }

  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })

  const data = await response.json() as ContactApiResponse

  if (!response.ok) {
    throw new Error('error' in data ? data.error : 'お問い合わせの送信に失敗しました')
  }

  return data
}
