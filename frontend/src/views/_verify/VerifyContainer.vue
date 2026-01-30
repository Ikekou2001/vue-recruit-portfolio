<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const useFluid = ref(false)
const showWideContent = ref(false)
const use100vwContent = ref(false)
const contentWidth = ref(2000)
const containerRef = ref<HTMLElement | null>(null)
const vw100Ref = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const vw100Width = ref(0)
const viewportWidth = ref(0)

const updateWidths = () => {
  viewportWidth.value = window.innerWidth
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth
  }
  if (vw100Ref.value) {
    vw100Width.value = vw100Ref.value.offsetWidth
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWidths)
  updateWidths()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidths)
})

const widthDiff = computed(() => viewportWidth.value - containerWidth.value)
const breakpoint = computed(() => {
  const w = viewportWidth.value
  if (w < 600) return 'xs (0-599px)'
  if (w < 960) return 'sm (600-959px)'
  if (w < 1280) return 'md (960-1279px)'
  if (w < 1920) return 'lg (1280-1919px)'
  return 'xl (1920px+)'
})

const maxWidthByBreakpoint = computed(() => {
  const w = viewportWidth.value
  if (w < 600) return 'なし'
  if (w < 960) return '600px'
  if (w < 1280) return '960px'
  if (w < 1920) return '1280px'
  return '1920px'
})
</script>

<template>
  <v-container :fluid="useFluid" class="py-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h4 font-weight-bold">
            v-container 検証ページ
          </v-card-title>
          <v-card-subtitle>
            VContainerコンポーネントの fluid プロパティの挙動を検証
          </v-card-subtitle>

          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>検証目的:</strong><br>
              v-containerの <code>fluid</code> プロパティがmax-width制約を解除し、<br>
              コンテナがビューポート全幅に広がるかを確認します。<br>
              <br>
              <strong>新しい仮説:</strong> 内部コンテンツの幅がContainer幅に影響を与える？<br>
              「幅広コンテンツを追加」をONにして検証してください。
            </v-alert>

            <!-- コントロール -->
            <v-row class="mb-6">
              <v-col cols="12" md="6">
                <v-switch
                  v-model="useFluid"
                  color="primary"
                  label="fluid プロパティ"
                  hide-details
                  class="mb-2"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-switch
                  v-model="showWideContent"
                  color="primary"
                  label="幅広コンテンツを追加"
                  hide-details
                  class="mb-2"
                />
                <v-switch
                  v-model="use100vwContent"
                  color="warning"
                  label="100vw div を表示 (h=0, 紫)"
                  hide-details
                  class="mb-4"
                />
                <v-slider
                  v-if="showWideContent"
                  v-model="contentWidth"
                  label="コンテンツ幅 (px)"
                  :min="1000"
                  :max="3000"
                  :step="100"
                  thumb-label
                  class="mt-4"
                />
              </v-col>
            </v-row>

            <!-- 測定値 -->
            <v-row class="mb-4">
              <v-col cols="12" md="4">
                <v-card color="blue-lighten-5" elevation="0">
                  <v-card-text>
                    <div class="text-h6 font-weight-bold mb-2">ビューポート幅</div>
                    <div class="text-h4 text-blue">{{ viewportWidth }}px</div>
                    <div class="text-caption mt-2">ブレークポイント: {{ breakpoint }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="green-lighten-5" elevation="0">
                  <v-card-text>
                    <div class="text-h6 font-weight-bold mb-2">Container実測幅</div>
                    <div class="text-h4 text-green">{{ containerWidth }}px</div>
                    <div class="text-caption mt-2">max-width: {{ maxWidthByBreakpoint }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="purple-lighten-5" elevation="0">
                  <v-card-text>
                    <div class="text-h6 font-weight-bold mb-2">100vw div実測幅</div>
                    <div class="text-h4 text-purple">{{ vw100Width }}px</div>
                    <div class="text-caption mt-2">width: 100vw</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- 差分 -->
            <v-alert 
              v-if="widthDiff > 0" 
              type="warning" 
              variant="tonal" 
              class="mb-4"
            >
              <strong>幅の差:</strong> {{ widthDiff }}px<br>
              Containerがビューポート全幅に広がっていません。
            </v-alert>
            <v-alert 
              v-else 
              type="success" 
              variant="tonal" 
              class="mb-4"
            >
              <strong>幅の差:</strong> 0px<br>
              Containerはビューポート全幅に広がっています！
            </v-alert>

            <v-alert 
              v-if="vw100Width !== viewportWidth" 
              type="info" 
              variant="tonal" 
              class="mb-4"
            >
              <strong>100vw div とビューポートの差:</strong> {{ Math.abs(vw100Width - viewportWidth) }}px<br>
              100vw div の実測幅がビューポート幅と異なります。<br>
              <em>原因: スクロールバーの幅やoverflowの影響</em>
            </v-alert>
            <v-alert 
              v-else 
              type="success" 
              variant="tonal" 
              class="mb-4"
            >
              <strong>100vw div とビューポートの差:</strong> 0px<br>
              100vw divはビューポート幅と同じです！
            </v-alert>

            <!-- 説明 -->
            <v-divider class="my-6" />

            <h3 class="text-h6 mb-3">VContainer fluid の仕様</h3>
            <ul class="mb-4">
              <li><strong>fluid=false（デフォルト）:</strong> ブレークポイントごとのmax-width制約が適用される</li>
              <li><strong>fluid=true:</strong> max-width制約が解除され、親要素の幅100%に広がる</li>
            </ul>

            <h3 class="text-h6 mb-3">100vw との比較</h3>
            <ul class="mb-4">
              <li><strong>100vw:</strong> ビューポート幅の100%（スクロールバーを含む）</li>
              <li><strong>fluid Container:</strong> 親要素（body）の幅100%（スクロールバーを除く）</li>
              <li><strong>重要:</strong> 100vw はスクロールバー幅を含むため、水平スクロールが発生する可能性がある</li>
            </ul>

            <h3 class="text-h6 mb-3">内部コンテンツの影響</h3>
            <ul class="mb-4">
              <li><strong>仮説:</strong> 内部コンテンツの幅がContainerの幅に影響を与える？</li>
              <li><strong>検証方法:</strong> 「幅広コンテンツを追加」をONにして、スライダーで幅を変更</li>
              <li><strong>期待される動作:</strong>
                <ul>
                  <li>内部コンテンツが大きくても、Containerのmax-width制約は維持される（fluid=falseの場合）</li>
                  <li>内部コンテンツが大きい場合、横スクロールが発生するか、はみ出す</li>
                </ul>
              </li>
              <li><strong>もし仮説が正しい場合:</strong> 内部コンテンツの幅に応じてContainer自体が拡張される</li>
            </ul>

            <h3 class="text-h6 mb-3">ブレークポイント別max-width</h3>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>ブレークポイント</th>
                    <th>画面幅</th>
                    <th>max-width (fluid=false)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>xs</td>
                    <td>0-599px</td>
                    <td>なし（100%）</td>
                  </tr>
                  <tr>
                    <td>sm</td>
                    <td>600-959px</td>
                    <td>600px</td>
                  </tr>
                  <tr>
                    <td>md</td>
                    <td>960-1279px</td>
                    <td>960px</td>
                  </tr>
                  <tr>
                    <td>lg</td>
                    <td>1280-1919px</td>
                    <td>1280px</td>
                  </tr>
                  <tr>
                    <td>xl</td>
                    <td>1920px+</td>
                    <td>1920px</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>

            <v-alert type="warning" variant="tonal" class="mt-4">
              <strong>注意:</strong><br>
              w=1380の場合、lgブレークポイント（max-width: 1280px）が適用され、<br>
              fluid=falseでは右側に100pxの空白が生じます。
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 100vw divの視覚化 -->
  <div v-if="use100vwContent" style="position: relative; margin-top: 20px;">
    <div 
      ref="vw100Ref"
      style="width: 100vw; border: 3px solid purple; background: rgba(156, 39, 176, 0.1); height: 0; position: relative; box-sizing: border-box;"
    >
    </div>
    <div class="text-center py-4">
      <div class="text-h5 font-weight-bold mb-3" style="color: purple;">100vw div (高さ0、紫の線)</div>
      <div class="text-body-1">紫の線が 100vw div の境界を示しています</div>
      <div class="text-h6 mt-4">実測幅: {{ vw100Width }}px</div>
      <div class="text-caption mt-2">ビューポート幅 (window.innerWidth): {{ viewportWidth }}px</div>
    </div>
  </div>

  <!-- 視覚化用の実際のContainer -->
  <div style="position: relative; margin-top: 20px;">
    <v-container 
      :fluid="useFluid || undefined" 
      ref="containerRef" 
      style="border: 3px solid blue; background: rgba(33, 150, 243, 0.1); min-height: 200px; position: relative;"
    >
      <v-row>
        <v-col cols="12">
          <div class="text-center py-8">
            <div class="text-h5 font-weight-bold mb-3">これがv-containerの実際の領域です</div>
            <div class="text-body-1">青い枠がContainerの境界を示しています</div>
            <div class="text-h6 mt-4">実測幅: {{ containerWidth }}px</div>
            
            <!-- 幅広コンテンツ -->
            <div v-if="showWideContent" class="mt-6">
              <div 
                :style="{ 
                  width: contentWidth + 'px', 
                  height: '50px', 
                  background: 'linear-gradient(90deg, #FF5722, #FFC107)', 
                  margin: '0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  border: '2px solid #FF5722'
                }"
              >
                {{ contentWidth }}px の幅広要素
              </div>
              <div class="text-caption mt-2" style="color: #FF5722;">
                この要素の幅がContainerを押し広げるか？
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.v-simple-table {
  background: transparent;
}
</style>
