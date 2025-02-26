const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const gradeRoutes = require('./routes/gradeRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'https://tareacali.web.app', // URL de tu frontend en Firebase Hosting
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api', gradeRoutes);

module.exports = app;