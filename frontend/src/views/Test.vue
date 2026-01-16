<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const isFluid = ref(true)
const viewportWidth = ref(window.innerWidth)
const containerWidth = ref(0)
const containerElement = ref<HTMLElement | null>(null)

const updateDimensions = () => {
  viewportWidth.value = window.innerWidth
  if (containerElement.value) {
    const rect = containerElement.value.getBoundingClientRect()
    containerWidth.value = Math.round(rect.width)
  }
}

window.addEventListener('resize', updateDimensions)

onMounted(() => {
  setTimeout(updateDimensions, 100)
})

const containerMaxWidth = computed(() => {
  if (isFluid.value) return '制限なし (100%)'
  
  const w = viewportWidth.value
  if (w >= 1920) return '1920px (xl)'
  if (w >= 1280) return '1280px (lg)'
  if (w >= 960) return '960px (md)'
  if (w >= 600) return '600px (sm)'
  return '100% (xs)'
})

const widthDifference = computed(() => {
  if (isFluid.value) return 0
  return viewportWidth.value - containerWidth.value
})
</script>

<template>
  <div>
    <!-- コントロールパネル -->
    <v-app-bar color="primary" density="compact">
      <v-toolbar-title>VContainer fluid 検証ページ</v-toolbar-title>
      <v-spacer />
      <v-chip class="mr-4" color="white" variant="flat">
        幅: {{ viewportWidth }}px
      </v-chip>
      <v-switch
        v-model="isFluid"
        :label="isFluid ? 'fluid: true' : 'fluid: false'"
        color="white"
        hide-details
        class="mr-4"
      />
    </v-app-bar>

    <!-- 検証コンテンツ -->
    <v-container ref="containerElement" :fluid="isFluid" class="py-8">
      <v-row>
        <v-col cols="12">
          <v-card class="pa-6 mb-6" elevation="2">
            <v-card-title class="text-h5 mb-4">🔍 リアルタイム幅測定</v-card-title>
            <v-card-text>
              <v-table density="compact" class="mb-4">
                <tbody>
                  <tr>
                    <td class="font-weight-bold">現在の設定:</td>
                    <td>
                      <v-chip :color="isFluid ? 'success' : 'warning'" size="small">
                        fluid={{ isFluid }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">ビューポート幅:</td>
                    <td>{{ viewportWidth }}px</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Container実測幅:</td>
                    <td>
                      <strong :class="containerWidth === viewportWidth ? 'text-success' : 'text-warning'">
                        {{ containerWidth }}px
                      </strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">理論上のmax-width:</td>
                    <td>{{ containerMaxWidth }}</td>
                  </tr>
                  <tr v-if="widthDifference > 0">
                    <td class="font-weight-bold">幅の差分:</td>
                    <td class="text-error">
                      <strong>{{ widthDifference }}px の空白が発生</strong>
                    </td>
                  </tr>
                  <tr v-else-if="isFluid">
                    <td class="font-weight-bold">状態:</td>
                    <td class="text-success">
                      <strong>✓ 全幅で表示されています</strong>
                    </td>
                  </tr>
                </tbody>
              </v-table>
              <div class="mb-4"><strong>説明:</strong> 
                <ul class="mt-2">
                  <li><code>fluid: true</code> - 画面幅いっぱいに広がる（max-widthなし）</li>
                  <li><code>fluid: false</code> - ブレークポイントに応じてmax-widthが適用される</li>
                </ul>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- グリッドテスト -->
      <v-row class="mb-4">
        <v-col cols="12">
          <h2 class="text-h5 mb-4">12カラムグリッドテスト</h2>
        </v-col>
        <v-col v-for="n in 12" :key="n" cols="1">
          <v-card color="primary" class="text-center pa-2">
            <div class="text-white text-caption">{{ n }}</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- レスポンシブテスト -->
      <v-row class="mb-4">
        <v-col cols="12">
          <h2 class="text-h5 mb-4">レスポンシブカラムテスト</h2>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card color="blue" class="pa-4">
            <v-card-text class="text-white">
              cols="12"<br>
              sm="6"<br>
              md="4"<br>
              lg="3"<br>
              xl="2"
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card color="green" class="pa-4">
            <v-card-text class="text-white">
              cols="12"<br>
              sm="6"<br>
              md="4"<br>
              lg="3"<br>
              xl="2"
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card color="orange" class="pa-4">
            <v-card-text class="text-white">
              cols="12"<br>
              sm="6"<br>
              md="4"<br>
              lg="3"<br>
              xl="2"
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <v-card color="red" class="pa-4">
            <v-card-text class="text-white">
              cols="12"<br>
              sm="6"<br>
              md="4"<br>
              lg="3"<br>
              xl="2"
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- オフセットテスト -->
      <v-row class="mb-4">
        <v-col cols="12">
          <h2 class="text-h5 mb-4">オフセットテスト（問題の原因）</h2>
          <p class="text-body-2 text-medium-emphasis mb-4">
            offset を使用すると、その分右側に空白が生じます
          </p>
        </v-col>
        <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
          <v-card color="purple" class="pa-4">
            <v-card-text class="text-white">
              cols="12"<br>
              md="8" offset-md="2"<br>
              lg="6" offset-lg="3"<br>
              <strong>→ lgで左3カラム、コンテンツ6カラム、右3カラム空白</strong>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- センタリングの比較 -->
      <v-row class="mb-4">
        <v-col cols="12">
          <h2 class="text-h5 mb-4">センタリング手法の比較</h2>
        </v-col>
      </v-row>

      <v-row class="mb-6">
        <v-col cols="12">
          <v-card class="pa-4 mb-4">
            <v-card-subtitle>方法1: offset使用（右側に空白が残る）</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="8" offset-md="2" lg="6" offset-lg="3">
          <v-card color="error" class="pa-4">
            <v-card-text class="text-white">
              offset使用 → 右側に空白
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="justify-center mb-6">
        <v-col cols="12">
          <v-card class="pa-4 mb-4">
            <v-card-subtitle>方法2: justify-center使用（推奨）</v-card-subtitle>
          </v-card>
        </v-col>
        <v-col cols="12" md="10" lg="8" xl="6">
          <v-card color="success" class="pa-4">
            <v-card-text class="text-white">
              justify-center + 幅調整 → バランス良く配置
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- タイル表示テスト -->
      <v-row class="mb-6">
        <v-col cols="12">
          <v-card class="pa-6 mb-4" color="error" variant="tonal">
            <v-card-title class="text-h5 mb-4">
              ⚠️ 真の原因判明: v-rowのネガティブマージン
            </v-card-title>
            <v-card-text>
              <v-alert type="error" variant="tonal" class="mb-4">
                <strong>検証結果: min-widthは原因ではありませんでした</strong>
              </v-alert>

              <h3 class="text-h6 mb-3">🔍 真の原因（Web検索による発見）</h3>
              
              <div class="explanation-box mb-4">
                <h4 class="font-weight-bold mb-2">1. v-rowのネガティブマージン</h4>
                <ul class="mb-3">
                  <li>v-rowは<strong>左右に-12pxのネガティブマージン</strong>を持つ</li>
                  <li>v-colは左右に12pxのパディングを持つ（ガター用）</li>
                  <li>通常はこれらが相殺されてバランスが取れる</li>
                </ul>

                <h4 class="font-weight-bold mb-2">2. box-sizing と幅の計算</h4>
                <ul class="mb-3">
                  <li>CSSのデフォルト: <code>width = content + padding + border</code></li>
                  <li>ネガティブマージンは幅の計算に含まれない</li>
                  <li>v-rowのネガティブマージンが親コンテナの境界を<strong>はみ出す</strong></li>
                </ul>

                <h4 class="font-weight-bold mb-2">3. タイル追加時の影響</h4>
                <ul class="mb-3">
                  <li>少数のコンテンツ: はみ出しが目立たない</li>
                  <li><strong>多数のv-col（24個のタイル）</strong>: 各v-colのパディング累積</li>
                  <li>ネガティブマージンの効果が<strong>視覚的に顕著</strong>になる</li>
                  <li>結果: コンテナが実質的に拡張されたように見える</li>
                </ul>

                <h4 class="font-weight-bold mb-2">4. なぜw=1380で全幅に見えたか</h4>
                <ul class="mb-3">
                  <li>max-width: 1280px の制約がある場合</li>
                  <li>v-rowの-12px × 2 = -24px のネガティブマージン</li>
                  <li>この24pxが左右にはみ出す</li>
                  <li>視覚的には 1280px + 24px ≈ 1304px に見える</li>
                  <li><strong>w=1380に近づくため、全幅のように錯覚</strong></li>
                </ul>

                <v-divider class="my-4"></v-divider>

                <h4 class="font-weight-bold mb-2">📚 参考情報</h4>
                <ul class="mb-3">
                  <li><a href="https://github.com/vuetifyjs/vuetify/issues/8611" target="_blank">Vuetify GitHub Issue #8611</a>: "New Grid System Negative Margins"</li>
                  <li>Vuetifyの既知の問題: v-rowのネガティブマージンがoverflow/水平スクロールを引き起こす</li>
                </ul>

                <v-alert type="success" variant="tonal" class="mt-4">
                  <strong>解決策:</strong><br>
                  1. <code>&lt;v-row no-gutters&gt;</code> でネガティブマージンを削除<br>
                  2. Container に <code>overflow: hidden</code> を適用してはみ出しを隠す<br>
                  3. <code>fluid: true</code> を使用してmax-width制約を完全に解除
                </v-alert>
              </div>
            </v-card-text>
          </v-card>

          <v-card class="pa-6 mb-4" color="warning" variant="tonal">
            <v-card-title class="text-h6 mb-4">
              ❌ 誤った仮説: min-width: auto
            </v-card-title>
            <v-card-text>
              <p class="mb-2">
                当初、Flexboxの <code>min-width: auto</code> が原因だと考えましたが、
                検証の結果、これは直接的な原因ではありませんでした。
              </p>
              <p>
                実際の原因は<strong>v-rowのネガティブマージン</strong>と<strong>box-sizingの計算方法</strong>でした。
              </p>
            </v-card-text>
          </v-card>

          <h2 class="text-h5 mb-4">タイル表示テスト（ネガティブマージンの効果確認）</h2>
          <p class="text-body-2 text-medium-emphasis mb-4">
            多数のタイルを並べることで、v-rowのネガティブマージンの効果を視覚的に確認できます
          </p>
        </v-col>
        <v-col 
          v-for="n in 24" 
          :key="n" 
          cols="12" 
          sm="6" 
          md="4" 
          lg="3" 
          xl="2"
        >
          <v-card 
            :color="['primary', 'secondary', 'success', 'info', 'warning', 'error'][n % 6]"
            class="tile-card pa-4 text-center"
            elevation="3"
          >
            <div class="text-h4 font-weight-bold text-white mb-2">{{ n }}</div>
            <div class="text-caption text-white">
              cols="12" sm="6" md="4" lg="3" xl="2"
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 境界線表示 -->
      <v-row class="mb-6">
        <v-col cols="12">
          <h2 class="text-h5 mb-4">Container境界線の可視化</h2>
          <div class="border-box">
            <div class="border-indicator">Container の端</div>
          </div>
        </v-col>
      </v-row>

      <!-- App構造の問題分析 -->
      <v-row>
        <v-col cols="12">
          <v-card class="pa-6 mb-6" color="warning" variant="tonal">
            <v-card-title class="text-h5 mb-4">
              ⚠️ 問題の原因: App構造の制約
            </v-card-title>
            <v-card-text>
              <h3 class="text-h6 mb-3">現在の構造:</h3>
              <pre class="code-block mb-4">App.vue
└── v-app
    ├── HeaderComponent
    │   └── v-app-bar
    │       └── <strong>v-container</strong> (max-width制約)
    ├── v-main
    │   └── router-view (各ページ)
    │       └── v-container fluid (期待通り動かない)
    └── FooterComponent
        └── v-footer
            └── <strong>v-container</strong> (max-width制約)</pre>

              <h3 class="text-h6 mb-3">fluid が機能しない理由:</h3>
              <ul class="mb-4">
                <li class="mb-2">
                  <strong>HeaderとFooterが v-container を使用</strong><br>
                  → これらは <code>max-width</code> を持ち、画面幅に関わらず中央に配置される
                </li>
                <li class="mb-2">
                  <strong>視覚的な一貫性の問題</strong><br>
                  → ページコンテンツが <code>fluid</code> で全幅でも、HeaderとFooterは制約される<br>
                  → ユーザーは全幅に見えない（HeaderとFooterの幅に揃っているように見える）
                </li>
                <li class="mb-2">
                  <strong>v-main の制約</strong><br>
                  → v-main 自体に幅の制限はないが、上下のHeader/Footerとの視覚的統一感により、<br>
                  　実質的に同じ幅に見える
                </li>
              </ul>

              <h3 class="text-h6 mb-3">解決策:</h3>
              <v-chip color="success" class="mr-2 mb-2">1. HeaderとFooterを fluid に変更</v-chip>
              <v-chip color="success" class="mr-2 mb-2">2. Header/Footer内でコンテンツを max-width で制御</v-chip>
              <v-chip color="success" class="mr-2 mb-2">3. ページごとに fluid の有無を切り替え可能にする</v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Vuetify Container 仕様 -->
      <v-row>
        <v-col cols="12">
          <v-card class="pa-6 mb-6" color="info" variant="tonal">
            <v-card-title class="text-h5 mb-4">
              📐 Vuetify v-container の仕様
            </v-card-title>
            <v-card-text>
              <h3 class="text-h6 mb-3">fluid プロパティ:</h3>
              <v-table class="mb-4">
                <thead>
                  <tr>
                    <th>設定</th>
                    <th>動作</th>
                    <th>max-width</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>fluid: false</code> (デフォルト)</td>
                    <td>ブレークポイントに応じた幅</td>
                    <td>xs: 100%, sm: 600px, md: 960px, lg: 1280px, xl: 1920px</td>
                  </tr>
                  <tr>
                    <td><code>fluid: true</code></td>
                    <td>常に100%幅</td>
                    <td>なし（100%）</td>
                  </tr>
                </tbody>
              </v-table>

              <h3 class="text-h6 mb-3">ブレークポイント:</h3>
              <v-table>
                <thead>
                  <tr>
                    <th>名前</th>
                    <th>範囲</th>
                    <th>container max-width</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>xs</td>
                    <td>0 - 599px</td>
                    <td>100%</td>
                  </tr>
                  <tr>
                    <td>sm</td>
                    <td>600 - 959px</td>
                    <td>600px</td>
                  </tr>
                  <tr>
                    <td>md</td>
                    <td>960 - 1279px</td>
                    <td>960px</td>
                  </tr>
                  <tr>
                    <td>lg</td>
                    <td>1280 - 1919px</td>
                    <td>1280px</td>
                  </tr>
                  <tr>
                    <td>xl</td>
                    <td>1920px+</td>
                    <td>1920px</td>
                  </tr>
                </tbody>
              </v-table>

              <v-alert type="info" class="mt-4" variant="tonal">
                <strong>重要:</strong> w=1380の場合、lgブレークポイント（1280-1919px）に該当するため、<br>
                <code>fluid: false</code> では max-width: 1280px が適用され、100px分の空白が発生します。
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.border-box {
  border: 3px dashed #f00;
  padding: 20px;
  margin: 0 -12px; /* v-col のパディングをオフセット */
  position: relative;
  min-height: 100px;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 0, 0, 0.1),
    rgba(255, 0, 0, 0.1) 10px,
    rgba(255, 0, 0, 0.05) 10px,
    rgba(255, 0, 0, 0.05) 20px
  );
}

.border-indicator {
  background: #f00;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  display: inline-block;
  font-size: 12px;

.tile-card {
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
}
  font-weight: bold;
}

code {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}

.code-block {
  background: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 16px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre;
}

.v-table {
  background: transparent !important;
}

.v-table th {
  font-weight: bold !important;
  background: rgba(0, 0, 0, 0.05) !important;
}

.explanation-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 16px;
}

.explanation-box ul {
  padding-left: 24px;
}

.explanation-box li {
  margin-bottom: 8px;
  line-height: 1.6;
}
</style>
