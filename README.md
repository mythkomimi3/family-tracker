# かぞくきろく (Family Tracker)

家族の日々の外出・気持ちを記録するシンプルなWebアプリ。

## 機能

- 家族メンバー（ママ・パパ・イチコ・ニコ・サニコ）ごとに記録
- 外出 / おうちにいた の選択
- 気持ち（よかった・ふつう・よくなかった）の記録
- メモ入力
- 履歴表示（localStorage）
- Google Apps Script (GAS) 連携でスプレッドシートに自動保存

## 使い方

`index.html` をブラウザで開くだけで動作します。

## GAS連携

`index.html` 内の `GAS_URL` にWebhook URLを設定すると、記録がGoogleスプレッドシートに自動保存されます。
詳細は `backend/gas/Code.gs` を参照。

## ファイル構成

```
family-tracker/
├── index.html              # メインアプリ
├── docs/
│   └── architecture.md     # システム設計
├── backend/
│   └── gas/
│       ├── Code.gs         # GAS スクリプト
│       └── appsscript.json # GAS 設定
└── data/
    └── schema.md           # データスキーマ
```
