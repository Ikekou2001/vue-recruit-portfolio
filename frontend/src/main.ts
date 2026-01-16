import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// Material Kit v2風のモダンなテーマ設定
// 10_CONTENTS_QA.mdのカラーパレットに基づくテーマ
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#F26457',      // トマトレッド（メインアクション）
          secondary: '#8C5A4F',    // 茶褐色（セカンダリ）
          accent: '#F29580',       // コーラルピンク（アクセント）
          error: '#d32f2f',
          warning: '#f57c00',
          info: '#0288d1',
          success: '#388e3c',
          background: '#fafafa',
          surface: '#ffffff',
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
          'on-accent': '#000000',
        }
      },
      dark: {
        colors: {
          primary: '#F29580',      // コーラルピンク（ダークモードでは柔らか）
          secondary: '#A67C77',    // 明るめ茶褐色
          accent: '#F26457',       // トマトレッド（アクセント）
          error: '#ef5350',
          warning: '#ffa726',
          info: '#42a5f5',
          success: '#66bb6a',
          background: '#121212',
          surface: '#1e1e1e',
          'on-primary': '#000000',
          'on-secondary': '#000000',
          'on-accent': '#ffffff',
        }
      }
    }
  }
})

createApp(App).use(router).use(vuetify).mount('#app')
