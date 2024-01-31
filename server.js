// app.js
const express = require('express');
const cors = require('cors');
const httpsApi = require('follow-redirects').https;
const app = express();
const port = 3000;

// Serve static files (like your HTML, CSS, and JavaScript files) from the "public" directory
app.use(express.static('public'));

app.use(cors({
  origin:'http://localhost:3000', 
  optionSuccessStatus:200,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});