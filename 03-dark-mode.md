# 📘 Phase 3: ダークモード実装ガイド

> **対象**: フロントエンド開発  
> **技術**: Vue 3 Composables + CSS Variables + localStorage + Vuetify
> **更新日**: 2026年1月7日

## 📋 目次

- [概要](#概要)
- [ダークモード実装アプローチ](#ダークモード実装アプローチ)
- [実装手順](#実装手順)
- [ファイル構成](#ファイル構成)
- [詳細解説](#詳細解説)
- [動作確認](#動作確認)
- [カスタマイズ方法](#カスタマイズ方法)
- [トラブルシューティング](#トラブルシューティング)

---

## 🎯 概要

このフェーズでは、モダンなダークモード機能を実装します。単なるトグル機能だけでなく、以下の機能を含む実用的な実装を行います。

### 実装する機能

- ✅ **システムpreference自動検出**: OSのダークモード設定を自動検出
- ✅ **localStorage永続化**: ユーザーの選択を保存・復元
- ✅ **リアルタイム切替**: スムーズなトランジション付きテーマ切替
- ✅ **Vuetifyテーマ統合**: VuetifyのLight/Darkテーマと連動
- ✅ **カスタムカラーパレット**: ブランドカラーに合わせた配色

---

## 🏗️ ダークモード実装アプローチ

### 1. CSS Variables方式（推奨）

```
┌─────────────────────────────────────────┐
│  :root (Light Mode)                     │
│  --bg-primary: #ffffff                  │
│  --text-primary: #1a1a1a                │
└─────────────────────────────────────────┘
                  ↓
        ユーザーがトグル
                  ↓
┌─────────────────────────────────────────┐
│  :root.dark (Dark Mode)                 │
│  --bg-primary: #0f172a                  │
│  --text-primary: #f1f5f9                │
└─────────────────────────────────────────┘
```

**メリット**:
- フレームワーク非依存
- 高速なパフォーマンス
- 保守性が高い
- グラデーション対応可能

### 2. Vuetifyテーマシステム

Vuetifyには組み込みのテーマシステムがあり、コンポーネントレベルで自動的にダークモードを適用できます。

```typescript
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: { colors: { primary: '#3b82f6', ... } },
      dark: { colors: { primary: '#60a5fa', ... } }
    }
  }
})
```

---

## 🔧 実装手順

### ステップ1: ディレクトリ構造の準備

```bash
cd frontend/src
mkdir -p styles composables/`__tests__`
```

必要なディレクトリ:
```
src/
├── styles/
│   └── variables.css      # CSS変数定義
├── composables/
│   ├── useDarkMode.ts     # ダークモードComposable
│   └── __tests__/
│       └── useDarkMode.spec.ts  # テストファイル
└── main.ts                # Vuetifyテーマ設定
```

### ステップ2: CSS変数ファイルの作成

**`src/styles/variables.css`** を作成:

```css
/* ============================================
   CSS Variables for Light/Dark Mode
   ============================================ */

:root {
  /* ========== Light Mode Colors ========== */
  
  /* 背景色 */
  --bg-primary: #ffffff;        /* メイン背景 */
  --bg-secondary: #f5f5f5;      /* セカンダリ背景（カード等） */
  --bg-tertiary: #e0e0e0;       /* ターシャリ背景（ホバー等） */
  
  /* テキスト色 */
  --text-primary: #1a1a1a;      /* メインテキスト */
  --text-secondary: #4a4a4a;    /* セカンダリテキスト */
  --text-tertiary: #8a8a8a;     /* 補助テキスト */
  
  /* アクセントカラー */
  --accent-primary: #3b82f6;    /* プライマリアクセント（ブルー） */
  --accent-secondary: #2563eb;  /* セカンダリアクセント */
  --accent-hover: #1d4ed8;      /* ホバー時 */
  
  /* ボーダー・影 */
  --border-color: #d1d5db;
  --shadow-color: rgba(0, 0, 0, 0.1);
  
  /* ステータスカラー */
  --success: #10b981;           /* 成功（グリーン） */
  --warning: #f59e0b;           /* 警告（オレンジ） */
  --error: #ef4444;             /* エラー（レッド） */
  
  /* トランジション速度 */
  --transition-speed: 0.3s;
}

/* ========== Dark Mode Colors ========== */
:root.dark {
  /* 背景色（暗め） */
  --bg-primary: #0f172a;        /* メイン背景（濃紺） */
  --bg-secondary: #1e293b;      /* セカンダリ背景 */
  --bg-tertiary: #334155;       /* ターシャリ背景 */
  
  /* テキスト色（明るめ） */
  --text-primary: #f1f5f9;      /* メインテキスト */
  --text-secondary: #cbd5e1;    /* セカンダリテキスト */
  --text-tertiary: #94a3b8;     /* 補助テキスト */
  
  /* アクセントカラー（明るめのブルー） */
  --accent-primary: #60a5fa;    /* プライマリアクセント */
  --accent-secondary: #3b82f6;  /* セカンダリアクセント */
  --accent-hover: #2563eb;      /* ホバー時 */
  
  /* ボーダー・影 */
  --border-color: #475569;
  --shadow-color: rgba(0, 0, 0, 0.3);
  
  /* ステータスカラー（明るめ） */
  --success: #34d399;
  --warning: #fbbf24;
  --error: #f87171;
}

/* ========== Global Transitions ========== */
* {
  transition: 
    background-color var(--transition-speed) ease,
    color var(--transition-speed) ease,
    border-color var(--transition-speed) ease;
}

/* ========== Body Styles ========== */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
               'Helvetica Neue', Arial, sans-serif;
}

/* ========== Utility Classes ========== */
.bg-primary { background-color: var(--bg-primary); }
.bg-secondary { background-color: var(--bg-secondary); }
.text-primary { color: var(--text-primary); }
.text-secondary { color: var(--text-secondary); }
.border-color { border-color: var(--border-color); }
```

**解説**:
- `:root`: ライトモードのデフォルト変数
- `:root.dark`: ダークモード時の変数（HTMLに`.dark`クラスが付与されると適用）
- `*`: 全要素にスムーズなトランジション効果
- Utility Classes: 頻繁に使う色をクラス化

### ステップ3: Vue Composable の作成

**`src/composables/useDarkMode.ts`** を作成:

```typescript
import { ref, onMounted, watch } from 'vue'

/**
 * ダークモードを管理するComposable
 * 
 * 機能:
 * - ダークモード状態の管理
 * - localStorage への永続化
 * - システムpreference の自動検出
 * - リアルタイムテーマ切替
 * 
 * @returns {Object} ダークモード関連の状態と関数
 */

// グローバル状態（複数コンポーネント間で共有）
const isDark = ref(false)

export const useDarkMode = () => {
  /**
   * ダークモードをトグル（切り替え）
   */
  const toggleDark = () => {
    isDark.value = !isDark.value
  }

  /**
   * ダークモードを明示的に設定
   * @param {boolean} value - true: ダークモード, false: ライトモード
   */
  const setDark = (value: boolean) => {
    isDark.value = value
  }

  /**
   * DOMとlocalStorageにテーマを適用
   * 
   * 処理内容:
   * 1. HTMLルート要素に 'dark' クラスを追加/削除
   * 2. localStorage に選択を保存
   */
  const updateTheme = () => {
    if (isDark.value) {
      // ダークモード適用
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      // ライトモード適用
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  /**
   * アプリ初期化時にテーマを復元
   * 
   * 優先順位:
   * 1. localStorage の保存値
   * 2. OSのシステムpreference
   * 3. デフォルト（ライトモード）
   */
  const initTheme = () => {
    // localStorage から保存されたテーマを取得
    const savedTheme = localStorage.getItem('theme')
    
    // OSのダークモード設定を取得
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    // 優先順位に従ってテーマを決定
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      isDark.value = true
    } else {
      isDark.value = false
    }
    
    // テーマを適用
    updateTheme()
  }

  /**
   * システムpreference の変更を監視
   * 
   * ユーザーが明示的にテーマを選択していない場合のみ、
   * システム設定の変更に追従する
   */
  const watchSystemPreference = () => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e: MediaQueryListEvent) => {
      // localStorage にテーマが保存されていない場合のみ追従
      if (!localStorage.getItem('theme')) {
        isDark.value = e.matches
      }
    }
    
    // イベントリスナーを登録
    mediaQuery.addEventListener('change', handleChange)
    
    // クリーンアップ関数を返す（コンポーネントアンマウント時に実行）
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }

  // isDark の変更を監視してテーマを更新
  watch(isDark, updateTheme)

  // コンポーネントマウント時に初期化
  onMounted(() => {
    initTheme()
    watchSystemPreference()
  })

  // 外部に公開するAPI
  return {
    isDark,      // リアクティブな状態
    toggleDark,  // トグル関数
    setDark      // セット関数
  }
}
```

**重要ポイント**:

1. **グローバル状態**: `const isDark = ref(false)` を関数外で定義することで、複数のコンポーネントで同じ状態を共有
2. **localStorage**: ページリロード後もテーマを保持
3. **システムpreference**: OSの設定を尊重
4. **watch**: リアクティブにテーマを更新

### ステップ4: Vuetifyテーマとの統合

**`src/main.ts`** を更新（既に実装済み）:

```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// CSS変数をインポート
import './styles/variables.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// Vuetifyインスタンスの作成
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      // ライトテーマ
      light: {
        colors: {
          primary: '#3b82f6',     // CSS変数と同じ色
          secondary: '#2563eb',
          accent: '#1d4ed8',
          error: '#ef4444',
          warning: '#f59e0b',
          info: '#3b82f6',
          success: '#10b981'
        }
      },
      // ダークテーマ
      dark: {
        colors: {
          primary: '#60a5fa',     // CSS変数と同じ色
          secondary: '#3b82f6',
          accent: '#2563eb',
          error: '#f87171',
          warning: '#fbbf24',
          info: '#60a5fa',
          success: '#34d399'
        }
      }
    }
  }
})

createApp(App)
  .use(vuetify)
  .mount('#app')
```

**解説**:
- VuetifyのテーマカラーをCSS変数と統一
- Light/Dark両方のテーマを定義

### ステップ5: コンポーネントでの使用例

**`src/App.vue`** でダークモード切替を実装（既に実装済み）:

```vue
<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useDarkMode } from './composables/useDarkMode'
import { watch } from 'vue'

// Vuetifyテーマ
const theme = useTheme()

// カスタムダークモードComposable
const { isDark, toggleDark } = useDarkMode()

// isDarkの変更をVuetifyテーマに反映
watch(isDark, (newValue) => {
  theme.global.name.value = newValue ? 'dark' : 'light'
})
</script>

<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-toolbar-title>Vue Portfolio</v-toolbar-title>
      <v-spacer></v-spacer>
      
      <!-- ダークモード切替ボタン -->
      <v-btn
        :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
        @click="toggleDark"
      >
        <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <!-- コンテンツ -->
    </v-main>
  </v-app>
</template>
```

---

## 📂 ファイル構成

実装後のファイル構造:

```
frontend/src/
├── styles/
│   └── variables.css              # CSS変数定義（Light/Dark）
├── composables/
│   ├── useDarkMode.ts            # ダークモードロジック
│   └── __tests__/
│       └── useDarkMode.spec.ts   # Vitestユニットテスト
├── main.ts                        # Vuetifyテーマ設定
└── App.vue                        # ダークモード切替UI
```

---

## 🔍 詳細解説

### CSS Variables vs Vuetifyテーマ

| 項目 | CSS Variables | Vuetifyテーマ |
|------|--------------|--------------|
| **適用範囲** | カスタムCSS全体 | Vuetifyコンポーネントのみ |
| **柔軟性** | 非常に高い | Vuetify内部に制限 |
| **パフォーマンス** | 高速 | やや遅い |
| **統合** | 手動 | 自動 |
| **推奨用途** | カスタムスタイル | Vuetifyコンポーネント |

### localStorage のデータ構造

```javascript
// 保存されるデータ
localStorage.setItem('theme', 'dark')  // または 'light'

// 取得
const theme = localStorage.getItem('theme')  // 'dark' | 'light' | null
```

### matchMedia API

システムのダークモードpreference検出:

```javascript
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
console.log(mediaQuery.matches)  // true: ダークモード, false: ライトモード

// 変更を監視
mediaQuery.addEventListener('change', (e) => {
  console.log('System theme changed to:', e.matches ? 'dark' : 'light')
})
```

---

## ✅ 動作確認

### 1. ローカルサーバー起動

```bash
cd frontend
pnpm dev
```

ブラウザで `http://localhost:3000/` を開く

### 2. 確認項目

#### ✅ 基本機能
- [ ] 右上のアイコンクリックでテーマが切り替わる
- [ ] ライトモード: 白背景、黒文字
- [ ] ダークモード: 暗い背景、明るい文字
- [ ] スムーズなトランジション効果

#### ✅ 永続化
- [ ] テーマを切り替えた後、ページリロードしてもテーマが保持される
- [ ] ブラウザを閉じて再度開いても選択が保持される

#### ✅ システムpreference
- [ ] OS設定を変更すると、初回訪問時に自動的に反映される
  - Windows: 設定 > 個人用設定 > 色 > モードを選択
  - Mac: システム環境設定 > 一般 > 外観

#### ✅ 開発者ツール確認

**localStorage確認**:
```javascript
// ブラウザコンソールで実行
console.log(localStorage.getItem('theme'))
// 結果: "dark" または "light"
```

**HTML class確認**:
```javascript
// ダークモード時
console.log(document.documentElement.classList.contains('dark'))
// 結果: true
```

**CSS変数確認**:
```javascript
// ルート要素のCSS変数を取得
const root = document.documentElement
const bgColor = getComputedStyle(root).getPropertyValue('--bg-primary')
console.log('Background color:', bgColor)
// ライトモード: #ffffff
// ダークモード: #0f172a
```

---

## 🎨 カスタマイズ方法

### 1. カラーパレットの変更

**`src/styles/variables.css`** を編集:

```css
:root {
  /* 独自のブランドカラーに変更 */
  --accent-primary: #ff6b6b;  /* 赤系アクセント */
  --accent-secondary: #ee5a6f;
  --accent-hover: #d9534f;
}

:root.dark {
  --accent-primary: #ff8787;  /* 明るい赤系 */
  --accent-secondary: #ff6b6b;
  --accent-hover: #ee5a6f;
}
```

### 2. トランジション速度の変更

```css
:root {
  --transition-speed: 0.5s;  /* 遅めのトランジション */
}
```

### 3. カスタムコンポーネントでの使用

```vue
<template>
  <div class="custom-card">
    <h2>カスタムカード</h2>
  </div>
</template>

<style scoped>
.custom-card {
  /* CSS変数を使用 */
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 6px var(--shadow-color);
  padding: 2rem;
  border-radius: 8px;
}

.custom-card:hover {
  background-color: var(--bg-tertiary);
}
</style>
```

### 4. Composableを他のコンポーネントで使用

```vue
<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDark, setDark } = useDarkMode()

// ダークモードに固定
const forceDark = () => {
  setDark(true)
}
</script>

<template>
  <button @click="toggleDark">
    現在のモード: {{ isDark ? 'ダーク' : 'ライト' }}
  </button>
</template>
```

---

## 🐛 トラブルシューティング

### 問題1: テーマが切り替わらない

**原因**: CSS変数が読み込まれていない

**解決策**:
```typescript
// main.ts で variables.css をインポート
import './styles/variables.css'
```

### 問題2: localStorage が保存されない

**原因**: ブラウザのプライベートモードまたはクッキー無効

**確認方法**:
```javascript
// ブラウザコンソールで実行
try {
  localStorage.setItem('test', 'test')
  console.log('localStorage available')
} catch (e) {
  console.error('localStorage not available:', e)
}
```

### 問題3: Vuetifyテーマが同期しない

**原因**: watchが正しく設定されていない

**解決策**:
```typescript
import { watch } from 'vue'
import { useTheme } from 'vuetify'
import { useDarkMode } from './composables/useDarkMode'

const theme = useTheme()
const { isDark } = useDarkMode()

// 必ず watch を設定
watch(isDark, (newValue) => {
  theme.global.name.value = newValue ? 'dark' : 'light'
})
```

### 問題4: システムpreference検出が機能しない

**原因**: matchMedia のイベントリスナーが登録されていない

**解決策**: `useDarkMode.ts` 内で `watchSystemPreference()` が呼ばれていることを確認

### 問題5: トランジションがカクつく

**原因**: 多すぎるCSS transitionプロパティ

**解決策**:
```css
/* 特定のプロパティのみトランジション */
* {
  transition: 
    background-color var(--transition-speed) ease,
    color var(--transition-speed) ease;
  /* border-color は削除してパフォーマンス改善 */
}
```

---

## 📚 参考リソース

### 公式ドキュメント
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Vuetify Themes](https://vuetifyjs.com/en/features/theme/)
- [CSS Custom Properties (Variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Window.matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia)

### 学習ポイント（就活アピール用）

このPhaseで学べる技術:

1. **Vue 3 Composables**: 再利用可能なロジックの抽出
2. **リアクティビティ**: `ref`, `watch`, `onMounted` の活用
3. **Web Storage API**: localStorage の実用的な使用
4. **matchMedia API**: システムpreference検出
5. **CSS Variables**: 動的テーマ切替の実装
6. **Vuetify統合**: サードパーティライブラリとの連携

---

**次のステップ**: [04-azure-functions.md](04-azure-functions.md) でバックエンドAPI構築に進む

**作成者**: plumiume  
**最終更新**: 2026年1月7日
