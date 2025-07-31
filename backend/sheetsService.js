require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');


const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

let doc;
let sheetRegistros;
let sheetCategorias;
let sheetMetodos;

async function createConnection() {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    console.log('Connection successful!');
    console.log('Sheet title:', doc.title);
    
    sheetRegistros = doc.sheetsByIndex[0];
    sheetCategorias = doc.sheetsByIndex[1];
    sheetMetodos = doc.sheetsByIndex[2];
    
  } catch (error) {
    console.error('Connection failed:', error.message);
  }

}

async function registrarGastoSheets(datoGasto) {

    try {
      const row = await sheetRegistros.addRow(datoGasto);
      console.log('Row added successfully');
      return row;
    } catch (error) {
      console.error('Error adding row:', error);
      throw error;
    }
    
}

async function obtenerRegistros(){

    try {
      const rows = await sheetRegistros.getRows();
      
      const registros = rows.map(row =>({
        monto: row._rawData[0],
        categoria: row._rawData[1], 
        banco: row._rawData[2],
        descripcion: row._rawData[3],
        fecha: row._rawData[4],
        rowNumber: row._rowNumber
      }))
      
      return registros;
    } catch (error) {
      console.error('Could not get rows')
      throw error;
    }

}

async function obtenerCategorias(){

  try {
    const rows = await sheetCategorias.getRows();
    let categorias = rows.map(row => (row._rawData[0]))
    return categorias;
  } catch (error){
    console.error('Could not get rows')
    throw error;
  }
}

async function obtenerMetodos(){
  try {
    const rows = await sheetMetodos.getRows();
    let metodos = rows.map(row => (row._rawData[0]))
    return metodos;
  } catch (error){
    console.error('Could not get rows')
    throw error;
  }
}


module.exports = {createConnection, registrarGastoSheets, obtenerRegistros, obtenerCategorias, obtenerMetodos}
