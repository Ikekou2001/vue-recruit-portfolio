import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import path from 'path'

// Vite設定ファイル
// 詳細: https://vite.dev/config/
export default defineConfig({
  // プラグイン設定
  // @vitejs/plugin-vue: Vue 3 の Single File Components (.vue) をサポート
  // vite-plugin-vuetify: Vuetifyの自動インポートとツリーシェイキングをサポート
  plugins: [
    vue(),
    vuetify({ autoImport: true })
  ],
  
  // モジュール解決の設定
  resolve: {
    // パスエイリアスの設定
    // '@' を 'src/' ディレクトリへのショートカットとして使用可能
    // 例: import Component from '@/components/Component.vue'
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  
  // 開発サーバーの設定
  server: {
    // 開発サーバーのポート番号（デフォルトは5173）
    port: 3000,
    
    // プロキシ設定
    // フロントエンド（http://localhost:3000）からのAPIリクエストを
    // バックエンド（Azure Functions: http://localhost:7071）に転送
    proxy: {
      // '/api' で始まるリクエストをプロキシ
      '/api': {
        // プロキシ先のAzure Functionsサーバー
        target: 'http://localhost:7071',
        // Originヘッダーをターゲットに変更（CORS対策）
        changeOrigin: true,
      }
    }
  }
})
