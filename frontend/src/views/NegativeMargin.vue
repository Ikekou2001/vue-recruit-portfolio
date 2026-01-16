<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

const useNoGutters = ref(false)
const isFluid = ref(false)
const viewportWidth = ref(window.innerWidth)
const containerWidth = ref(0)
const rowWidth = ref(0)
const containerElement = ref<HTMLElement | null>(null)
const rowElement = ref<HTMLElement | null>(null)

const updateDimensions = async () => {
  viewportWidth.value = window.innerWidth
  await nextTick()
  
  if (containerElement.value) {
    const rect = containerElement.value.getBoundingClientRect()
    containerWidth.value = Math.round(rect.width)
  }
  
  if (rowElement.value) {
    const rect = rowElement.value.getBoundingClientRect()
    rowWidth.value = Math.round(rect.width)
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

const rowOverflow = computed(() => {
  return rowWidth.value - containerWidth.value
})

const negativeMargin = computed(() => {
  return useNoGutters.value ? '0px' : '-12px (左右)'
})
</script>

<template>
  <div>
    <!-- コントロールパネル -->
    <v-app-bar color="error" density="compact">
      <v-toolbar-title>v-row ネガティブマージン検証</v-toolbar-title>
      <v-spacer />
      <v-chip class="mr-4" color="white" variant="flat">
        幅: {{ viewportWidth }}px
      </v-chip>
      <v-switch
        v-model="isFluid"
        :label="isFluid ? 'Container: fluid' : 'Container: max-width制約'"
        color="white"
        hide-details
        class="mr-4"
        density="compact"
        @update:model-value="updateDimensions"
      />
      <v-switch
        v-model="useNoGutters"
        :label="useNoGutters ? 'no-gutters: ON' : 'no-gutters: OFF'"
        color="white"
        hide-details
        class="mr-4"
        density="compact"
        @update:model-value="updateDimensions"
      />
    </v-app-bar>

    <!-- 検証コンテンツ -->
    <v-container ref="containerElement" :fluid="isFluid" class="py-8 test-container">
      <v-row>
        <v-col cols="12">
          <v-card class="pa-6 mb-6" elevation="2">
            <v-card-title class="text-h5 mb-4">🔬 リアルタイム幅測定</v-card-title>
            <v-card-text>
              <v-table density="compact" class="mb-4">
                <tbody>
                  <tr>
                    <td class="font-weight-bold">Container設定:</td>
                    <td>
                      <v-chip :color="isFluid ? 'success' : 'warning'" size="small">
                        {{ isFluid ? 'fluid: true' : 'fluid: false' }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">v-row設定:</td>
                    <td>
                      <v-chip :color="useNoGutters ? 'success' : 'error'" size="small">
                        {{ useNoGutters ? 'no-gutters: ON (margin:0)' : 'no-gutters: OFF (margin:-12px)' }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">ビューポート幅:</td>
                    <td>{{ viewportWidth }}px</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">理論上のmax-width:</td>
                    <td>{{ containerMaxWidth }}</td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Container実測幅:</td>
                    <td>
                      <strong>{{ containerWidth }}px</strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">v-row実測幅:</td>
                    <td>
                      <strong :class="rowWidth > containerWidth ? 'text-error' : 'text-success'">
                        {{ rowWidth }}px
                      </strong>
                    </td>
                  </tr>
                  <tr v-if="rowOverflow > 0">
                    <td class="font-weight-bold">はみ出し量:</td>
                    <td class="text-error">
                      <strong>{{ rowOverflow }}px がContainerからはみ出ています！</strong>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">v-rowのネガティブマージン:</td>
                    <td>
                      <code>{{ negativeMargin }}</code>
                    </td>
                  </tr>
                </tbody>
              </v-table>

              <v-alert 
                v-if="!useNoGutters && rowOverflow > 0" 
                type="error" 
                variant="tonal" 
                class="mb-4"
              >
                <strong>重要な発見!</strong><br>
                v-rowのネガティブマージン（-12px × 2 = -24px）により、<br>
                v-rowの<strong>視覚的な領域</strong>がContainerから <strong>{{ rowOverflow }}px はみ出しています</strong>。<br>
                <br>
                <strong>ただし、これは実際の幅（width）ではありません！</strong><br>
                ネガティブマージンは親要素の実際のwidthを変更せず、<strong>視覚的なoverflow</strong>を引き起こすだけです。
              </v-alert>

              <v-alert 
                v-if="!useNoGutters && rowOverflow === 0" 
                type="warning" 
                variant="tonal" 
                class="mb-4"
              >
                <strong>注意:</strong><br>
                はみ出し量が0pxと表示されていますが、これはブラウザの測定方法によるものです。<br>
                ネガティブマージンは <code>getBoundingClientRect()</code> で測定される<br>
                「視覚的な境界」には含まれません。
              </v-alert>

              <v-alert 
                v-if="useNoGutters && rowOverflow === 0" 
                type="success" 
                variant="tonal" 
                class="mb-4"
              >
                <strong>解決!</strong><br>
                <code>no-gutters</code> によりネガティブマージンが削除され、<br>
                v-rowがContainerの幅内に正しく収まっています。
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 境界線の視覚化 -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h5 mb-4">境界線の視覚化</h2>
          <v-card class="pa-4 mb-6" elevation="2">
            <div class="container-border">
              <div class="border-label">Container の境界</div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- タイル表示による検証 -->
      <v-row ref="rowElement" :no-gutters="useNoGutters" class="row-border">
        <v-col cols="12" class="mb-4">
          <h2 class="text-h5">タイル表示（v-rowのはみ出しを確認）</h2>
          <p class="text-body-2 text-medium-emphasis">
            赤い枠線がv-rowの境界を示します。Containerの境界（上の青枠）と比較してください。
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
              v-col
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 説明セクション -->
      <v-row class="mt-8">
        <v-col cols="12">
          <v-card class="pa-6 mb-6" color="info" variant="tonal">
            <v-card-title class="text-h5 mb-4">
              📚 v-rowのネガティブマージンとは
            </v-card-title>
            <v-card-text>
              <h3 class="text-h6 mb-3">設計意図</h3>
              <ul class="mb-4">
                <li>v-rowは左右に <code>margin: -12px</code> を持つ</li>
                <li>v-colは左右に <code>padding: 12px</code> を持つ（ガター用）</li>
                <li>これらが相殺されることで、最初と最後のv-colが親コンテナの端に揃う</li>
              </ul>

              <h3 class="text-h6 mb-3">重要な誤解の訂正</h3>
              <v-alert type="warning" variant="tonal" class="mb-4">
                <strong>ネガティブマージンは親要素の実際のwidthを変更しません！</strong><br>
                Web検索の結果:
                <ul class="mt-2">
                  <li>ネガティブマージンは<strong>視覚的なoverflow</strong>を引き起こす</li>
                  <li>親要素の <code>width</code> プロパティは変更されない</li>
                  <li><code>getBoundingClientRect()</code> はマージンを含まない</li>
                  <li>結果: 測定上は同じ幅だが、<strong>視覚的にはみ出す</strong></li>
                </ul>
              </v-alert>

              <h3 class="text-h6 mb-3">実際に何が起こっているか</h3>
              <ol class="mb-4">
                <li><strong>視覚的なはみ出し</strong>
                  <ul>
                    <li>v-rowのネガティブマージンにより、内容が左右12pxずつはみ出す</li>
                    <li>これは <code>overflow: visible</code> （デフォルト）による</li>
                  </ul>
                </li>
                <li><strong>Container幅は変わらない</strong>
                  <ul>
                    <li>max-width制約は依然として有効</li>
                    <li>Container自体の幅は1280pxのまま（lgの場合）</li>
                  </ul>
                </li>
                <li><strong>なぜ全幅に見えないか</strong>
                  <ul>
                    <li>はみ出しは24px（左右12px×2）のみ</li>
                    <li>w=1380の場合: 1280px + 24px = 1304px</li>
                    <li>1380px - 1304px = <strong>76pxの空白</strong>が残る</li>
                    <li>→ 全幅ではなく、少し広がっただけ</li>
                  </ul>
                </li>
              </ol>

              <h3 class="text-h6 mb-3">検証方法</h3>
              <ol class="mb-4">
                <li>ブラウザDevToolsで要素を検査
                  <ul>
                    <li>Containerの実測幅を確認（max-width制約内）</li>
                    <li>v-rowの視覚的な領域を確認（はみ出している）</li>
                  </ul>
                </li>
                <li><strong>no-gutters: OFF</strong> の状態
                  <ul>
                    <li>赤い枠（v-row）が青い枠（Container）からはみ出す</li>
                    <li>ただし、Containerのwidthは変わっていない</li>
                  </ul>
                </li>
                <li><strong>no-gutters: ON</strong> に切り替え
                  <ul>
                    <li>v-rowのネガティブマージンが削除</li>
                    <li>はみ出しが解消される</li>
                  </ul>
                </li>
              </ol>

              <v-alert type="info" variant="tonal" class="mt-4">
                <strong>結論:</strong><br>
                タイルを追加しても幅が<strong>全幅（ビューポート幅）にはならない</strong>理由:<br>
                1. ネガティブマージンは親要素のwidthを変更しない<br>
                2. はみ出しは24pxのみ（微々たる量）<br>
                3. max-width制約は依然として有効<br>
                4. 結果: 少し広がって見えるが、全幅ではない<br>
                <br>
                <strong>真の原因は別にある可能性が高い！</strong>
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 比較テスト -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h5 mb-4">比較: 少数のコンテンツ vs 多数のタイル</h2>
        </v-col>
      </v-row>

      <v-row :no-gutters="useNoGutters" class="mb-6">
        <v-col cols="12">
          <v-card class="pa-6" elevation="2">
            <v-card-title>少数のコンテンツ（1個のv-col）</v-card-title>
            <v-card-text>
              この場合でもv-rowのネガティブマージンは存在しますが、<br>
              視覚的にはあまり目立ちません。
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row :no-gutters="useNoGutters">
        <v-col cols="12" class="mb-4">
          <v-card class="pa-4" elevation="2">
            <v-card-title>多数のタイル（8個のv-col）</v-card-title>
            <v-card-text>
              複数のv-colが並ぶことで、ネガティブマージンの効果が<br>
              視覚的に顕著になります。
            </v-card-text>
          </v-card>
        </v-col>
        <v-col 
          v-for="n in 8" 
          :key="`compare-${n}`"
          cols="12" 
          sm="6" 
          md="4" 
          lg="3"
        >
          <v-card 
            color="primary"
            class="tile-card pa-4 text-center"
            elevation="3"
          >
            <div class="text-h4 font-weight-bold text-white">{{ n }}</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.test-container {
  position: relative;
}

.container-border {
  border: 4px solid #2196F3;
  height: 100px;
  position: relative;
  background: repeating-linear-gradient(
    45deg,
    rgba(33, 150, 243, 0.1),
    rgba(33, 150, 243, 0.1) 10px,
    rgba(33, 150, 243, 0.05) 10px,
    rgba(33, 150, 243, 0.05) 20px
  );
}

.border-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #2196F3;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: bold;
}

.row-border {
  border: 4px solid #f44336;
  padding-top: 12px;
  padding-bottom: 12px;
  position: relative;
  background: repeating-linear-gradient(
    -45deg,
    rgba(244, 67, 54, 0.05),
    rgba(244, 67, 54, 0.05) 10px,
    rgba(244, 67, 54, 0.02) 10px,
    rgba(244, 67, 54, 0.02) 20px
  );
}

.row-border::before {
  content: 'v-row の境界';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #f44336;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
  z-index: 10;
}

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

.v-table {
  background: transparent !important;
}

.v-table th {
  font-weight: bold !important;
  background: rgba(0, 0, 0, 0.05) !important;
}

code {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: monospace;
}
</style>
