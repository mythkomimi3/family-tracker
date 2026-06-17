# データスキーマ

## レコード形式（JSON）

```json
{
  "date":     "2026-06-17",
  "name":     "ママ",
  "avatar":   "👩",
  "activity": "out | stay",
  "mental":   "good | normal | bad",
  "note":     "任意のメモテキスト",
  "savedAt":  "2026-06-17T10:30:00.000Z"
}
```

## フィールド定義

| フィールド | 型 | 値 | 説明 |
|---|---|---|---|
| date | string | YYYY-MM-DD | 記録日 |
| name | string | ママ/パパ/イチコ/ニコ/サニコ | メンバー名 |
| avatar | string | 絵文字 | アバター絵文字 |
| activity | string | out / stay | 外出したか |
| mental | string | good / normal / bad | 気持ち |
| note | string | 任意 | メモ（空文字可） |
| savedAt | string | ISO 8601 | 保存日時（UTC） |

## ストレージ

- **ブラウザ**: `localStorage` キー `familyRecords`（配列、新しい順）
- **スプレッドシート**: GAS連携時、1行1レコードで追記
