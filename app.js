const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();


// middlwares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


// importing routes
const authRoute = require('./routes/auth');
const businessRoute = require('./routes/business');


// Routes middlewares

app.use('/api/user', authRoute);
app.use('/api/business', businessRoute);


// app.use(errorHandler()); // global error handler

const Port = 5000;
app.listen(Port, () => {
    console.log(`Server running on PORT ${Port}`);
});
