# Vue Recruit Portfolio - リンク集

## 🏠 メインページ

- [ホーム](http://localhost:3000/) - トップページ
- [プロジェクト](http://localhost:3000/projects) - プロジェクト一覧
- [スキル](http://localhost:3000/skills) - 技術スタック・スキル
- [お問い合わせ](http://localhost:3000/contact) - コンタクトフォーム

## 🧪 検証・テストページ

### 統合仮説検証ページ（従来）

- [VContainer fluid 検証](http://localhost:3000/_test) - Vuetify Container の fluid 属性の動作確認
- [Flexbox min-width 検証](http://localhost:3000/_fluid_flexbox) - Flexbox の min-width: auto 挙動の再現実験（❌誤った仮説）
- [v-row ネガティブマージン検証](http://localhost:3000/_negative_margin) - **ネガティブマージンの真実を検証**

### コンポーネント別検証ページ（新規）

- [v-container 検証](http://localhost:3000/_verify_container) - Container の fluid プロパティ詳細検証
- [v-row 検証](http://localhost:3000/_verify_row) - Row のガター、配置、ネガティブマージン検証
- [v-col 検証](http://localhost:3000/_verify_col) - Col のグリッド、オフセット、順序制御検証
- [v-card 検証](http://localhost:3000/_verify_card) - Card のバリエーション、elevation、rounded 検証
- [v-img 検証](http://localhost:3000/_verify_img) - Img のアスペクト比、フィット、グラデーション検証
- [v-expansion-panels 検証](http://localhost:3000/_verify_expansion_panels) - ExpansionPanels の折りたたみ動作検証

## 📝 検証ページの目的

### /_test
Vuetifyの`v-container`で`fluid`属性を使用した際の動作を検証するページ。
以下の内容を確認できます：
- リアルタイムでのContainer幅の測定
- 12カラムグリッドの動作
- レスポンシブレイアウトの挙動
- offsetによる右側空白の問題
- センタリング手法の比較
- タイル表示による視覚的な確認

### /_fluid_flexbox
純粋なdiv要素とFlexboxを使用して、`min-width: auto`の挙動を再現する実験ページ。
以下の内容を検証できます：
- `min-width: auto` vs `min-width: 0` の動作比較
- max-width制約が無視される現象の再現
- Containerの実測幅のリアルタイム測定
- Vuetifyの v-row/v-col との比較

**結果: ❌ min-widthは原因ではなかった**

### /_negative_margin
**✅ 真の原因を証明する検証ページ**

v-rowのネガティブマージン（-12px）が幅の拡張を引き起こす現象を実証します。
以下の内容を検証できます：
- v-rowとContainerの実測幅の比較
- ネガティブマージンによるはみ出し量の測定
- `no-gutters` プロパティの効果確認
- 境界線の視覚化によるはみ出しの確認
- タイルの有無による見え方の違い

**この検証により、v-rowのネガティブマージンが真の原因であることが証明されます。**

## 🔍 発見された問題

### 問題: w=1380以降で右側に空白が存在
**原因:**
1. `fluid: false` の場合、lgブレークポイント（1280-1919px）では max-width: 1280px が適用される
2. w=1380の場合、100px分の空白が発生

**解決策:**
- `fluid: true` を使用してmax-width制約を解除
- または、`justify-center` + 適切なカラム幅で中央配置

### 謎: タイル追加後に幅が拡張された
**原因:**
- Flexboxの`min-width: auto`（デフォルト値）により、子要素が最小幅を要求
- 多数のFlex子要素が親コンテナを内側から押し広げる
- 結果として、max-width制約が実質的に無視される

**検証結果:**
- ❌ **min-widthは原因ではなかった**
- ✅ **真の原因: v-rowのネガティブマージン**

**真の原因（Web検索による発見）:**
1. **v-rowは-12pxのネガティブマージン**を持つ（左右に-12px）
2. v-colは12pxのパディングを持つ（ガター用）
3. この組み合わせにより、v-rowが**親コンテナをはみ出す**
4. CSSの`box-sizing`の計算方法により、実際の幅が拡張される
5. 特に**多数のv-colがある場合**、この効果が顕著になる

**参考:**
- Vuetify GitHub Issue #8611: "New Grid System Negative Margins"
- v-rowの`no-gutters`プロパティでネガティブマージンを削除可能

## 🛠️ 開発環境

- フロントエンド: Vue 3 + TypeScript + Vite
- UIフレームワーク: Vuetify 3
- パッケージマネージャ: pnpm
- 開発サーバー: `http://localhost:3000/`

## 📚 参考資料

- [Vuetify Container API](https://vuetifyjs.com/api/VContainer/)
- [Vuetify Grid System](https://vuetifyjs.com/en/framework/grid)
- [CSS Flexbox min-width behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/min-width)
