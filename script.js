//EL REPORTE DEBE ESTAR EN CSV Y NO DEBE SUPERAR LAS 10.000 FILAS

function DCMdownload() {

  var reportId = '';
  Logger.log(reportId);
  var profileId = '';
  Logger.log(profileId);
  var httpOptions = {'headers': {'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()}};
  Logger.log(httpOptions);
  var additionalParameters = {'synchronous': 'true'};
  Logger.log(additionalParameters);

  //corro el reporte e identifico el file ID
  var ReportFile = DoubleClickCampaigns.Reports.run(profileId, reportId, additionalParameters);
  Logger.log(ReportFile);
  var ReportFileID = (ReportFile.id);
  Logger.log(ReportFileID);

  //obtengo el csv y lo parseo
  var newReportFile = DoubleClickCampaigns.Files.get(reportId, ReportFileID);
  Logger.log(newReportFile);
  if(newReportFile.urls) {var httpOptions = {'headers': {'Authorization': 'Bearer ' + ScriptApp.getOAuthToken()}};
  var csvContent = UrlFetchApp.fetch(newReportFile.urls.apiUrl, httpOptions).getContentText();
  Logger.log(csvContent);
  var csvData = Utilities.parseCsv(csvContent);
  Logger.log(csvData);

  //pego la data en la sheet que esté activa
  var sheet = SpreadsheetApp.getActiveSheet();
  Logger.log(sheet);
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);


  //eliminar primeras filas y fila de total
  for(var i=1;i<sheet.getLastRow();i++){
    var contenido = sheet.getRange(i, 1).getValue();
    if(contenido == 'Report Fields'){
      var fila = sheet.getRange(i,1).getRow();
      }
    }
  var lastrow = sheet.getLastRow();
  sheet.deleteRows(1, fila);
  var lastrow = sheet.getLastRow();
  sheet.deleteRows(lastrow);

}}
