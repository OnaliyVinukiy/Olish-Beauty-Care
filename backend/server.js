// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); 

// Use Auth routes
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
