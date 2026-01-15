function doGet(e) {
  var nomeDaAba = e.parameter.nome; 
  
  if (!nomeDaAba) {
    return ContentService.createTextOutput("Erro: Faltou o nome da aba!");
  }

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  try {
    ss.insertSheet(nomeDaAba);
    return ContentService.createTextOutput("Sucesso: Aba '" + nomeDaAba + "' criada!");
  } catch (err) {
    return ContentService.createTextOutput("Erro: Talvez a aba já exista.");
  }
}