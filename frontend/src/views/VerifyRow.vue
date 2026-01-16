<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const useFluid = ref(true)
const useNoGutters = ref(false)
const justify = ref<'start' | 'center' | 'end' | 'space-between' | 'space-around'>('start')
const align = ref<'start' | 'center' | 'end'>('start')
const dense = ref(false)

const containerRef = ref<HTMLElement | null>(null)
const rowRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const rowWidth = ref(0)
const viewportWidth = ref(0)

const updateWidths = () => {
  viewportWidth.value = window.innerWidth
  if (containerRef.value) {
    containerWidth.value = containerRef.value.offsetWidth
  }
  if (rowRef.value) {
    rowWidth.value = rowRef.value.offsetWidth
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWidths)
  setTimeout(updateWidths, 100)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidths)
})

const rowOverflow = computed(() => Math.max(0, rowWidth.value - containerWidth.value))
const negativeMargin = computed(() => useNoGutters.value ? 0 : 24)

const justifyOptions = [
  { title: 'start (左寄せ)', value: 'start' },
  { title: 'center (中央)', value: 'center' },
  { title: 'end (右寄せ)', value: 'end' },
  { title: 'space-between', value: 'space-between' },
  { title: 'space-around', value: 'space-around' }
]

const alignOptions = [
  { title: 'start (上)', value: 'start' },
  { title: 'center (中央)', value: 'center' },
  { title: 'end (下)', value: 'end' }
]
</script>

<template>
  <v-container fluid class="py-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h4 font-weight-bold">
            v-row 検証ページ
          </v-card-title>
          <v-card-subtitle>
            VRowコンポーネントのガター、配置、ネガティブマージンを検証
          </v-card-subtitle>

          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>検証目的:</strong><br>
              v-rowの <code>no-gutters</code>、<code>justify</code>、<code>align</code>、<code>dense</code> プロパティと<br>
              ネガティブマージン（-12px）の挙動を確認します。
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
                <v-switch
                  v-model="useNoGutters"
                  color="primary"
                  label="no-gutters (ガター削除)"
                  hide-details
                  class="mb-4"
                />
                <v-switch
                  v-model="dense"
                  color="primary"
                  label="dense (間隔を狭く)"
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  v-model="justify"
                  :items="justifyOptions"
                  label="justify (水平方向)"
                  variant="outlined"
                  density="compact"
                  class="mb-4"
                />
                <v-select
                  v-model="align"
                  :items="alignOptions"
                  label="align (垂直方向)"
                  variant="outlined"
                  density="compact"
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
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="green-lighten-5" elevation="0">
                  <v-card-text>
                    <div class="text-h6 font-weight-bold mb-2">Container幅</div>
                    <div class="text-h4 text-green">{{ containerWidth }}px</div>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card color="red-lighten-5" elevation="0">
                  <v-card-text>
                    <div class="text-h6 font-weight-bold mb-2">Row幅</div>
                    <div class="text-h4 text-red">{{ rowWidth }}px</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <!-- ネガティブマージン情報 -->
            <v-alert 
              v-if="!useNoGutters" 
              type="warning" 
              variant="tonal" 
              class="mb-4"
            >
              <strong>ネガティブマージン:</strong> -{{ negativeMargin }}px (左右 -12px × 2)<br>
              はみ出し量: {{ rowOverflow }}px<br>
              <br>
              <em>注: ネガティブマージンは視覚的なoverflowを引き起こしますが、<br>
              親要素の実際のwidthは変更しません。</em>
            </v-alert>
            <v-alert 
              v-else 
              type="success" 
              variant="tonal" 
              class="mb-4"
            >
              <strong>ネガティブマージン:</strong> なし（no-guttersが有効）<br>
              はみ出し量: 0px
            </v-alert>

            <!-- 説明 -->
            <v-divider class="my-6" />

            <h3 class="text-h6 mb-3">VRow の仕様</h3>
            <ul class="mb-4">
              <li><strong>デフォルト:</strong> margin: -12px (左右) でガターシステムを実現</li>
              <li><strong>no-gutters:</strong> ネガティブマージンとガターを削除</li>
              <li><strong>justify:</strong> 水平方向の配置（flex-boxのjustify-content）</li>
              <li><strong>align:</strong> 垂直方向の配置（flex-boxのalign-items）</li>
              <li><strong>dense:</strong> ガター幅を半分に（6px）</li>
            </ul>

            <h3 class="text-h6 mb-3">ネガティブマージンの挙動</h3>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>重要な発見:</strong><br>
              <ul class="mt-2">
                <li>ネガティブマージンは親要素の <code>width</code> プロパティを変更しない</li>
                <li>視覚的に左右12pxずつはみ出す（overflow: visible）</li>
                <li><code>getBoundingClientRect()</code> による測定ではマージンは含まれない</li>
                <li>結果: 測定値は同じだが、視覚的にははみ出して見える</li>
              </ul>
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 視覚化用の実際のRow -->
  <div style="position: relative; margin-top: 20px;">
    <v-container 
      :fluid="useFluid || undefined" 
      ref="containerRef" 
      style="border: 3px solid green; background: rgba(76, 175, 80, 0.1); min-height: 300px; position: relative; padding: 20px;"
    >
      <div class="text-caption mb-2" style="color: green; font-weight: bold;">
        ← v-container の境界（緑）
      </div>
      
      <v-row 
        ref="rowRef"
        :no-gutters="useNoGutters"
        :justify="justify"
        :align="align"
        :dense="dense"
        style="border: 3px solid red; background: rgba(244, 67, 54, 0.1); min-height: 250px;"
      >
        <div 
          class="text-caption" 
          style="position: absolute; top: 5px; left: 5px; color: red; font-weight: bold;"
        >
          ← v-row の境界（赤）
        </div>
        
        <v-col cols="12" sm="6" md="3" v-for="n in 4" :key="n">
          <v-card elevation="2" class="pa-4">
            <div class="text-center">
              <div class="text-h6 font-weight-bold">Col {{ n }}</div>
              <div class="text-caption mt-2">cols="12" sm="6" md="3"</div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- 詳細説明 -->
  <v-container fluid class="mt-4">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>検証のポイント</v-card-title>
          <v-card-text>
            <ol>
              <li class="mb-2">
                <strong>no-gutters: OFF</strong> の状態で、赤い枠（v-row）が緑の枠（Container）から<br>
                はみ出しているか確認してください
              </li>
              <li class="mb-2">
                <strong>no-gutters: ON</strong> に切り替えて、はみ出しが解消されるか確認してください
              </li>
              <li class="mb-2">
                <strong>justify / align</strong> を変更して、Col配置が変わるか確認してください
              </li>
              <li class="mb-2">
                <strong>dense</strong> を ON にして、Col間の間隔が狭くなるか確認してください
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
