function doGet(e) {
  var allData = parseSheet(e.parameter.spreadsheetID, e.parameter.sheet, e.parameter.userTimestamp);
  return ContentService.createTextOutput(JSON.stringify(allData)).setMimeType(ContentService.MimeType.JSON); //convertimos la respuesta a JSON
}


function parseSheet(spreadsheetID, sheet, userTimestamp){
  var allObjects = [];
  var timestamp;
  try{
    timestamp = DriveApp.getFileById(spreadsheetID).getLastUpdated().toJSON();
    if(isOutOfDate(spreadsheetID, userTimestamp)){
      var mySheet = getSheetByIndexOrName(spreadsheetID, sheet==null ?0 :sheet);
      var allDataRange = mySheet.getDataRange();
      var allHeaders = getAllHeaders(allDataRange);
      allObjects = readAllData(allDataRange, allHeaders);
    }
  }catch(err){
    timestamp = null;
    allObjects = null;
  }
  
  var mResponse = new Object();
  mResponse.body = allObjects;
  mResponse.lastUpdate = timestamp;
  return mResponse;
}

//Devuelve una hoja de la planilla, el parametro sheet puede ser un entero o el nombre de la hoja
function getSheetByIndexOrName(spreadsheetID, sheet){
  var intRegex = /^\d+$/;
  if(intRegex.test(sheet)) { 
    return SpreadsheetApp.openById(spreadsheetID).getSheets()[sheet];
  } else {
    return SpreadsheetApp.openById(spreadsheetID).getSheetByName(sheet);
  }
}

//Devuelve un array con todos los encabezados para utilizar como propiedades en los objetos
function getAllHeaders(rangeOfData){
  var mHeaders = [];
  var headerColumns = rangeOfData.getNumColumns();
  var rawData = rangeOfData.getValues();
  for(c=0; c<headerColumns; c++){
    mHeaders.push(rawData[0][c]);
  }
  return mHeaders;
}

//Devuelve un array con todos los objetos que representan el contenido de rangeOfData utilizando las propiedades del parametro headers
function readAllData(rangeOfData, headers){
  var objs = [];
  var columns = rangeOfData.getNumColumns();
  var rows = rangeOfData.getNumRows();
  var allValues = rangeOfData.getValues();
  for(r=1; r<rows; r++){
    var oneObject = new Object();
    for(c=0; c<columns; c++){
      oneObject[headers[c]] = allValues[r][c];
    }
    objs.push(oneObject);
  }
  return objs;
}
//devuelve true si el string no es valido como fecha o si la fecha es anterior al ultimo update del archivo
function isOutOfDate(spreadsheetID, stringDate){
  var fileSheetEstablecimientos = DriveApp.getFileById(spreadsheetID);
  var lastUpdate = fileSheetEstablecimientos.getLastUpdated();
  var userUpdate = new Date(stringDate);
  if(Object.prototype.toString.call(userUpdate) === "[object Date]" && !isNaN(userUpdate.getTime())){
    var rta = lastUpdate>userUpdate;
    return rta;
  }else{
    return true;
  }
}