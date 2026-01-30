# Azure Functions デプロイ設定

## GitHub Secrets の設定

以下のシークレットを GitHub リポジトリに追加してください：

**Settings → Secrets and variables → Actions → New repository secret**

### AZURE_FUNCTIONAPP_PUBLISH_PROFILE_PLUMIUME_PROFILE_API

発行プロファイルの取得方法：

#### Azure Portal から取得
1. Azure Portal にログイン
2. Function App `plumiume-profile-api` を開く
3. 上部メニュー → 「発行プロファイルの取得」をクリック
4. ダウンロードされた `.PublishSettings` ファイルの内容をコピー
5. GitHub Secrets に貼り付け

#### Azure CLI から取得
```bash
az functionapp deployment list-publishing-profiles \
  --name plumiume-profile-api \
  --resource-group <your-resource-group> \
  --xml
```

## デプロイトリガー

以下の場合に自動デプロイされます：
- `main` ブランチに `api/` フォルダ内のファイルが push された時
- 手動実行（GitHub Actions タブから "Run workflow"）

## 環境変数の設定

Azure Portal で以下を設定してください：

**Function App → 構成 → アプリケーション設定**

| 設定名 | 値 |
|--------|-----|
| `CONTACT_EMAIL` | `contact@plumiume.com` |
| `SENDGRID_API_KEY` | （SendGrid APIキー） |
| `SENDGRID_FROM_EMAIL` | `noreply@plumiume.com` |

## デプロイ状況の確認

GitHub Actions タブで実行状況を確認できます。

## 手動デプロイ方法

```bash
# 1. ビルド
cd api
pnpm run build

# 2. Azure Functions Core Tools でデプロイ
func azure functionapp publish plumiume-profile-api

# または VS Code の Azure Functions 拡張機能から
# - サイドバー → Azure → Functions
# - 右クリック → Deploy to Function App...
```
