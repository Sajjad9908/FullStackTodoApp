require('dotenv').config();
const express=require('express')
const app=express();
const mongoose=require('mongoose');
const todoRouter=require('./Router/TodoRouter');
const {PageNotFoundError}=require('./conroller/error').default;
const cors=require('cors');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use('/api/todo',todoRouter);

app.use( PageNotFoundError)

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

// For local development
if (require.main === module) {
    const Port = process.env.PORT || 5000;
    app.listen(Port, () => {
        console.log(`Server is running on http://localhost:${Port}`);
    });
}

