<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { submitContactForm } from '@/services/contactApi'

const name = ref('')
const email = ref('')
const message = ref('')
const attachments = ref<File[]>([])
const isDragging = ref(false)
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const submitError = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    addFiles(Array.from(target.files))
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false
  if (event.dataTransfer?.files) {
    addFiles(Array.from(event.dataTransfer.files))
  }
}

const handleDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const addFiles = (files: File[]) => {
  attachments.value = [...attachments.value, ...files]
}

const removeFile = (index: number) => {
  attachments.value.splice(index, 1)
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = null
  
  try {
    // Azure Functions APIを呼び出し
    await submitContactForm({
      name: name.value,
      email: email.value,
      message: message.value,
      attachments: attachments.value.length > 0 ? attachments.value : undefined
    })
    
    submitSuccess.value = true
    
    // Reset form
    setTimeout(() => {
      name.value = ''
      email.value = ''
      message.value = ''
      attachments.value = []
      submitSuccess.value = false
    }, 3000)
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'お問い合わせの送信に失敗しました'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <v-container fluid class="py-16 px-4 px-md-8">
    <!-- ヘッダーセクション -->
    <v-row class="mb-12">
      <v-col cols="12" class="text-center">
        <h1 class="text-h3 font-weight-bold mb-3">
          お問い合わせ
        </h1>
        <p class="text-h6 text-medium-emphasis">
          コラボレーションやお気軽なご連絡、お待ちしております
        </p>
      </v-col>
    </v-row>

    <!-- SNS連絡先 -->
    <v-row class="mb-12 justify-center">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-6 text-center">
          SNS・連絡先
        </h2>
      </v-col>
      
      <!-- GitHub -->
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-card
          class="contact-card text-center pa-6 h-100"
          elevation="2"
          hover
          rounded="lg"
          href="https://github.com/plumiume"
          target="_blank"
        >
          <Icon icon="simple-icons:github" width="48" height="48" class="mb-3" />
          <v-card-title class="text-h6 font-weight-bold">GitHub</v-card-title>
          <v-card-text class="text-body-2">plumiume</v-card-text>
        </v-card>
      </v-col>

      <!-- Docker Hub -->
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-card
          class="contact-card text-center pa-6 h-100"
          elevation="2"
          hover
          rounded="lg"
          href="https://hub.docker.com/u/plumiume"
          target="_blank"
        >
          <Icon icon="simple-icons:docker" width="48" height="48" class="mb-3" />
          <v-card-title class="text-h6 font-weight-bold">Docker Hub</v-card-title>
          <v-card-text class="text-body-2">plumiume</v-card-text>
        </v-card>
      </v-col>

      <!-- X (Twitter) -->
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-card
          class="contact-card text-center pa-6 h-100"
          elevation="2"
          hover
          rounded="lg"
          href="https://x.com/plumiiume"
          target="_blank"
        >
          <Icon icon="simple-icons:x" width="48" height="48" class="mb-3" />
          <v-card-title class="text-h6 font-weight-bold">X</v-card-title>
          <v-card-text class="text-body-2">@plumiiume</v-card-text>
        </v-card>
      </v-col>

      <!-- Mail -->
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-card
          class="contact-card text-center pa-6 h-100"
          elevation="2"
          hover
          rounded="lg"
          href="mailto:contact@plumiume.com"
        >
          <Icon icon="simple-icons:gmail" width="48" height="48" class="mb-3" />
          <v-card-title class="text-h6 font-weight-bold">Mail</v-card-title>
          <v-card-text class="text-body-2">contact@plumiume.com</v-card-text>
        </v-card>
      </v-col>

      <!-- Google Mail -->
      <v-col cols="12" sm="6" md="4" lg="2">
        <v-card
          class="contact-card text-center pa-6 h-100"
          elevation="2"
          hover
          rounded="lg"
          href="https://mail.google.com/mail/?view=cm&fs=1&to=plumiiume@gmail.com"
          target="_blank"
        >
          <Icon icon="simple-icons:google" width="48" height="48" class="mb-3" />
          <v-card-title class="text-h6 font-weight-bold">Google</v-card-title>
          <v-card-text class="text-body-2">plumiiume@gmail.com</v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- オンラインミーティング予約 -->
    <v-row class="mb-12 justify-center">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold mb-6 text-center">
          オンラインミーティング予約
        </h2>
        <p class="text-h6 text-medium-emphasis text-center mb-6">
          面談やカジュアル面談のご予約はこちらから
        </p>
      </v-col>
      
      <!-- Jicoo -->
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card
          class="contact-card text-center pa-8 h-100"
          elevation="3"
          hover
          rounded="lg"
          href="https://www.jicoo.com/t/cWCe08UIPg6K/f/cF-_Jc6XnmJM"
          target="_blank"
        >
          <Icon icon="mdi:calendar-clock" width="64" height="64" class="mb-4" style="color: #F26457;" />
          <v-card-title class="text-h5 font-weight-bold mb-2">Jicooで予約</v-card-title>
          <v-card-text class="text-body-1">
            カレンダーから空き時間を選択して、<br>
            オンラインミーティングを予約できます
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- お問い合わせフォーム -->
    <v-row>
      <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
        <h2 class="text-h4 font-weight-bold mb-6 text-center">
          メッセージを送る
        </h2>
        
        <v-alert
          v-if="submitSuccess"
          type="success"
          variant="tonal"
          class="mb-6"
          rounded="lg"
        >
          <v-alert-title>送信完了！</v-alert-title>
          お問い合わせありがとうございます。近日中にご返信いたします。
        </v-alert>

        <v-alert
          v-if="submitError"
          type="error"
          variant="tonal"
          class="mb-6"
          rounded="lg"
          closable
          @click:close="submitError = null"
        >
          <v-alert-title>送信エラー</v-alert-title>
          {{ submitError }}
        </v-alert>

        <v-card
          class="pa-6"
          elevation="2"
          rounded="lg"
        >
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="name"
              label="お名前"
              variant="outlined"
              :rules="[v => !!v || 'お名前は必須です']"
              required
              class="mb-4"
            />

            <v-text-field
              v-model="email"
              label="メールアドレス"
              type="email"
              variant="outlined"
              :rules="[
                v => !!v || 'メールアドレスは必須です',
                v => /.+@.+\..+/.test(v) || '有効なメールアドレスを入力してください'
              ]"
              required
              class="mb-4"
            />

            <div
              class="message-drop-area mb-4"
              :class="{ 'dragging': isDragging }"
              @drop.prevent="handleDrop"
              @dragover.prevent="handleDragOver"
              @dragleave="handleDragLeave"
            >
              <v-textarea
                v-model="message"
                label="メッセージ"
                variant="outlined"
                :rules="[v => !!v || 'メッセージは必須です']"
                required
                rows="6"
                placeholder="メッセージを入力してください。&#10;または、ここにファイルをドラッグ＆ドロップして添付できます。"
              />
              
              <div v-if="isDragging" class="drop-overlay">
                <Icon icon="mdi:file-upload" width="48" height="48" />
                <div class="text-h6 mt-2">ファイルをドロップ</div>
              </div>
            </div>

            <!-- 添付ファイル一覧 -->
            <div v-if="attachments.length > 0" class="mb-4">
              <div class="text-subtitle-2 mb-2">添付ファイル ({{ attachments.length }})</div>
              <v-chip
                v-for="(file, index) in attachments"
                :key="index"
                class="ma-1"
                closable
                @click:close="removeFile(index)"
              >
                <Icon icon="mdi:file" width="16" height="16" class="mr-1" />
                {{ file.name }} ({{ formatFileSize(file.size) }})
              </v-chip>
            </div>

            <!-- ファイル選択ボタン -->
            <v-btn
              variant="outlined"
              color="primary"
              class="mb-4"
              @click="() => fileInput?.click()"
            >
              <Icon icon="mdi:paperclip" width="20" height="20" class="mr-2" />
              ファイルを添付
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              multiple
              style="display: none;"
              @change="handleFileSelect"
            />

            <v-btn
              type="submit"
              color="primary"
              size="large"
              rounded="lg"
              block
              :loading="isSubmitting"
              :disabled="!name || !email || !message"
            >
              送信する
              <Icon icon="mdi:send" width="20" height="20" style="margin-left: 8px;" />
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
/* Modern Cards */
.v-card {
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15) !important;
}

.v-alert {
  border-radius: 12px !important;
}

/* Drag and Drop Area */
.message-drop-area {
  position: relative;
  transition: all 0.3s ease;
}

.message-drop-area.dragging {
  opacity: 0.5;
}

.drop-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(242, 100, 87, 0.1);
  border: 3px dashed #F26457;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #F26457;
  font-weight: bold;
  pointer-events: none;
  z-index: 10;
}
</style>
