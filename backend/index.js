const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { createConnection, registrarGastoSheets, obtenerRegistros} = require('./sheetsService');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(morgan('combined')); // HTTP request logger
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


async function initializer() {
  console.log('Connecting to Google Sheets...');
  await createConnection();
}

initializer()

//ROUTES
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


app.get('/registro', async (req, res) => {
  try {
    const registros = await obtenerRegistros();
    return res.json(registros);
  } catch (error) {
    console.error('Error in /registro route:', error);
    return res.status(500).json({ error: 'Failed to get records' });
  }
});


// Start server
const server = app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});


// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received, shutting down gracefully...`);
  server.close(() => {
    console.log('Express server closed');
    process.exit(0);
  });
};

