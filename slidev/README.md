## Slidev Presentation

このディレクトリには、ポートフォリオのプレゼンテーション用スライドが含まれています。

### セットアップ

```bash
cd slidev
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで `http://localhost:3030` が自動的に開きます。

### ビルド

静的ファイルとしてエクスポート:

```bash
pnpm build
```

PDF エクスポート:

```bash
pnpm export
```

### スライド編集

`slides.md` を編集してください。Markdown 形式でスライドを作成できます。

- `---` でスライドを区切ります
- `<v-clicks>` でアニメーション付きリストを作成
- コードブロック、画像、その他の Markdown 機能が使用可能

詳細: https://sli.dev/
