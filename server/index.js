require('dotenv').config();
const express=require('express')
const app=express();
const mongoose=require('mongoose');
const todoRouter=require('./Router/TodoRouter');
const {PageNotFoundError}=require('./conroller/error').default;
const cors=require('cors');
const path=require('path');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../ClientMain/todoClient/dist')));

app.use('/api/todo',todoRouter);

// Serve React app for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../ClientMain/todoClient/dist/index.html'));
});

app.use( PageNotFoundError)

const Port=process.env.PORT || 5000;

const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Database connected successfully");
    } catch (error) {   
        console.log("Database connection failed:",error.message);
        
    }
}

app.listen(Port,async()=>{
    await connectDb();
   console.log(`Server is running on  http://localhost:${Port}`);
   
});

