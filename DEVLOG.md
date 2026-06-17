# みんなの日記 (family-tracker) 開発ログ

## プロジェクト概要

| 項目 | 内容 |
|---|---|
| プロジェクト名 | みんなの日記 (family-tracker) |
| 開発日 | 2026年6月17日 |
| アプリURL | https://family-tracker.mythkomi.workers.dev |
| GitHub | https://github.com/mythkomimi3/family-tracker |
| ローカル | ~/ms/family-tracker/ |

---

## 開発経緯

- 家族5人（パパ・ママ・あんな・まりな・はんな）の日々の活動記録とメンタル管理が目的
- 外出有無（した/しない）とメンタル3段階（良い/普通/悪い）をスマホブラウザで記録
- 家族それぞれが自分で入力できる設計（インストール不要・URLを開くだけ）
- 将来的に友達家族にも同じアプリを展開予定

---

## 開発ログ

- Claude.aiでHTMLプロトタイプ作成
- `~/ms/family-tracker/` にプロジェクトフォルダ作成
- Lottieアニメーション（`_0101J_S_02.json`）をヘッダー下に追加
- GitHubリポジトリ作成・push（`mythkomimi3/family-tracker`）
- Cloudflare Workers でデプロイ完了（`family-tracker.mythkomi.workers.dev`）
- タイトル「かぞくきろく」→「みんなの日記」に変更
- メンバー名・順番変更（パパ・あんな・まりな・はんな・ママ）
- Googleスプレッドシート × GAS でデータ連携（mode: no-cors）
- 履歴画面に「全て選択 → 消去」の2ステップ削除機能を追加
- GitHub Actions ワークフロー作成（APIトークン登録後に自動デプロイ有効化予定）
- 手動デプロイ：`npx wrangler deploy`

---

## アーキテクチャ

```
[スマホブラウザ]
  ↓ タップ操作
[FRONTEND: index.html]
  - Cloudflare Workers でホスティング
  - localStorage（ブラウザ内一時保存）
  ↓ fetch POST (JSON, mode: no-cors) ※GAS URL設定時のみ
[BACKEND: Google Apps Script]
  - doPost() で JSON 受け取り
  ↓ appendRow()
[DATA: Googleスプレッドシート]
  - Googleドライブに自動保存
```

---

## フォルダ構造

```
family-tracker/
├── index.html              # メインアプリ（SPA）
├── README.md
├── DEVLOG.md               # このファイル
├── wrangler.toml           # Cloudflare Workers 設定
├── _0101J_S_02.json        # Lottieアニメーション
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions（自動デプロイ）
├── backend/
│   └── gas/
│       ├── Code.gs         # GAS Webhook スクリプト
│       └── appsscript.json
├── data/
│   └── schema.md           # データスキーマ定義
└── docs/
    └── architecture.md     # システム設計ドキュメント
```

---

## データスキーマ

| フィールド | 型 | 例 |
|---|---|---|
| date | YYYY-MM-DD | 2026-06-17 |
| name | string | パパ |
| avatar | emoji | 👨 |
| activity | out / stay | out |
| mental | good / normal / bad | good |
| note | string | 天気が良かった |
| savedAt | ISO 8601 | 2026-06-17T06:15:57.022Z |

---

## 今後のTODO

- [ ] CloudflareのAPIトークンをGitHub Secretsに登録（自動デプロイ有効化）
- [ ] 自分のGoogleスプレッドシートでGAS連携テスト
- [ ] 友達用セットアップ手順書の作成
- [ ] 友達に渡す際は名前・絵文字を変更して渡す
- [ ] 週次サマリー表示機能の検討
- [ ] 複数端末同期の検討
