// みんなの日記 - Google Apps Script Webhook

const SHEET_ID = '1R8hg0owN6V_L9NsrJ038RGU7daEo2e_coaUSbtUhUoYacxOWAhyddbM7';
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

// 全データ取得（履歴表示用）
function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((h, i) => obj[h] = row[i]);
      return obj;
    });
    return ContentService
      .createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
