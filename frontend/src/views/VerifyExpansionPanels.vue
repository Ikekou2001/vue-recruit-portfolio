<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const useFluid = ref(true)
const panel = ref<number[]>([])
const variant = ref<'default' | 'accordion' | 'inset' | 'popout'>('default')
const multiple = ref(false)
const mandatory = ref(false)
const readonly = ref(false)
const disabled = ref(false)

const variantOptions = [
  { title: 'default (デフォルト)', value: 'default' },
  { title: 'accordion (アコーディオン)', value: 'accordion' },
  { title: 'inset (インセット)', value: 'inset' },
  { title: 'popout (ポップアウト)', value: 'popout' }
]

const techCategories = [
  {
    title: 'バックエンド',
    icon: 'mdi:server',
    skills: ['Python', 'PyTorch', 'FastAPI', 'Node.js']
  },
  {
    title: 'フロントエンド',
    icon: 'mdi:monitor',
    skills: ['TypeScript', 'Vue.js', 'Vuetify', 'Vite']
  },
  {
    title: 'DevOps',
    icon: 'mdi:cloud',
    skills: ['Docker', 'Git', 'GitHub Actions', 'Azure']
  }
]
</script>

<template>
  <v-container :fluid="useFluid || undefined" class="py-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h4 font-weight-bold">
            v-expansion-panels 検証ページ
          </v-card-title>
          <v-card-subtitle>
            VExpansionPanelsコンポーネントの折りたたみ動作、バリアント、モードを検証
          </v-card-subtitle>

          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>検証目的:</strong><br>
              v-expansion-panelsの <code>variant</code>、<code>multiple</code>、<code>mandatory</code>、<br>
              <code>readonly</code>、<code>disabled</code> プロパティの挙動を確認します。
            </v-alert>

            <!-- コントロール -->
            <v-row class="mb-6">
              <v-col cols="12">
                <v-switch
                  v-model="useFluid"
                  color="primary"
                  label="Container: fluid"
                  hide-details
                  class="mb-4"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="variant"
                  :items="variantOptions"
                  label="variant"
                  variant="outlined"
                  density="compact"
                  class="mb-4"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="multiple"
                  color="primary"
                  label="multiple (複数開ける)"
                  hide-details
                  class="mb-4"
                />
                <v-switch
                  v-model="mandatory"
                  color="primary"
                  label="mandatory (必ず1つ開く)"
                  hide-details
                  class="mb-4"
                />
                <v-switch
                  v-model="readonly"
                  color="primary"
                  label="readonly (読み取り専用)"
                  hide-details
                  class="mb-4"
                />
                <v-switch
                  v-model="disabled"
                  color="primary"
                  label="disabled (無効化)"
                  hide-details
                />
              </v-col>
            </v-row>

            <v-divider class="my-6" />

            <h3 class="text-h5 font-weight-bold mb-4">プレビュー</h3>
            <v-alert type="info" variant="tonal" density="compact" class="mb-4">
              現在の状態: 開いているパネル = {{ panel.length > 0 ? panel : 'なし' }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 基本デモ -->
  <v-container :fluid="useFluid || undefined" class="mt-4">
    <v-expansion-panels
      v-model="panel"
      :variant="variant"
      :multiple="multiple"
      :mandatory="mandatory"
      :readonly="readonly"
      :disabled="disabled"
    >
      <v-expansion-panel
        v-for="(category, index) in techCategories"
        :key="index"
      >
        <v-expansion-panel-title>
          <div class="d-flex align-center">
            <Icon :icon="category.icon" width="24" height="24" class="mr-3" />
            <span class="text-h6 font-weight-bold">{{ category.title }}</span>
          </div>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-chip
            v-for="skill in category.skills"
            :key="skill"
            color="primary"
            variant="outlined"
            class="mr-2 mb-2"
          >
            {{ skill }}
          </v-chip>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>

  <!-- 高度な使用例 -->
  <v-container :fluid="useFluid || undefined" class="mt-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h5 font-weight-bold">
            高度な使用例
          </v-card-title>
          <v-card-subtitle>
            カスタムヘッダーとコンテンツ
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <h3 class="text-h6 mb-3">シンプルなFAQ</h3>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title>
              このポートフォリオサイトはどのように作られていますか？
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Vue 3 + TypeScript + Vuetify 3 で構築されています。
              Viteをビルドツールとして使用し、pnpmで依存関係を管理しています。
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              デプロイ先はどこですか？
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Azure Static Web Appsにデプロイしています。
              バックエンドAPIはAzure Functionsを使用する予定です。
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title>
              連絡方法は？
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Contactページからお問い合わせいただけます。
              GitHubやLinkedInからも連絡可能です。
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>

      <v-col cols="12" md="6">
        <h3 class="text-h6 mb-3">色付きパネル</h3>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="bg-blue-lighten-5">
              <Icon icon="mdi:information" width="20" height="20" class="mr-2" />
              情報
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              このパネルは青色の背景を持っています。
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="bg-green-lighten-5">
              <Icon icon="mdi:check-circle" width="20" height="20" class="mr-2" />
              成功
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              このパネルは緑色の背景を持っています。
            </v-expansion-panel-text>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-title class="bg-orange-lighten-5">
              <Icon icon="mdi:alert" width="20" height="20" class="mr-2" />
              警告
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              このパネルはオレンジ色の背景を持っています。
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>

  <!-- 説明セクション -->
  <v-container :fluid="useFluid || undefined" class="mt-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>VExpansionPanels の仕様</v-card-title>
          <v-card-text>
            <h3 class="text-h6 mb-3">基本構造</h3>
            <ul class="mb-4">
              <li><code>v-expansion-panels</code>: パネルのコンテナ</li>
              <li><code>v-expansion-panel</code>: 個別のパネル</li>
              <li><code>v-expansion-panel-title</code>: ヘッダー（クリック可能）</li>
              <li><code>v-expansion-panel-text</code>: 展開されるコンテンツ</li>
            </ul>

            <h3 class="text-h6 mb-3">主要プロパティ（v-expansion-panels）</h3>
            <ul class="mb-4">
              <li><code>variant</code>: スタイルバリエーション
                <ul>
                  <li><strong>default:</strong> 標準スタイル</li>
                  <li><strong>accordion:</strong> パネル間に隙間なし</li>
                  <li><strong>inset:</strong> インセット効果</li>
                  <li><strong>popout:</strong> 開いたパネルが浮き上がる</li>
                </ul>
              </li>
              <li><code>multiple</code>: 複数のパネルを同時に開けるか（デフォルト: false）</li>
              <li><code>mandatory</code>: 必ず1つ以上のパネルが開いている（デフォルト: false）</li>
              <li><code>readonly</code>: 展開/折りたたみを無効化</li>
              <li><code>disabled</code>: パネル全体を無効化</li>
            </ul>

            <h3 class="text-h6 mb-3">v-model の使い方</h3>
            <ul class="mb-4">
              <li><strong>単一モード（multiple=false）:</strong> 数値または undefined
                <ul>
                  <li>例: <code>v-model="0"</code> → 最初のパネルが開く</li>
                  <li><code>undefined</code> → すべて閉じる</li>
                </ul>
              </li>
              <li><strong>複数モード（multiple=true）:</strong> 数値の配列
                <ul>
                  <li>例: <code>v-model="[0, 2]"</code> → 1番目と3番目のパネルが開く</li>
                  <li>空配列 <code>[]</code> → すべて閉じる</li>
                </ul>
              </li>
            </ul>

            <h3 class="text-h6 mb-3">使用例</h3>
            <ul>
              <li><strong>Skills.vue:</strong> 他スキル一覧の折りたたみ表示</li>
              <li>多数のスキルを1つのパネルにまとめて、デフォルトでは非表示</li>
              <li>ユーザーが必要に応じて展開できる</li>
            </ul>

            <h3 class="text-h6 mb-3">実用的な使い方</h3>
            <ul>
              <li><strong>FAQ:</strong> よくある質問と回答</li>
              <li><strong>カテゴリ別表示:</strong> 多数の項目をカテゴリで分類</li>
              <li><strong>詳細情報の折りたたみ:</strong> 初期表示を簡潔に保つ</li>
              <li><strong>設定パネル:</strong> 高度な設定を折りたたんで隠す</li>
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
                <strong>variant</strong> を変更して、各スタイルの違いを確認<br>
                （default, accordion, inset, popout）
              </li>
              <li class="mb-2">
                <strong>multiple</strong> をONにして、複数のパネルを同時に開けることを確認
              </li>
              <li class="mb-2">
                <strong>mandatory</strong> をONにして、常に1つ以上のパネルが開いていることを確認<br>
                （すべて閉じようとしても閉じられない）
              </li>
              <li class="mb-2">
                <strong>readonly</strong> をONにして、展開/折りたたみができなくなることを確認
              </li>
              <li class="mb-2">
                <strong>disabled</strong> をONにして、パネル全体が無効化されることを確認
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
