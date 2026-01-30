/**
 * Contact API の型定義
 */

export interface ContactFormData {
  name: string
  email: string
  message: string
  attachments?: AttachmentInfo[]
}

export interface AttachmentInfo {
  name: string
  size: number
  type: string
  data?: string // Base64エンコードされたデータ
}

export interface ContactResponse {
  success: boolean
  message: string
}

export interface ContactErrorResponse {
  error: string
}

export type ContactApiResponse = ContactResponse | ContactErrorResponse
