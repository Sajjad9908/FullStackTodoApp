// Local dev entrypoint
const app = require('./api/index');


module.exports = app;

app.use( PageNotFoundError)

const port=5000;

const connectDb=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Database connected successfully");
    } catch (error) {   
        console.log("Database connection failed:",error.message);
        
    }
}

app.listen(port,async()=>{
    await connectDb();
   console.log(`Server is running on  http://localhost:${Port}`);
   
});

