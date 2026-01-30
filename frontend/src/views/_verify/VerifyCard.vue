<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const useFluid = ref(true)
const elevation = ref(2)
const variant = ref<'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'>('elevated')
const rounded = ref<string | number | boolean>('lg')
const loading = ref(false)
const disabled = ref(false)
const hover = ref(true)

const variantOptions = [
  { title: 'elevated (デフォルト)', value: 'elevated' },
  { title: 'flat', value: 'flat' },
  { title: 'tonal', value: 'tonal' },
  { title: 'outlined', value: 'outlined' },
  { title: 'text', value: 'text' },
  { title: 'plain', value: 'plain' }
]

const roundedOptions = [
  { title: '0 (角なし)', value: 0 },
  { title: 'sm', value: 'sm' },
  { title: 'md (デフォルト)', value: 'md' },
  { title: 'lg', value: 'lg' },
  { title: 'xl', value: 'xl' },
  { title: 'pill (楕円)', value: 'pill' },
  { title: 'circle (円)', value: 'circle' }
]

const simulateLoading = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <v-container :fluid="useFluid || undefined" class="py-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h4 font-weight-bold">
            v-card 検証ページ
          </v-card-title>
          <v-card-subtitle>
            VCardコンポーネントのバリエーション、elevation、rounded を検証
          </v-card-subtitle>

          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>検証目的:</strong><br>
              v-cardの <code>elevation</code>、<code>variant</code>、<code>rounded</code>、<br>
              <code>loading</code>、<code>disabled</code>、<code>hover</code> プロパティの挙動を確認します。
            </v-alert>

            <!-- コントロール -->
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-switch
                  v-model="useFluid"
                  color="primary"
                  label="Container: fluid"
                  hide-details
                  class="mb-4"
                />
                <v-slider
                  v-model="elevation"
                  label="elevation (影の深さ)"
                  :min="0"
                  :max="24"
                  :step="1"
                  thumb-label
                  class="mb-4"
                />
                <v-select
                  v-model="variant"
                  :items="variantOptions"
                  label="variant"
                  variant="outlined"
                  density="compact"
                  class="mb-4"
                />
                <v-select
                  v-model="rounded"
                  :items="roundedOptions"
                  label="rounded (角の丸み)"
                  variant="outlined"
                  density="compact"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="hover"
                  color="primary"
                  label="hover (ホバー効果)"
                  hide-details
                  class="mb-4"
                />
                <v-switch
                  v-model="disabled"
                  color="primary"
                  label="disabled (無効化)"
                  hide-details
                  class="mb-4"
                />
                <v-btn
                  @click="simulateLoading"
                  color="primary"
                  block
                  :disabled="loading"
                >
                  loading状態をシミュレート
                </v-btn>
              </v-col>
            </v-row>

            <v-divider class="my-6" />

            <h3 class="text-h5 font-weight-bold mb-4">プレビュー</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- カードプレビュー -->
  <v-container :fluid="useFluid || undefined" class="mt-4">
    <v-row>
      <v-col cols="12" md="6" lg="4">
        <v-card
          :elevation="elevation"
          :variant="variant"
          :rounded="rounded"
          :loading="loading"
          :disabled="disabled"
          :hover="hover"
        >
          <v-card-title>シンプルカード</v-card-title>
          <v-card-subtitle>これは基本的なカードです</v-card-subtitle>
          <v-card-text>
            カードコンポーネントは情報をまとめて表示するのに便利です。
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-card
          :elevation="elevation"
          :variant="variant"
          :rounded="rounded"
          :loading="loading"
          :disabled="disabled"
          :hover="hover"
        >
          <v-img
            src="https://via.placeholder.com/400x200/4CAF50/FFFFFF?text=Image"
            height="200"
          />
          <v-card-title>画像付きカード</v-card-title>
          <v-card-text>
            v-imgと組み合わせて、視覚的に魅力的なカードを作成できます。
          </v-card-text>
          <v-card-actions>
            <v-btn variant="text" color="primary">アクション</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" lg="4">
        <v-card
          :elevation="elevation"
          :variant="variant"
          :rounded="rounded"
          :loading="loading"
          :disabled="disabled"
          :hover="hover"
        >
          <v-card-title class="d-flex align-center">
            <Icon icon="mdi:vuejs" width="24" height="24" class="mr-2" />
            アイコン付きカード
          </v-card-title>
          <v-card-text>
            <v-chip color="primary" size="small" class="mr-2">Vue 3</v-chip>
            <v-chip color="secondary" size="small" class="mr-2">Vuetify</v-chip>
            <v-chip color="success" size="small">TypeScript</v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn variant="outlined" color="primary" size="small">詳細</v-btn>
            <v-spacer />
            <v-btn icon="mdi:heart-outline" variant="text" color="pink" />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 特殊なカードバリエーション -->
  <v-container :fluid="useFluid || undefined" class="mt-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h5 font-weight-bold">
            特殊なバリエーション
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <!-- 横並びカード -->
      <v-col cols="12" md="6">
        <v-card
          :elevation="elevation"
          :variant="variant"
          :rounded="rounded"
          class="d-flex"
        >
          <v-img
            src="https://via.placeholder.com/150x200/2196F3/FFFFFF?text=Wide"
            width="150"
            cover
          />
          <div class="flex-grow-1">
            <v-card-title>横並びレイアウト</v-card-title>
            <v-card-text>
              d-flex クラスを使用して、画像とコンテンツを横並びに配置できます。
            </v-card-text>
          </div>
        </v-card>
      </v-col>

      <!-- カラー付きカード -->
      <v-col cols="12" md="6">
        <v-card
          :elevation="elevation"
          :variant="variant"
          :rounded="rounded"
          color="primary"
        >
          <v-card-title class="text-white">カラーカード</v-card-title>
          <v-card-text class="text-white">
            color プロパティでカード全体の色を変更できます。
          </v-card-text>
          <v-card-actions>
            <v-btn variant="outlined" color="white">白いボタン</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 説明セクション -->
  <v-container :fluid="useFluid || undefined" class="mt-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>VCard の仕様</v-card-title>
          <v-card-text>
            <h3 class="text-h6 mb-3">基本構造</h3>
            <ul class="mb-4">
              <li><code>v-card</code>: カードのコンテナ</li>
              <li><code>v-card-title</code>: カードのタイトル</li>
              <li><code>v-card-subtitle</code>: サブタイトル</li>
              <li><code>v-card-text</code>: メインコンテンツ</li>
              <li><code>v-card-actions</code>: アクションボタン配置エリア</li>
            </ul>

            <h3 class="text-h6 mb-3">主要プロパティ</h3>
            <ul class="mb-4">
              <li><code>elevation</code>: 影の深さ（0-24）、数値が大きいほど浮き上がって見える</li>
              <li><code>variant</code>: スタイルバリエーション（elevated, flat, tonal, outlined, text, plain）</li>
              <li><code>rounded</code>: 角の丸み（0, sm, md, lg, xl, pill, circle）</li>
              <li><code>color</code>: カードの背景色</li>
              <li><code>hover</code>: ホバー時にelevationが上がる効果</li>
              <li><code>loading</code>: ローディング状態を表示</li>
              <li><code>disabled</code>: カードを無効化</li>
            </ul>

            <h3 class="text-h6 mb-3">組み合わせ可能なコンポーネント</h3>
            <ul class="mb-4">
              <li><code>v-img</code>: 画像の表示</li>
              <li><code>v-chip</code>: タグ・ラベルの表示</li>
              <li><code>v-btn</code>: アクションボタン</li>
              <li><code>v-icon</code> / <code>Icon</code>: アイコンの表示</li>
              <li><code>v-spacer</code>: 要素間のスペース調整</li>
            </ul>

            <h3 class="text-h6 mb-3">使用例</h3>
            <ul>
              <li><strong>Projects.vue:</strong> プロジェクトカード（画像 + 説明 + タグ）</li>
              <li><strong>Skills.vue:</strong> スキルカード（アイコン + スキル名）</li>
              <li><strong>Contact.vue:</strong> SNSアカウントカード（アイコン + リンク）</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 検証のポイント -->
  <v-container :fluid="useFluid || undefined" class="mt-4">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>検証のポイント</v-card-title>
          <v-card-text>
            <ol>
              <li class="mb-2">
                <strong>elevation</strong> スライダーを動かして、影の深さの変化を確認
              </li>
              <li class="mb-2">
                <strong>variant</strong> を変更して、各スタイルの違いを確認
              </li>
              <li class="mb-2">
                <strong>rounded</strong> を変更して、角の丸みの変化を確認
              </li>
              <li class="mb-2">
                <strong>hover</strong> をONにして、カードにマウスを乗せた時の効果を確認
              </li>
              <li class="mb-2">
                <strong>loading</strong> ボタンを押して、ローディング状態を確認
              </li>
              <li class="mb-2">
                <strong>disabled</strong> をONにして、無効化状態を確認
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
