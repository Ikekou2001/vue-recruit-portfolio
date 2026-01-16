# 📘 Phase 4: Azure Functions API構築ガイド

> **対象**: バックエンド開発（サーバーレス）  
> **技術**: Azure Functions + TypeScript + HTTP Triggers + 外部API統合  
> **更新日**: 2026年1月7日

## 📋 目次

- [概要](#概要)
- [Azure Functionsとは](#azure-functionsとは)
- [実装手順](#実装手順)
- [Function実装例](#function実装例)
- [設定ファイル詳解](#設定ファイル詳解)
- [外部API統合](#外部api統合)
- [ローカル開発とデバッグ](#ローカル開発とデバッグ)
- [トラブルシューティング](#トラブルシューティング)

---

## 🎯 概要

このフェーズでは、Azure Functionsを使用してサーバーレスAPIを構築します。外部APIを統合し、フロントエンドからセキュアにデータを取得できる環境を整えます。

### 実装するFunction

| Function名 | メソッド | 用途 | 外部API |
|-----------|---------|------|---------|
| **GetGitHubRepos** | GET | GitHubリポジトリ一覧取得 | GitHub REST API |
| **GetQuote** | GET | ランダムな名言取得 | Quotable API |
| **ContactForm** | POST | お問い合わせフォーム処理 | なし |

### Azure Functionsのメリット

- ✅ **サーバーレス**: サーバー管理不要
- ✅ **スケーラブル**: 自動スケーリング
- ✅ **コスト効率**: 実行時のみ課金
- ✅ **TypeScript対応**: 型安全な開発
- ✅ **ローカル開発**: Functions Core Toolsで完全なローカル環境

---

## 🏗️ Azure Functionsとは

### アーキテクチャ

```
┌──────────────────────────────────────────────────┐
│  Azure Functions Runtime                         │
│                                                   │
│  ┌────────────────┐  ┌────────────────┐         │
│  │ GetGitHubRepos │  │   GetQuote     │         │
│  │  HTTP Trigger  │  │  HTTP Trigger  │         │
│  └────────────────┘  └────────────────┘         │
│           │                   │                   │
│           ├───────────────────┤                  │
│           ↓                   ↓                   │
│  ┌──────────────────────────────────────┐       │
│  │    External APIs Integration         │       │
│  │  • GitHub REST API                   │       │
│  │  • Quotable API                      │       │
│  └──────────────────────────────────────┘       │
└──────────────────────────────────────────────────┘
         ↑                             ↑
         │ HTTP Request                │
    ┌────┴────┐                   ┌───┴────┐
    │ Vue App │                   │ Mobile │
    │Frontend │                   │  App   │
    └─────────┘                   └────────┘
```

### HTTP Trigger Functionの流れ

```
1. クライアント → HTTP Request → Function
2. Function → ビジネスロジック実行
3. Function → 外部API呼び出し（オプション）
4. Function → HTTP Response → クライアント
```

---

## 🔧 実装手順

### ステップ1: プロジェクト初期化

#### 1-1. ディレクトリ作成

```bash
# ルートディレクトリに戻る
cd d:\plumiume\Workspace\1plumiume@github\vue-recruit-portfolio

# apiディレクトリ作成
mkdir api
cd api
```

#### 1-2. Azure Functions初期化

```bash
# TypeScriptテンプレートで初期化
func init . --typescript --worker-runtime node

# 実行結果:
# Writing .funcignore
# Writing .gitignore
# Writing host.json
# Writing local.settings.json
# Writing package.json
# Writing tsconfig.json
# Writing .vscode/extensions.json
```

**生成されるファイル**:

```
api/
├── .vscode/
│   └── extensions.json      # 推奨VSCode拡張機能
├── .funcignore              # Functionに含めないファイル
├── .gitignore               # Git除外設定
├── host.json                # Function Hostグローバル設定
├── local.settings.json      # ローカル環境変数
├── package.json             # npm依存関係
└── tsconfig.json            # TypeScript設定
```

#### 1-3. 依存関係のインストール

```bash
# 基本パッケージのインストール
pnpm install

# 追加パッケージのインストール
pnpm add @azure/functions axios
pnpm add -D @types/node typescript
```

**インストールされるパッケージ**:

- `@azure/functions`: Azure Functions TypeScript SDK
- `axios`: HTTP クライアント（外部API呼び出し）
- `@types/node`: Node.js型定義
- `typescript`: TypeScriptコンパイラ

### ステップ2: プロジェクト構造の整理

#### 2-1. ディレクトリ構造

```bash
# src配下にフォルダ作成
mkdir -p src/functions src/utils src/types
```

最終的な構造:

```
api/
├── src/
│   ├── functions/           # Function実装
│   │   ├── GetGitHubRepos.ts
│   │   ├── GetQuote.ts
│   │   └── ContactForm.ts
│   ├── utils/               # ユーティリティ関数
│   │   └── apiClient.ts
│   └── types/               # TypeScript型定義
│       └── index.ts
├── host.json
├── local.settings.json
├── package.json
└── tsconfig.json
```

### ステップ3: 設定ファイルの編集

#### 3-1. host.json

**`host.json`** を以下の内容に更新:

```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20
      }
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  }
}
```

**解説**:

| 項目 | 説明 |
|------|------|
| `version` | Functions Runtimeのバージョン（v2が現行） |
| `logging.applicationInsights` | Application Insightsログ設定 |
| `samplingSettings.isEnabled` | サンプリング有効化（コスト削減） |
| `maxTelemetryItemsPerSecond` | 秒間最大テレメトリ数 |
| `extensionBundle` | 拡張機能バンドル（バインディングサポート） |

#### 3-2. local.settings.json

**`local.settings.json`** を以下の内容に更新:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "GITHUB_USERNAME": "your-github-username",
    "CORS_ALLOWED_ORIGINS": "http://localhost:3000"
  },
  "Host": {
    "CORS": "http://localhost:3000",
    "CORSCredentials": false
  }
}
```

**解説**:

| 項目 | 説明 | 設定例 |
|------|------|--------|
| `IsEncrypted` | 設定の暗号化（本番では`true`） | `false` |
| `AzureWebJobsStorage` | Storageアカウント接続文字列 | 空でもOK（開発時） |
| `FUNCTIONS_WORKER_RUNTIME` | ランタイム種類 | `node` |
| `GITHUB_USERNAME` | GitHubユーザー名（カスタム環境変数） | `plumiume` |
| `CORS_ALLOWED_ORIGINS` | CORS許可オリジン | `http://localhost:3000` |
| `Host.CORS` | CORS設定 | フロントエンドURL |
| `Host.CORSCredentials` | 認証情報の送信許可 | `false` |

**重要**: このファイルは `.gitignore` に含まれているため、Gitにコミットされません。

#### 3-3. tsconfig.json

**`tsconfig.json`** を確認・更新:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "ES2019",
    "lib": ["ES2019"],
    "outDir": "dist",
    "rootDir": ".",
    "sourceMap": true,
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**重要設定**:

- `module: "commonjs"`: Node.jsとの互換性
- `target: "ES2019"`: Azure Functions v4対応
- `outDir: "dist"`: ビルド出力先
- `strict: true`: 厳格な型チェック

#### 3-4. package.json のスクリプト追加

**`package.json`** を編集:

```json
{
  "name": "api",
  "version": "1.0.0",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "clean": "rimraf dist",
    "prestart": "npm run clean && npm run build",
    "dev": "func start",
    "start": "func start"
  },
  "dependencies": {
    "@azure/functions": "^4.0.0",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

**スクリプト解説**:

| スクリプト | 説明 |
|----------|------|
| `build` | TypeScriptをコンパイル（dist/に出力） |
| `watch` | ファイル変更を監視して自動コンパイル |
| `clean` | ビルド成果物を削除 |
| `prestart` | startの前に自動実行（クリーン＋ビルド） |
| `dev` | ローカルでFunctionを起動 |

---

## 💻 Function実装例

### 1. GetGitHubRepos Function

**`src/functions/GetGitHubRepos.ts`**:

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import axios from 'axios'

/**
 * GitHubリポジトリ情報のインターフェース
 * GitHub REST APIのレスポンスから必要な項目のみ抽出
 */
interface GitHubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
}

/**
 * GetGitHubRepos Function
 * 
 * 機能: 指定したGitHubユーザーのリポジトリ一覧を取得
 * メソッド: GET
 * エンドポイント: /api/GetGitHubRepos
 * 
 * @param request - HTTPリクエストオブジェクト
 * @param context - Function実行コンテキスト（ログ出力等に使用）
 * @returns HTTPレスポンス
 */
export async function GetGitHubRepos(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  // ログ出力（Application Insightsに送信される）
  context.log('GetGitHubRepos function triggered')

  try {
    // 環境変数からGitHubユーザー名を取得（デフォルト: octocat）
    const username = process.env.GITHUB_USERNAME || 'octocat'
    
    context.log(`Fetching repositories for user: ${username}`)

    // GitHub REST API呼び出し
    const response = await axios.get<GitHubRepo[]>(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          sort: 'updated',      // 更新日順でソート
          per_page: 10          // 最大10件取得
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // 認証トークンがあればより高いレート制限
          // 'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        }
      }
    )

    // レスポンスデータを整形（不要な項目を除外）
    const repos = response.data.map(repo => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      updatedAt: repo.updated_at
    }))

    // 成功レスポンスを返す
    return {
      status: 200,
      jsonBody: {
        success: true,
        data: repos,
        count: repos.length
      }
    }
  } catch (error: any) {
    // エラーログ出力
    context.error('Error fetching GitHub repos:', error)
    
    // エラーレスポンスを返す
    return {
      status: 500,
      jsonBody: {
        success: false,
        error: 'Failed to fetch GitHub repositories',
        message: error.message
      }
    }
  }
}

/**
 * Function登録
 * 
 * HTTPトリガーとして登録し、GETメソッドで匿名アクセス可能にする
 */
app.http('GetGitHubRepos', {
  methods: ['GET'],           // 許可するHTTPメソッド
  authLevel: 'anonymous',     // 認証レベル（anonymous, function, admin）
  handler: GetGitHubRepos     // ハンドラー関数
})
```

**重要ポイント**:

1. **型定義**: `GitHubRepo` インターフェースで型安全性を確保
2. **環境変数**: `process.env.GITHUB_USERNAME` でユーザー名を取得
3. **エラーハンドリング**: try-catch で例外をキャッチ
4. **ログ出力**: `context.log()` でApplication Insightsに送信
5. **データ整形**: 不要な項目を除外してレスポンスサイズを削減

### 2. GetQuote Function

**`src/functions/GetQuote.ts`**:

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'
import axios from 'axios'

/**
 * 名言データのインターフェース
 */
interface Quote {
  _id: string
  content: string       // 名言本文
  author: string        // 著者名
  tags: string[]        // タグ（カテゴリ）
}

/**
 * GetQuote Function
 * 
 * 機能: Quotable APIからランダムな名言を取得
 * メソッド: GET
 * エンドポイント: /api/GetQuote
 */
export async function GetQuote(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('GetQuote function triggered')

  try {
    // Quotable API呼び出し（認証不要、無料）
    const response = await axios.get<Quote>('https://api.quotable.io/random')

    // レスポンスデータを整形
    return {
      status: 200,
      jsonBody: {
        success: true,
        data: {
          quote: response.data.content,
          author: response.data.author,
          tags: response.data.tags
        }
      }
    }
  } catch (error: any) {
    context.error('Error fetching quote:', error)
    
    return {
      status: 500,
      jsonBody: {
        success: false,
        error: 'Failed to fetch quote'
      }
    }
  }
}

app.http('GetQuote', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: GetQuote
})
```

**特徴**:
- 認証不要の無料API
- シンプルな実装
- UIのアクセントに最適

### 3. ContactForm Function

**`src/functions/ContactForm.ts`**:

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions'

/**
 * お問い合わせフォームデータのインターフェース
 */
interface ContactFormData {
  name: string
  email: string
  message: string
}

/**
 * ContactForm Function
 * 
 * 機能: お問い合わせフォームのデータを受信・処理
 * メソッド: POST
 * エンドポイント: /api/ContactForm
 * 
 * 本番環境での拡張案:
 * - SendGrid でメール送信
 * - Cosmos DB に保存
 * - Slack 通知
 */
export async function ContactForm(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('ContactForm function triggered')

  try {
    // リクエストボディをJSONとしてパース
    const body = await request.json() as ContactFormData

    // バリデーション
    if (!body.name || !body.email || !body.message) {
      return {
        status: 400,
        jsonBody: {
          success: false,
          error: 'All fields are required',
          fields: {
            name: !body.name ? 'Name is required' : undefined,
            email: !body.email ? 'Email is required' : undefined,
            message: !body.message ? 'Message is required' : undefined
          }
        }
      }
    }

    // メールアドレスの簡易バリデーション
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return {
        status: 400,
        jsonBody: {
          success: false,
          error: 'Invalid email address'
        }
      }
    }

    // ログ出力（開発環境）
    // 本番環境ではここでメール送信やDB保存を実装
    context.log('Contact form submission:', {
      name: body.name,
      email: body.email,
      messageLength: body.message.length,
      timestamp: new Date().toISOString()
    })

    // TODO: 本番環境での実装例
    // await sendEmail({
    //   to: 'admin@example.com',
    //   subject: `Contact from ${body.name}`,
    //   body: body.message
    // })

    // 成功レスポンス
    return {
      status: 200,
      jsonBody: {
        success: true,
        message: 'Contact form submitted successfully',
        receivedAt: new Date().toISOString()
      }
    }
  } catch (error: any) {
    context.error('Error processing contact form:', error)
    
    return {
      status: 500,
      jsonBody: {
        success: false,
        error: 'Failed to process contact form'
      }
    }
  }
}

app.http('ContactForm', {
  methods: ['POST'],          // POSTメソッドのみ許可
  authLevel: 'anonymous',
  handler: ContactForm
})
```

**バリデーション**:
- 必須フィールドチェック
- メールアドレス形式チェック
- 詳細なエラーメッセージ

**本番環境への拡張**:
```typescript
// SendGrid でメール送信
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const msg = {
  to: 'admin@example.com',
  from: 'noreply@example.com',
  subject: `Contact from ${body.name}`,
  text: body.message,
  html: `<p>${body.message}</p>`
}

await sgMail.send(msg)
```

---

## 📝 設定ファイル詳解

### host.json の全オプション

```json
{
  "version": "2.0",
  "logging": {
    "applicationInsights": {
      "samplingSettings": {
        "isEnabled": true,
        "maxTelemetryItemsPerSecond": 20
      }
    },
    "logLevel": {
      "default": "Information",
      "Function": "Information"
    }
  },
  "extensionBundle": {
    "id": "Microsoft.Azure.Functions.ExtensionBundle",
    "version": "[4.*, 5.0.0)"
  },
  "http": {
    "routePrefix": "api",
    "maxOutstandingRequests": 200,
    "maxConcurrentRequests": 100
  }
}
```

| 設定項目 | 説明 | デフォルト |
|---------|------|-----------|
| `http.routePrefix` | APIのプレフィックス | `"api"` |
| `http.maxOutstandingRequests` | 最大保留リクエスト数 | `200` |
| `http.maxConcurrentRequests` | 最大同時実行数 | `100` |

### local.settings.json のベストプラクティス

**.env.example** を作成して共有:

```bash
# .env.example
FUNCTIONS_WORKER_RUNTIME=node
GITHUB_USERNAME=your-username
GITHUB_TOKEN=ghp_xxxxxxxxxxxx
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

**チーム開発時**:
1. `.env.example` をコピーして `.env` 作成
2. `.env` を `local.settings.json` に変換するスクリプト作成

---

## 🌐 外部API統合

### GitHub REST API

**エンドポイント**: `https://api.github.com`

**レート制限**:
- 認証なし: 60 requests/hour
- 認証あり: 5,000 requests/hour

**認証方法**:

```typescript
headers: {
  'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
}
```

**Personal Access Token取得**:
1. GitHub > Settings > Developer settings
2. Personal access tokens > Tokens (classic)
3. Generate new token
4. `repo` スコープを選択

### Quotable API

**エンドポイント**: `https://api.quotable.io`

**主要エンドポイント**:

| エンドポイント | 説明 |
|--------------|------|
| `/random` | ランダムな名言 |
| `/quotes?author=einstein` | 著者で検索 |
| `/tags` | 利用可能なタグ一覧 |

**特徴**:
- 完全無料
- 認証不要
- レート制限なし

### その他の推奨API

1. **JSONPlaceholder** (`https://jsonplaceholder.typicode.com`)
   - モックAPI
   - CRUD操作テスト用

2. **OpenWeatherMap** (`https://api.openweathermap.org`)
   - 天気情報
   - 無料tier: 1,000 calls/day

3. **REST Countries** (`https://restcountries.com`)
   - 国情報
   - 完全無料

---

## 🔨 ローカル開発とデバッグ

### 開発サーバー起動

```bash
cd api
pnpm dev
```

**出力例**:

```
Azure Functions Core Tools
Core Tools Version:       4.0.5455
Function Runtime Version: 4.27.5.21554

Functions:

        GetGitHubRepos: [GET] http://localhost:7071/api/GetGitHubRepos

        GetQuote: [GET] http://localhost:7071/api/GetQuote

        ContactForm: [POST] http://localhost:7071/api/ContactForm

For detailed output, run func with --verbose flag.
```

### cURLでテスト

```bash
# GetGitHubRepos
curl http://localhost:7071/api/GetGitHubRepos

# GetQuote
curl http://localhost:7071/api/GetQuote

# ContactForm
curl -X POST http://localhost:7071/api/ContactForm \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

### VSCodeでデバッグ

**.vscode/launch.json** を作成:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Attach to Node Functions",
      "type": "node",
      "request": "attach",
      "port": 9229,
      "preLaunchTask": "func: host start"
    }
  ]
}
```

**デバッグ手順**:
1. ブレークポイントを設定
2. F5キー押下
3. Functions起動
4. HTTPリクエスト送信

### ログ確認

```typescript
// 情報ログ
context.log('Info message')

// 警告ログ
context.warn('Warning message')

// エラーログ
context.error('Error message', error)
```

**ログレベル**:
- `Trace`: 詳細なデバッグ情報
- `Debug`: デバッグ情報
- `Information`: 一般情報
- `Warning`: 警告
- `Error`: エラー
- `Critical`: 重大エラー

---

## 🐛 トラブルシューティング

### 問題1: Functions が起動しない

**エラー**: `No job functions found`

**原因**: TypeScriptがコンパイルされていない

**解決策**:
```bash
pnpm run build
pnpm dev
```

### 問題2: CORS エラー

**エラー**: `Access to fetch at ... has been blocked by CORS policy`

**原因**: `local.settings.json` のCORS設定不足

**解決策**:
```json
{
  "Host": {
    "CORS": "http://localhost:3000",
    "CORSCredentials": false
  }
}
```

### 問題3: 環境変数が読み込まれない

**原因**: `local.settings.json` の形式が正しくない

**確認**:
```typescript
// Function内で環境変数を出力
context.log('ENV:', process.env.GITHUB_USERNAME)
```

### 問題4: GitHub API のレート制限

**エラー**: `403 rate limit exceeded`

**解決策**: Personal Access Token を設定

```json
// local.settings.json
{
  "Values": {
    "GITHUB_TOKEN": "ghp_xxxxxxxxxxxx"
  }
}
```

```typescript
// Function内
headers: {
  'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
}
```

### 問題5: Function が見つからない

**エラー**: `404 Not Found`

**確認事項**:
1. Function名が正しいか
2. `app.http()` が呼ばれているか
3. TypeScriptがコンパイルされているか（`dist/` フォルダ確認）

---

## 📚 参考リソース

### 公式ドキュメント
- [Azure Functions Documentation](https://learn.microsoft.com/azure/azure-functions/)
- [Azure Functions TypeScript Guide](https://learn.microsoft.com/azure/azure-functions/functions-reference-node)
- [GitHub REST API](https://docs.github.com/rest)
- [Quotable API](https://github.com/lukePeavey/quotable)

### 学習ポイント（就活アピール用）

このPhaseで学べる技術:

1. **サーバーレスアーキテクチャ**: Azure Functionsの理解
2. **TypeScript**: バックエンドでの型安全な開発
3. **HTTP API設計**: RESTful APIの実装
4. **外部API統合**: 実用的なAPI呼び出しとエラーハンドリング
5. **CORS**: クロスオリジン制御の理解
6. **環境変数管理**: セキュアな設定管理

---

**次のステップ**: フロントエンドとバックエンドの統合（Phase 5）

**作成者**: plumiume  
**最終更新**: 2026年1月7日
