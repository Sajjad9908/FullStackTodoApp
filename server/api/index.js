require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const todoRouter = require('../Router/TodoRouter');
const { PageNotFoundError } = require('../conroller/error');
const cors = require('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/api/todo',todoRouter);

// Health check route for root
app.get('/', (req, res) => {
    res.json({ ok: true, message: 'Backend is running' });
});

// Simple API base route
app.get('/api', (req, res) => {
    res.json({ ok: true, message: 'API is up', availableRoutes: ['/api/todo/getitem', 'POST /api/todo', 'PUT /api/todo/:id/completed', 'PUT /api/todo/:id/update', 'DELETE /api/todo/:id'] });
});

// 404 handler - must be last
app.use((req, res) => {
    console.log('404 Not Found:', req.method, req.url);
    res.status(404).json({ error: 'Page Not Found', requestedUrl: req.url, method: req.method });
});

const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Database connected successfully");
    } catch (error) {   
        console.log("Database connection failed:",error.message);
        
    }
}

// Connect to DB on startup
connectDb();

// Export for Vercel serverless
module.exports = app;
