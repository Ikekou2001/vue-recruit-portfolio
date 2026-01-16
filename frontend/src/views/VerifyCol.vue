<script setup lang="ts">
import { ref } from 'vue'

interface ColConfig {
  id: number
  cols: number | string
  sm?: number | string
  md?: number | string
  lg?: number | string
  xl?: number | string
  offset?: number
  offsetSm?: number
  offsetMd?: number
  order?: number
  orderSm?: number
  orderMd?: number
}

const useNoGutters = ref(false)
const useFluid = ref(true)
const showOffsets = ref(false)
const showOrdering = ref(false)

const basicCols = ref<ColConfig[]>([
  { id: 1, cols: 12, sm: 6, md: 4 },
  { id: 2, cols: 12, sm: 6, md: 4 },
  { id: 3, cols: 12, sm: 6, md: 4 }
])

const offsetCols = ref<ColConfig[]>([
  { id: 1, cols: 12, md: 4, offset: 0, offsetMd: 0 },
  { id: 2, cols: 12, md: 4, offset: 0, offsetMd: 2 },
  { id: 3, cols: 12, md: 4, offset: 0, offsetMd: 2 }
])

const orderCols = ref<ColConfig[]>([
  { id: 1, cols: 4, order: 3, orderSm: 1, orderMd: 1 },
  { id: 2, cols: 4, order: 1, orderSm: 2, orderMd: 2 },
  { id: 3, cols: 4, order: 2, orderSm: 3, orderMd: 3 }
])

const getColSpecs = (col: ColConfig) => {
  const specs: string[] = []
  if (col.cols) specs.push(`cols="${col.cols}"`)
  if (col.sm) specs.push(`sm="${col.sm}"`)
  if (col.md) specs.push(`md="${col.md}"`)
  if (col.lg) specs.push(`lg="${col.lg}"`)
  if (col.xl) specs.push(`xl="${col.xl}"`)
  if (col.offset) specs.push(`offset="${col.offset}"`)
  if (col.offsetSm) specs.push(`offset-sm="${col.offsetSm}"`)
  if (col.offsetMd) specs.push(`offset-md="${col.offsetMd}"`)
  if (col.order) specs.push(`order="${col.order}"`)
  if (col.orderSm) specs.push(`order-sm="${col.orderSm}"`)
  if (col.orderMd) specs.push(`order-md="${col.orderMd}"`)
  return specs.join(' ')
}
</script>

<template>
  <v-container fluid class="py-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h4 font-weight-bold">
            v-col 検証ページ
          </v-card-title>
          <v-card-subtitle>
            VColコンポーネントのグリッド、オフセット、順序制御を検証
          </v-card-subtitle>

          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>検証目的:</strong><br>
              v-colの <code>cols/sm/md/lg/xl</code>、<code>offset</code>、<code>order</code> プロパティと<br>
              レスポンシブグリッドシステム（12カラム）の挙動を確認します。
            </v-alert>

            <!-- コントロール -->
            <v-row class="mb-6">
              <v-col cols="12" md="4">
                <v-switch
                  v-model="useFluid"
                  color="primary"
                  label="Container: fluid"
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-switch
                  v-model="useNoGutters"
                  color="primary"
                  label="no-gutters"
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-switch
                  v-model="showOffsets"
                  color="primary"
                  label="オフセットデモを表示"
                  hide-details
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-switch
                  v-model="showOrdering"
                  color="primary"
                  label="順序制御デモを表示"
                  hide-details
                />
              </v-col>
            </v-row>

            <v-divider class="my-6" />

            <!-- 基本グリッド -->
            <h3 class="text-h5 font-weight-bold mb-4">1. 基本グリッド（12カラムシステム）</h3>
            <v-alert type="info" variant="tonal" class="mb-4">
              各Colは画面幅に応じて異なる幅になります：<br>
              • <strong>xs (モバイル):</strong> 12/12 = 全幅<br>
              • <strong>sm (タブレット):</strong> 6/12 = 半分<br>
              • <strong>md (デスクトップ):</strong> 4/12 = 1/3
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 基本グリッドデモ -->
  <v-container :fluid="useFluid || undefined" class="mt-4">
    <v-row :no-gutters="useNoGutters">
      <v-col
        v-for="col in basicCols"
        :key="col.id"
        :cols="col.cols"
        :sm="col.sm"
        :md="col.md"
      >
        <v-card elevation="2" color="blue-lighten-5" class="pa-4">
          <div class="text-center">
            <div class="text-h6 font-weight-bold mb-2">Col {{ col.id }}</div>
            <div class="text-caption">{{ getColSpecs(col) }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- オフセットデモ -->
  <v-container :fluid="useFluid || undefined" class="mt-8" v-if="showOffsets">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h5 font-weight-bold">
            2. オフセット（offset）
          </v-card-title>
          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>offset</strong> はColの左側に空白を追加します。<br>
              例: <code>offset-md="2"</code> はmdブレークポイント以上で2カラム分の空白を作ります。
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row :no-gutters="useNoGutters" class="mt-4">
      <v-col
        v-for="col in offsetCols"
        :key="col.id"
        :cols="col.cols"
        :md="col.md"
        :offset="col.offset"
        :offset-md="col.offsetMd"
      >
        <v-card elevation="2" color="green-lighten-5" class="pa-4">
          <div class="text-center">
            <div class="text-h6 font-weight-bold mb-2">Col {{ col.id }}</div>
            <div class="text-caption">{{ getColSpecs(col) }}</div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 順序制御デモ -->
  <v-container :fluid="useFluid || undefined" class="mt-8" v-if="showOrdering">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title class="text-h5 font-weight-bold">
            3. 順序制御（order）
          </v-card-title>
          <v-card-text>
            <v-alert type="info" variant="tonal" class="mb-4">
              <strong>order</strong> はColの表示順序を制御します（flex-orderと同じ）。<br>
              以下の例では、画面幅に応じて順序が変わります：<br>
              • <strong>xs:</strong> 3-1-2<br>
              • <strong>sm以上:</strong> 1-2-3
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row :no-gutters="useNoGutters" class="mt-4">
      <v-col
        v-for="col in orderCols"
        :key="col.id"
        :cols="col.cols"
        :order="col.order"
        :order-sm="col.orderSm"
        :order-md="col.orderMd"
      >
        <v-card elevation="2" color="orange-lighten-5" class="pa-4">
          <div class="text-center">
            <div class="text-h6 font-weight-bold mb-2">Col {{ col.id }}</div>
            <div class="text-caption">{{ getColSpecs(col) }}</div>
            <div class="text-caption mt-2">
              xs: {{ col.order }}番目<br>
              sm/md: {{ col.orderSm }}番目
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- 説明セクション -->
  <v-container :fluid="useFluid || undefined" class="mt-8">
    <v-row>
      <v-col cols="12">
        <v-card elevation="2">
          <v-card-title>VCol の仕様</v-card-title>
          <v-card-text>
            <h3 class="text-h6 mb-3">グリッドシステム</h3>
            <ul class="mb-4">
              <li>12カラムシステム（合計12を超えると次の行に折り返す）</li>
              <li><code>cols</code>: 全ブレークポイント共通の幅</li>
              <li><code>sm/md/lg/xl</code>: 各ブレークポイントでの幅</li>
            </ul>

            <h3 class="text-h6 mb-3">オフセット</h3>
            <ul class="mb-4">
              <li><code>offset</code>: 左側の空白カラム数</li>
              <li><code>offset-sm/md/lg/xl</code>: ブレークポイント別オフセット</li>
              <li>センタリングなどのレイアウト調整に便利</li>
            </ul>

            <h3 class="text-h6 mb-3">順序制御</h3>
            <ul class="mb-4">
              <li><code>order</code>: 表示順序（flexboxのorder）</li>
              <li><code>order-sm/md/lg/xl</code>: ブレークポイント別順序</li>
              <li>HTMLの記述順とは異なる表示順を実現</li>
            </ul>

            <h3 class="text-h6 mb-3">ガター（v-rowとの連携）</h3>
            <ul>
              <li>各v-colは左右12pxのpaddingを持つ（デフォルト）</li>
              <li>v-rowのネガティブマージン（-12px）と相殺される</li>
              <li>結果: Col間に24pxの間隔が生まれる</li>
              <li><code>no-gutters</code> でガターを削除可能</li>
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
                ブラウザ幅を変えて、<strong>レスポンシブ動作</strong>を確認してください<br>
                （モバイル → タブレット → デスクトップ）
              </li>
              <li class="mb-2">
                <strong>no-gutters</strong> を切り替えて、Col間の間隔が変化するか確認してください
              </li>
              <li class="mb-2">
                <strong>オフセットデモ</strong>で、mdブレークポイント前後での<br>
                レイアウト変化を確認してください
              </li>
              <li class="mb-2">
                <strong>順序制御デモ</strong>で、画面幅による表示順序の変化を確認してください
              </li>
            </ol>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

