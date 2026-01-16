<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const isFluid = ref(true)
const useMinWidthAuto = ref(true)
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

const minWidthStyle = computed(() => {
  return useMinWidthAuto.value ? 'auto' : '0'
})
</script>

<template>
  <div>
    <!-- コントロールパネル -->
    <v-app-bar color="secondary" density="compact">
      <v-toolbar-title>Flexbox min-width 検証</v-toolbar-title>
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
      />
      <v-switch
        v-model="useMinWidthAuto"
        :label="useMinWidthAuto ? 'min-width: auto' : 'min-width: 0'"
        color="white"
        hide-details
        class="mr-4"
        density="compact"
      />
    </v-app-bar>

    <!-- 検証コンテンツ -->
    <v-container :fluid="isFluid" class="py-8">
      <v-row>
        <v-col cols="12">
          <v-card class="pa-6 mb-6" elevation="2">
            <v-card-title class="text-h5 mb-4">🔬 Flexbox min-width 検証実験</v-card-title>
            <v-card-text>
              <v-table density="compact" class="mb-4">
                <tbody>
                  <tr>
                    <td class="font-weight-bold">Container設定:</td>
                    <td>
                      <v-chip :color="isFluid ? 'success' : 'warning'" size="small">
                        {{ isFluid ? 'fluid: true (max-widthなし)' : 'fluid: false (max-width制約あり)' }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <td class="font-weight-bold">Flex子要素の設定:</td>
                    <td>
                      <v-chip :color="useMinWidthAuto ? 'error' : 'success'" size="small">
                        min-width: {{ minWidthStyle }}
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
                </tbody>
              </v-table>

              <v-alert type="info" variant="tonal" class="mb-4">
                <strong>実験の目的:</strong><br>
                通常のdiv要素でFlexboxの <code>min-width: auto</code> の挙動を再現し、<br>
                親コンテナのmax-width制約が無視される現象を検証します。
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- 純粋なdiv + Flexboxによる検証 -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h5 mb-4">純粋なdiv + Flexboxによる検証</h2>
          <v-card class="pa-4 mb-6" elevation="2">
            <div 
              ref="containerElement"
              class="flex-container"
              :class="{ 'container-fluid': isFluid, 'container-constrained': !isFluid }"
            >
              <div 
                v-for="n in 24" 
                :key="n"
                class="flex-item"
                :style="{ minWidth: minWidthStyle }"
              >
                <div class="tile-content" :class="`tile-color-${(n % 6) + 1}`">
                  {{ n }}
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!-- 説明セクション -->
      <v-row>
        <v-col cols="12">
          <v-card class="pa-6 mb-6" color="warning" variant="tonal">
            <v-card-title class="text-h5 mb-4">
              📋 検証結果の読み方
            </v-card-title>
            <v-card-text>
              <h3 class="text-h6 mb-3">パターン1: fluid=false + min-width=auto</h3>
              <ul class="mb-4">
                <li><strong>期待:</strong> Container は max-width 制約内に収まる</li>
                <li><strong>実際:</strong> Flex子要素の min-width: auto により、<strong>Containerが拡張される</strong></li>
                <li><strong>結果:</strong> max-width 制約が実質的に無視される</li>
              </ul>

              <h3 class="text-h6 mb-3">パターン2: fluid=false + min-width=0</h3>
              <ul class="mb-4">
                <li><strong>期待:</strong> Container は max-width 制約内に収まる</li>
                <li><strong>実際:</strong> Flex子要素が縮小可能になり、<strong>max-width制約が機能する</strong></li>
                <li><strong>結果:</strong> 右側に空白が発生する（w=1380なら100px）</li>
              </ul>

              <h3 class="text-h6 mb-3">パターン3: fluid=true + min-width=auto</h3>
              <ul class="mb-4">
                <li><strong>期待:</strong> Container は画面幅いっぱいに広がる</li>
                <li><strong>実際:</strong> max-width制約がないため、<strong>正常に全幅表示</strong></li>
                <li><strong>結果:</strong> 期待通りの動作</li>
              </ul>

              <v-alert type="success" variant="tonal" class="mt-4">
                <strong>結論:</strong><br>
                VuetifyのV-Containerでも同じ現象が発生します。<br>
                <code>min-width: auto</code> (デフォルト) の場合、多数のFlex子要素が親コンテナを押し広げ、<br>
                max-width制約が実質的に無視されます。
              </v-alert>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Vuetify v-rowとの比較 -->
      <v-row>
        <v-col cols="12">
          <h2 class="text-h5 mb-4">参考: Vuetify v-row による同じ検証</h2>
          <v-card class="pa-4 mb-6" elevation="2">
            <v-row>
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
                    Vuetify v-col
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
/* 純粋なFlexboxコンテナ */
.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 12px;
  background: rgba(0, 0, 0, 0.05);
  border: 2px solid #ccc;
  border-radius: 8px;
}

.container-constrained {
  max-width: 1280px; /* lgブレークポイント */
  margin: 0 auto;
}

.container-fluid {
  max-width: none;
  width: 100%;
}

/* Flex子要素 */
.flex-item {
  flex: 1 1 calc(16.666% - 12px); /* xl: 2/12 = 16.666% */
  /* min-width はJS側で動的に設定 */
}

.tile-content {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: bold;
  color: white;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.tile-content:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

/* カラーバリエーション */
.tile-color-1 { background: rgb(var(--v-theme-primary)); }
.tile-color-2 { background: rgb(var(--v-theme-secondary)); }
.tile-color-3 { background: rgb(var(--v-theme-success)); }
.tile-color-4 { background: rgb(var(--v-theme-info)); }
.tile-color-5 { background: rgb(var(--v-theme-warning)); }
.tile-color-6 { background: rgb(var(--v-theme-error)); }

/* Vuetify v-cardのスタイル */
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

/* レスポンシブ調整 */
@media (max-width: 1919px) {
  .flex-item {
    flex: 1 1 calc(25% - 12px); /* lg: 3/12 */
  }
}

@media (max-width: 1279px) {
  .flex-item {
    flex: 1 1 calc(33.333% - 12px); /* md: 4/12 */
  }
}

@media (max-width: 959px) {
  .flex-item {
    flex: 1 1 calc(50% - 12px); /* sm: 6/12 */
  }
}

@media (max-width: 599px) {
  .flex-item {
    flex: 1 1 100%; /* xs: 12/12 */
  }
}
</style>
