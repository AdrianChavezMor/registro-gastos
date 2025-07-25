require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');


const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

let doc;
let sheet;

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
    
    sheet = doc.sheetsByIndex[0];
    
  } catch (error) {
    console.error('Connection failed:', error.message);
  }

}


async function registrarGastoSheets(datoGasto) {

    try {
      const row = await sheet.addRow(datoGasto);
      console.log('Row added successfully');
      return row;
    } catch (error) {
      console.error('Error adding row:', error);
      throw error;
    }
    
}

module.exports = {createConnection, registrarGastoSheets}
