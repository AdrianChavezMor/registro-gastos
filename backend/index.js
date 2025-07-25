const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { createConnection, registrarGastoSheets } = require('./sheetsService');

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
  console.log('Connected!')
}

initializer()

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

