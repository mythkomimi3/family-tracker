// かぞくきろく - Google Apps Script Webhook
// スプレッドシートID を SHEET_ID に設定してください

const SHEET_ID = ''; // ← GoogleスプレッドシートのIDをここに入れる
const SHEET_NAME = 'records';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(SHEET_NAME);

    // ヘッダーがなければ追加
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['date', 'name', 'avatar', 'activity', 'mental', 'note', 'savedAt']);
    }

    sheet.appendRow([
      data.date,
      data.name,
      data.avatar,
      data.activity,
      data.mental,
      data.note || '',
      data.savedAt
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// テスト用
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'family-tracker GAS is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
