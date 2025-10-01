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
      await sheetRegistros.addRow(datoGasto);
      console.log('Row added successfully');
      return {success: true};
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

async function dashboard_data(){

    let suma_total_mes = 0;
    let suma_total_necesidadesbasicas = 0;
    let suma_total_gustitos = 0;
    let suma_total_comerfuera = 0;

    try {
        const rows = await sheetRegistros.getRows();
        
        const registros_mes = rows.filter(row => {
          const [datePart] = row._rawData[4].split(","); // "4/8/2025"
          const [day, month, year] = datePart.split("/").map(Number);

          const currentDate = new Date();
          const currentMonthNumber = currentDate.getMonth() + 1;

          return month === currentMonthNumber;
        });

        
        for (const registro of registros_mes) {
          suma_total_mes += Number(registro._rawData[0]);

          if (registro._rawData[1] === 'Necesidades basicas'){
            suma_total_necesidadesbasicas += Number(registro._rawData[0]);
          } 
          
          if (registro._rawData[1] === 'Gustitos'){
            suma_total_gustitos += Number(registro._rawData[0]);
          }

          if (registro._rawData[1] === 'Comer fuera'){
            suma_total_comerfuera += Number(registro._rawData[0]);
          }
        }

        console.log(suma_total_mes);
        console.log(suma_total_necesidadesbasicas);
        console.log(suma_total_gustitos);
        console.log(suma_total_comerfuera)

        const dashboard_data_structure = {
          suma_mes: suma_total_mes,
          suma_necesidadesbasicas: suma_total_necesidadesbasicas,
          suma_gustitos: suma_total_gustitos,
          suma_comerfuera: suma_total_comerfuera
        }
        
        
        return dashboard_data_structure;

    } catch (error) {
      console.error('Could not get rows')
      throw error;
    }


}



module.exports = {createConnection, registrarGastoSheets, obtenerRegistros, dashboard_data}
