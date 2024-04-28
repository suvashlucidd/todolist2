const express = require('express');
const app = express();

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware for authentication
app.use((req, res, next) => {
  // Check authentication here
  const isAuthenticated = true; // For demonstration purpose
  if (isAuthenticated) {
    console.log("User is authenticated.");
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});

// Route handler
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
