# GitHub Actions による自動デプロイ確認リスト

## ✅ ワークフロー設定
- ファイル: `.github/workflows/azure-functions-deploy.yml`
- トリガー条件:
  - `main` ブランチへの push
  - `api/**` ファイルの変更時のみ（他のフォルダ変更時は無視）
  - または手動実行（"Run workflow"）

## ⚠️ 自動デプロイに必要な設定

### 1. GitHub Secrets の登録 **（最重要）**
現在、このシークレットが登録されていない場合、デプロイは失敗します。

**必須シークレット:**
- `AZURE_FUNCTIONAPP_PUBLISH_PROFILE_PLUMIUME_PROFILE_API`

**登録方法:**
1. GitHub リポジトリを開く
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret** をクリック
4. 名前: `AZURE_FUNCTIONAPP_PUBLISH_PROFILE_PLUMIUME_PROFILE_API`
5. 値: Azure の発行プロファイル（.PublishSettings の内容）

### 2. Azure Function App の事前作成
- **名前**: `plumiume-profile-api`
- **ランタイム**: Node.js 20+
- **ホスティング**: 従量課金またはApp Service プラン

## 📋 現在のデプロイフロー

```
push to main + api/** 変更
       ↓
GitHub Actions トリガー
       ↓
Node.js 20 セットアップ
       ↓
pnpm インストール・ビルド
       ↓
Azure Functions にデプロイ
       ↓
成功 → ✅ 通知
失敗 → Actions ログで確認
```

## 🔍 デプロイ状況の確認方法

### GitHub Actions で確認
1. リポジトリを開く
2. **Actions** タブをクリック
3. "Deploy Azure Functions" ワークフローの実行履歴を確認
4. 失敗時は詳細ログを確認

### Azure Portal で確認
1. Function App `plumiume-profile-api` を開く
2. **デプロイ センター** → **デプロイ ログ**で過去のデプロイを確認

## ✋ 現状のデプロイ可否判定

**現在の状態で自動デプロイされるか？**

- **ワークフロー定義**: ✅ 完成
- **GitHub Secrets 登録**: ❌ **未実施**（これが必須！）
- **Azure Function App**: ❌ **未作成**（これも必須！）

→ **両方を完成させると、次の push で自動デプロイが開始されます**

## 🚀 今すぐやることリスト

1. **Azure で Function App を作成** (5-10分)
   - Azure Portal で作成
   - または Azure CLI: `az functionapp create ...`

2. **GitHub に発行プロファイルを登録** (2-3分)
   - Azure で .PublishSettings をダウンロード
   - GitHub Secrets に登録

3. **テスト push**
   - `api/` フォルダに軽微な変更を加える
   - push して Actions を確認

これで自動デプロイが機能します！
