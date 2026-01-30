# Azure Functions デプロイガイド

## デプロイ先
**Function App名**: `plumiume-profile-api`

## 前提条件
- Azure CLI がインストールされている
- Azure アカウントにログイン済み
- Function App `plumiume-profile-api` が作成済み

## デプロイ手順

### 1. Azure にログイン
```bash
az login
```

### 2. Function App にデプロイ
```bash
cd api
pnpm run build
func azure functionapp publish plumiume-profile-api
```

### 3. 環境変数を設定
```bash
# Contact email
az functionapp config appsettings set \
  --name plumiume-profile-api \
  --resource-group <your-resource-group> \
  --settings CONTACT_EMAIL=contact@plumiume.com

# SendGrid API Key (オプション)
az functionapp config appsettings set \
  --name plumiume-profile-api \
  --resource-group <your-resource-group> \
  --settings SENDGRID_API_KEY=<your-api-key>

# SendGrid From Email (オプション)
az functionapp config appsettings set \
  --name plumiume-profile-api \
  --resource-group <your-resource-group> \
  --settings SENDGRID_FROM_EMAIL=noreply@plumiume.com
```

### 4. CORS設定（必要な場合）
```bash
az functionapp cors add \
  --name plumiume-profile-api \
  --resource-group <your-resource-group> \
  --allowed-origins https://your-static-web-app.azurestaticapps.net
```

## VS Code拡張機能を使ったデプロイ

1. Azure Functions 拡張機能をインストール
2. サイドバーの Azure アイコンをクリック
3. Functions セクションで右クリック → "Deploy to Function App..."
4. `plumiume-profile-api` を選択
5. `api` フォルダを選択

## 環境変数（本番環境）

Azure Portal → Function App → 構成 → アプリケーション設定

| 名前 | 値 | 説明 |
|------|-----|------|
| `CONTACT_EMAIL` | `contact@plumiume.com` | 送信先メールアドレス |
| `SENDGRID_API_KEY` | `SG.xxxxx` | SendGrid API キー（オプション） |
| `SENDGRID_FROM_EMAIL` | `noreply@plumiume.com` | 送信元メールアドレス（オプション） |

## デプロイ後の確認

```bash
# Function の動作確認
curl -X POST https://plumiume-profile-api.azurewebsites.net/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

## トラブルシューティング

### ログの確認
```bash
func azure functionapp logstream plumiume-profile-api
```

または Azure Portal → Function App → ログストリーム

### Application Insights
Azure Portal → Function App → Application Insights
- リクエストログ
- エラーログ
- パフォーマンスメトリクス
