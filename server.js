const express = require('express');
const employeeRoutes = require("./routes/employeeRoute")
const userRoutes = require("./routes/userRoute")
const mongoose = require('mongoose');

const SERVER_PORT = 3001

const DB_URL = "mongodb+srv://tdotnguyen:JA5Dkz4KLhZMBsTC@cluster0.hgh3k7b.mongodb.net/F2023_COMP3123-Assignment1?retryWrites=true&w=majority"
const app = express()
const apiV1 = express()
app.use(express.json())
app.use(express.urlencoded())


app.use("/api/v1/",apiV1)
apiV1.use("/user", userRoutes)
apiV1.use("/emp", employeeRoutes)


mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


app.route('/')
    .get((req, res) => {
        res.send("<h1>Welcome to Assignment 1 for COMP3123</h1>");
    });


app.listen(SERVER_PORT, () => {
    console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});