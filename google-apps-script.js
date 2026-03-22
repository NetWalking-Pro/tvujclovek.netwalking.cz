// ============================================
// GOOGLE APPS SCRIPT — vložit do spreadsheet
// Extensions → Apps Script → Code.gs
// ============================================
// Po vložení: Deploy → New deployment → Web app
// Execute as: Me, Who has access: Anyone
// Zkopíruj URL a vlož do index.html místo 'GOOGLE_APPS_SCRIPT_URL'
// ============================================

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('CRM – Zájemci');
  var data = JSON.parse(e.postData.contents);

  // Najdi poslední ID
  var lastRow = sheet.getLastRow();
  var lastId = 0;
  if (lastRow >= 5) {
    var idVal = sheet.getRange(lastRow, 1).getValue();
    lastId = typeof idVal === 'number' ? idVal : lastRow - 4;
  }
  var newId = lastId + 1;

  // Datum
  var today = Utilities.formatDate(new Date(), 'Europe/Prague', 'dd.MM.yyyy');

  // Zápis do řádku (odpovídá sloupcům CRM)
  var row = [
    newId,                        // A: ID
    today,                        // B: Datum přidání
    data.jmeno || '',             // C: Jméno
    data.prijmeni || '',          // D: Příjmení
    data.mesto || '',             // E: Město bydliště
    'Ostrava 23.4.',              // F: Akce / Město
    '',                           // G: Kompatibilita
    data.telefon || '',           // H: Telefon
    data.email || '',             // I: Email
    data.vek || '',               // J: Věk
    data.pohlavi || '',           // K: Pohlaví
    data.povolani || '',          // L: Povolání
    data.cohleda || '',           // M: Co hledá
    data.konicky || '',           // N: Koníčky
    'Web',                        // O: Zdroj
    'Zájem',                      // P: Stav
    '—',                          // Q: Schválen/a
    '—',                          // R: Zaplatil/a
    '',                           // S: Cena zaplacena
    data.dieta ? 'Dieta: ' + data.dieta : '',  // T: Poznámka
    data.gdpr || '',              // U: GDPR souhlas
    today,                        // V: Posl. kontakt
    '✗ Ne',                       // W: Opak. účastník
    data.linkedin || '',          // X: LinkedIn
    data.instagram || ''          // Y: Instagram
  ];

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
