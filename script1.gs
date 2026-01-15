function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var nomeDaAba = e.parameter.aba;
  var acao = e.parameter.acao; // "criar" ou "gravar"

  // -- MODO CRIAÇÃO --
  if (acao == "criar") {
    try {
      ss.insertSheet(nomeDaAba);
      return ContentService.createTextOutput("Aba criada!");
    } catch (err) {
      return ContentService.createTextOutput("Aba já existe.");
    }
  }

  // -- MODO GRAVAÇÃO --
  if (acao == "gravar") {
    var sheet = ss.getSheetByName(nomeDaAba);
    if (sheet) {
      var t = e.parameter.tempo;
      var p = e.parameter.pos;
      var v = e.parameter.vel;
      var a = e.parameter.acc;
      sheet.appendRow([t, p, v, a]);
      return ContentService.createTextOutput("Salvo!");
    }
  }
}
