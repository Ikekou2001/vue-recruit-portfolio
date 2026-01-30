<script setup lang="ts">
import { ref } from 'vue'

const useFluid = ref(true)
const aspectRatio = ref<string | number>('16/9')
const cover = ref(true)
const height = ref<string | number>('auto')
const maxHeight = ref<string | number>('')
const position = ref('center center')
const gradient = ref('')

const aspectRatioOptions = [
  { title: '16/9 (ワイド)', value: '16/9' },
  { title: '4/3', value: '4/3' },
  { title: '1/1 (正方形)', value: '1' },
  { title: '3/4 (縦長)', value: '3/4' },
  { title: 'なし', value: undefined }
]

const heightOptions = [
  { title: 'auto (自動)', value: 'auto' },
  { title: '200px', value: '200' },
  { title: '300px', value: '300' },
  { title: '400px', value: '400' },
  { title: '100% (親要素)', value: '100%' }
]

const positionOptions = [
  { title: 'center center (中央)', value: 'center center' },
  { title: 'top center (上)', value: 'top center' },
  { title: 'bottom center (下)', value: 'bottom center' },
  { title: 'left center (左)', value: 'left center' },
  { title: 'right center (右)', value: 'right center' }
]

const gradientOptions = [
  { title: 'なし', value: '' },
  { title: '暗いオーバーレイ', value: 'to top, rgba(0,0,0,.5), rgba(0,0,0,.1)' },
  { title: '明るいオーバーレイ', value: 'to top, rgba(255,255,255,.5), rgba(255,255,255,.1)' },
  { title: 'グラデーション（青）', value: 'to right, rgba(33,150,243,.8), rgba(3,169,244,.3)' },
  { title: 'グラデーション（紫）', value: 'to bottom, rgba(156,39,176,.8), rgba(103,58,183,.3)' }
]

const sampleImages = [
  'https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Landscape+800x600',
  'https://via.placeholder.com/600x800/2196F3/FFFFFF?text=Portrait+600x800',
  'https://via.placeholder.com/1920x1080/FF5722/FFFFFF?text=FullHD+1920x1080',
  'https://via.placeholder.com/400x400/9C27B0/FFFFFF?text=Square+400x400'
]
</script>

<template>
  <v-container :fluid="useFluid || undefined" class="py-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h4 font-weight-bold">
            v-img 検証ページ
          </v-card-title>
          <v-card-subtitle>
            VImgコンポーネントのアスペクト比、フィット、ポジション、グラデーションを検証
          </v-card-subtitle>

          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>検証目的:</strong><br>
              v-imgの <code>aspect-ratio</code>、<code>cover/contain</code>、<code>height</code>、<br>
              <code>position</code>、<code>gradient</code> プロパティの挙動を確認します。
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
                  v-model="aspectRatio"
                  :items="aspectRatioOptions"
                  label="aspect-ratio (縦横比)"
                  variant="outlined"
                  density="compact"
                  class="mb-4"
                />
                <v-select
                  v-model="height"
                  :items="heightOptions"
                  label="height (高さ)"
                  variant="outlined"
                  density="compact"
                  class="mb-4"
                />
                <v-text-field
                  v-model="maxHeight"
                  label="max-height (最大高さ)"
                  placeholder="例: 300"
                  variant="outlined"
                  density="compact"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="cover"
                  color="primary"
                  class="mb-4"
                >
                  <template v-slot:label>
                    <div>
                      <strong>{{ cover ? 'cover' : 'contain' }}</strong>
                      <div class="text-caption">
                        {{ cover ? '画像を領域全体に拡大' : '画像を領域内に収める' }}
                      </div>
                    </div>
                  </template>
                </v-switch>
                <v-select
                  v-model="position"
                  :items="positionOptions"
                  label="position (配置位置)"
                  variant="outlined"
                  density="compact"
                  class="mb-4"
                />
                <v-select
                  v-model="gradient"
                  :items="gradientOptions"
                  label="gradient (オーバーレイ)"
                  variant="outlined"
                  density="compact"
                />
              </v-col>
            </v-row>

            <v-divider class="my-6" />

            <h3 class="text-h5 font-weight-bold mb-4">プレビュー</h3>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 画像プレビュー -->
  <v-container :fluid="useFluid || undefined" class="mt-4">
    <v-row>
      <v-col 
        v-for="(src, index) in sampleImages" 
        :key="index"
        cols="12" 
        md="6"
      >
        <v-card elevation="2">
          <v-img
            :src="src"
            :aspect-ratio="aspectRatio"
            :cover="cover"
            :height="height"
            :max-height="maxHeight || undefined"
            :position="position"
            :gradient="gradient"
          >
            <template v-slot:placeholder>
              <div class="d-flex align-center justify-center fill-height">
                <v-progress-circular
                  indeterminate
                  color="primary"
                />
              </div>
            </template>
          </v-img>
          <v-card-text>
            <div class="text-caption">画像 {{ index + 1 }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- テキストオーバーレイのデモ -->
  <v-container :fluid="useFluid || undefined" class="mt-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h5 font-weight-bold">
            テキストオーバーレイのデモ
          </v-card-title>
          <v-card-subtitle>
            gradientとslotを使った実用例
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-img
            src="https://via.placeholder.com/800x400/1976D2/FFFFFF?text=Hero+Image"
            height="300"
            cover
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.7)"
          >
            <div class="fill-height d-flex align-end">
              <v-card-title class="text-h4 text-white font-weight-bold">
                ヒーローイメージ
              </v-card-title>
            </div>
          </v-img>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card elevation="2">
          <v-img
            src="https://via.placeholder.com/800x400/E91E63/FFFFFF?text=Card+Header"
            height="300"
            cover
            gradient="to top, rgba(255,255,255,.9), rgba(255,255,255,.1)"
          >
            <div class="fill-height d-flex flex-column justify-space-between pa-4">
              <v-chip color="primary" label size="small" class="align-self-start">
                Featured
              </v-chip>
              <div>
                <div class="text-h5 font-weight-bold mb-1">カードヘッダー</div>
                <div class="text-body-2">グラデーションオーバーレイで読みやすく</div>
              </div>
            </div>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 説明セクション -->
  <v-container :fluid="useFluid || undefined" class="mt-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>VImg の仕様</v-card-title>
          <v-card-text>
            <h3 class="text-h6 mb-3">主要プロパティ</h3>
            <ul class="mb-4">
              <li><code>src</code>: 画像のURL</li>
              <li><code>alt</code>: 代替テキスト（アクセシビリティ重要）</li>
              <li><code>aspect-ratio</code>: 縦横比を固定（例: "16/9", "1"）</li>
              <li><code>height</code> / <code>width</code>: サイズ指定</li>
              <li><code>max-height</code> / <code>max-width</code>: 最大サイズ</li>
              <li><code>cover</code>: 画像を領域全体に拡大（デフォルト: true）</li>
              <li><code>contain</code>: 画像を領域内に収める（cover=falseと同じ）</li>
              <li><code>position</code>: 画像の配置位置（CSS object-position）</li>
              <li><code>gradient</code>: グラデーションオーバーレイ（CSS gradient構文）</li>
            </ul>

            <h3 class="text-h6 mb-3">cover vs contain</h3>
            <ul class="mb-4">
              <li><strong>cover (デフォルト):</strong>
                <ul>
                  <li>画像を領域全体に拡大して覆う</li>
                  <li>はみ出す部分はトリミングされる</li>
                  <li>領域に隙間ができない</li>
                  <li>使用例: カードヘッダー、サムネイル</li>
                </ul>
              </li>
              <li><strong>contain (cover=false):</strong>
                <ul>
                  <li>画像を領域内に完全に収める</li>
                  <li>アスペクト比を維持</li>
                  <li>領域に隙間ができる場合がある</li>
                  <li>使用例: ロゴ、アイコン、詳細画像</li>
                </ul>
              </li>
            </ul>

            <h3 class="text-h6 mb-3">gradientの使い方</h3>
            <ul class="mb-4">
              <li>CSS gradientの構文を使用</li>
              <li>例: <code>"to top, rgba(0,0,0,.5), rgba(0,0,0,.1)"</code></li>
              <li>テキストオーバーレイの可読性向上に便利</li>
              <li>方向: to top, to bottom, to right, to left など</li>
            </ul>

            <h3 class="text-h6 mb-3">スロット</h3>
            <ul class="mb-4">
              <li><code>default</code>: 画像の上に表示するコンテンツ</li>
              <li><code>placeholder</code>: ローディング中の表示</li>
              <li><code>error</code>: エラー時の表示</li>
            </ul>

            <h3 class="text-h6 mb-3">使用例</h3>
            <ul>
              <li><strong>Projects.vue:</strong> プロジェクト画像（GitHub OGP画像）</li>
              <li>contain + height固定で、画像全体を表示</li>
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
                <strong>aspect-ratio</strong> を変更して、縦横比の固定を確認
              </li>
              <li class="mb-2">
                <strong>cover / contain</strong> を切り替えて、画像のフィット方法の違いを確認<br>
                （coverは拡大、containは収める）
              </li>
              <li class="mb-2">
                <strong>height</strong> を変更して、固定高さの動作を確認
              </li>
              <li class="mb-2">
                <strong>position</strong> を変更して、画像の配置位置を確認<br>
                （coverの場合、トリミング位置が変わる）
              </li>
              <li class="mb-2">
                <strong>gradient</strong> を変更して、オーバーレイ効果を確認<br>
                （テキストオーバーレイとの組み合わせ）
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
