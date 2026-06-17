# システム設計

## 概要

シングルページアプリ（SPA）。外部依存なし、`index.html` 単体で動作。

## データフロー

```
ブラウザ (index.html)
  └── localStorage  ← 常時保存（オフライン対応）
  └── GAS Webhook   ← URL設定時のみ（Googleスプレッドシートへ）
```

## 画面構成

| スクリーン | ID | 役割 |
|---|---|---|
| メンバー選択 | screen-select | トップ画面。誰の記録かを選ぶ |
| 記録入力 | screen-record | 日付・外出・気持ち・メモを入力 |
| 完了 | screen-done | 保存完了のフィードバック |
| 履歴 | screen-history | 過去の記録一覧 |

## GAS連携

- フロントエンドから `fetch()` で POST
- GAS側で `doPost(e)` を受けてスプレッドシートに追記
- CORS対応のため GAS は `ContentService` で JSON を返す

## 将来拡張

- 複数端末同期（GAS + スプレッドシートで代替可能）
- 週次サマリー表示
- メンバー追加・編集UI
