# Azure Functions API

このディレクトリには、Azure Static Web Apps用のAzure Functions APIが含まれています。

## 構造

```
api/
├── src/
│   └── functions/
│       ├── message.ts    # サンプルAPI
│       └── contact.ts    # お問い合わせフォーム送信API
├── host.json             # Azure Functions設定
├── local.settings.json   # ローカル環境変数
├── package.json          # 依存関係
└── tsconfig.json         # TypeScript設定
```

## API エンドポイント

### GET/POST `/api/message`
テストメッセージを返すサンプルエンドポイント

**レスポンス例:**
```json
{
  "text": "Hello from the API!",
  "timestamp": "2026-01-16T12:00:00.000Z"
}
```

### POST `/api/contact`
お問い合わせフォームの送信を処理

**リクエスト:**
```json
{
  "name": "山田太郎",
  "email": "yamada@example.com",
  "message": "お問い合わせ内容",
  "attachments": []
}
```

**レスポンス:**
```json
{
  "success": true,
  "message": "お問い合わせを受け付けました。ありがとうございます。"
}
```

## ローカル開発

1. 依存関係のインストール:
```bash
cd api
pnpm install
```

2. ローカルで実行:
```bash
pnpm start
```

APIは `http://localhost:7071` で起動します。

## デプロイ

Azure Static Web Appsにデプロイすると、`/api/*` パスで自動的に利用可能になります。
