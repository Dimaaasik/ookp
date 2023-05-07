const express = require('express');
const mongoose = require('mongoose');
const operatorRoutes = require('./routes/operator-routes')



const PORT = 3000;
const URL = "mongodb://localhost:27017/Hospital"

const app = express();
app.use(express.json());
app.use(operatorRoutes)

mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error ${err}`))
app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening port ${PORT}`);
});



