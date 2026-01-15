function limparDados() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Limpa da linha 2 até o final, nas colunas A, B, C e D
  var ultimaLinha = sheet.getLastRow();
  if (ultimaLinha > 1) {
    sheet.getRange(2, 1, ultimaLinha - 1, 4).clearContent();
  }
}