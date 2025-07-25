const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');


const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(morgan('combined')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to your Express.js server!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});


app.post('/registro', (req,res) => {

  registrarGastoSheets(req.body)
  
})

async function registrarGastoSheets(datoGasto) {
  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    
    console.log('✅ Connection successful!');
    console.log('Sheet title:', doc.title);
    
    const sheet = doc.sheetsByIndex[0];
    console.log('First sheet:', sheet.title);

    try {
      const row = await sheet.addRow(datoGasto);
      console.log('Row added successfully');
      return row;
    } catch (error) {
      console.error('Error adding row:', error);
      throw error;
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Express server running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});


// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log('✅ Express server closed');
    process.exit(0);
  });
};

