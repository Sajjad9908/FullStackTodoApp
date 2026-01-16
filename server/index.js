// Local dev entrypoint
const app = require('./api/index');
const mongoose = require('mongoose');
require('dotenv').config();

module.exports = app;

const port = 5000;

const connectDb = async() => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Database connected successfully");
    } catch (error) {   
        console.log("Database connection failed:", error.message);
    }
}

app.listen(port, async() => {
    await connectDb();
    console.log(`Server is running on http://localhost:${port}`);
});

