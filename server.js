const express = require('express');
const app = express();
const port = process.env.PORT || 5000; 
// Middleware and routes
app.get('/', (req, res) => {
  res.send('Hello from TareaCali!');
});

// Use the port provided by Render or default to 5000 for local development
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});