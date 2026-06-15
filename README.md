# recon0x

> 倫理的ハッキングを学ぶ、日本語サイバーセキュリティ学習プラットフォーム。

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-green)](https://supabase.com)

---

## 構成

```
recon0x/
├── app/                    # Next.js App Router
│   ├── (auth)              # ログイン・サインアップなど
│   ├── api/                # API ルート (CVE, ニュース, CTF 提出, アカウント削除)
│   └── [pages]             # 全 13 ページ
├── components/
│   ├── layout/             # AppShell · Sidebar · Topbar
│   ├── ui/                 # Button, Card, Badge, ProgressBar, Input, ComingSoon...
│   ├── auth/               # AuthShell
│   ├── brand/              # Logo
│   └── home/               # Hero, CareerStrip, SectionHeading
├── lib/
│   ├── supabase/           # client (browser/server/middleware)
│   ├── tokens.ts           # FIELDS · RANKS · color tokens
│   └── utils.ts            # cn, xpToLevel, relativeTime
└── supabase/
    └── migrations/         # 0001〜0005 — Supabase で順に実行
```

## ページ一覧

| パス | 説明 | 状態 |
|------|------|------|
| `/` | ホーム (XPリング + 学習旅路) | ✅ 実装済み |
| `/learn` | 学習パス (7分野) | 🚧 骨組み + 準備中表示 |
| `/articles` | 記事一覧 | 🚧 骨組み + 準備中表示 |
| `/articles/[slug]` | 記事詳細 | 🚧 準備中表示 |
| `/lab` | ラボ | 🚧 準備中表示 |
| `/ctf` | CTF 一覧 | 🚧 準備中表示 |
| `/ctf/[id]` | CTF 詳細 | 🚧 準備中表示 |
| `/community` | フォーラム | 🚧 準備中表示 |
| `/leaderboard` | ランキング | 🚧 準備中表示 |
| `/tools` | ツール | 🚧 準備中表示 |
| `/cve` | CVE DB | 🚧 準備中表示 |
| `/news` | ニュース | 🚧 準備中表示 |
| `/glossary` | 用語集 | 🚧 準備中表示 |
| `/profile` | プロフィール | 🚧 準備中表示 |
| `/settings` | 設定 | 🚧 準備中表示 |
| `/login` `/signup` | 認証 | ✅ 動作する |

---

## セットアップ

### 1. 依存パッケージ

```bash
npm install
```

### 2. Supabase プロジェクトを作成

[https://supabase.com/dashboard](https://supabase.com/dashboard) で **New project** を作成 (リージョン: Tokyo 推奨)。

プロジェクト作成後、以下を取得:

- **Project URL** (`Settings → API → Project URL`)
- **anon public key** (`Settings → API → Project API keys → anon public`)
- **service_role key** (`Settings → API → Project API keys → service_role`)

### 3. 環境変数

`.env.local.example` をコピーして `.env.local` を作成し、値を入れる。

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
CRON_SECRET=random-string-here
```

### 4. SQL マイグレーション

Supabase ダッシュボードの `SQL Editor` で、`supabase/migrations/` 内のファイルを **番号順** に実行する。

1. `0001_profiles.sql`
2. `0002_xp.sql`
3. `0003_progress.sql`
4. `0004_bookmarks.sql`
5. `0005_ctf.sql`

### 5. Supabase 認証設定

`Authentication → URL Configuration`:

- **Site URL**: `http://localhost:3000` (本番では `https://recon0x.vercel.app`)
- **Redirect URLs**:
  - `http://localhost:3000/auth/callback`
  - `https://recon0x.vercel.app/auth/callback`

### 6. ローカル起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開く。

---

## デプロイ (Vercel)

### GitHub にプッシュ

```bash
git init
git add -A
git commit -m "feat: initial recon0x scaffold"
git branch -M main
git remote add origin git@github.com:Omni-lab26/recon0x.git
git push -u origin main
```

### Vercel にインポート

1. [https://vercel.com/new](https://vercel.com/new) で `recon0x` リポジトリをインポート
2. **Environment Variables** に上記の 5 つの環境変数を設定
3. **Deploy**

Vercel URL を取得したら、Supabase の Site URL と Redirect URLs を本番 URL に更新する。

---

## デザインシステム

カラー: `--bg #050505` をベースに、緑 `#22C55E` と シアン `#00D4FF` のアクセント。
タイポ: Inter (sans) + JetBrains Mono (mono)。`-apple-system` フォールバックで Apple デバイスでネイティブな見た目に。
レイアウト: 左サイドバー (232px) + トップバー (62px) + メインエリア。
グラスモーフィズム: `bg-surf` + `border-bd` + `backdrop-blur-2xl`。

---

## コンテンツの追加方法

### 記事を追加するとき

1. 記事データを `lib/articles-data.ts` を作って入れる (Markdown 推奨)
2. `app/articles/page.tsx` の分野カードの中で配列をループして表示
3. `app/articles/[slug]/page.tsx` で slug を元にデータを引いて表示

### CTF 問題を追加するとき

Supabase の SQL Editor で:

```sql
INSERT INTO ctf_challenges (id, title, description, category, difficulty, points, flag, is_published)
VALUES (
  'web-01',
  'ソースを読め',
  'HTMLコメントに残された秘密を見つけよ',
  'web',
  'easy',
  100,
  'RECON{view_source_is_your_friend}',
  true
);
```

ロジックは `/app/api/ctf/submit/route.ts` 経由で自動的に XP 加算・ソルブ記録を行う。

---

## TODO

- [ ] 学習パス・記事のデータ層 (`lib/*-data.ts`)
- [ ] ラボのターミナル UI 実装
- [ ] フォーラム機能 (Supabase テーブル設計から)
- [ ] CVE フィードの実データ表示
- [ ] News フィード (RSS パース)
- [ ] AI 要約機能 (Anthropic API 連携) — 後日

---

© 2026 recon0x
