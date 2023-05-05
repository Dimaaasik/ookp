const express = require('express');
const mongoose = require('mongoose');
const Operator = require('./models/operator.js')

const PORT = 3000;
const URL = "mongodb://localhost:27017/Hospital"

const app = express();
app.use(express.json());

mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error ${err}`))
app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`listening port ${PORT}`);
});



const handleError = (res, error) => {
    res.status(500).json({ error });
}

app.get('/operators', (req, res) => {
    Operator
        .find()
        .sort({ title: 1 })
        .then((operators) => {
            res
                .status(200)
                .json(operators);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.get('/operators/:id', (req, res) => {
    Operator
            .findById(req.params.id)
            .then((operator) => {
                res
                    .status(200)
                    .json(operator);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
});

app.delete('/operators/:id', (req, res) => {
    Operator
            .findByIdAndDelete(req.params.id)
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
});

app.post('/operators', (req, res) => {
    const operator = new Operator(req.body)
    operator
        .save()
        .then((result) => {
            res
                .status(201)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.patch('/operators/:id', (req, res) => {
    Operator
            .findByIdAndUpdate(req.params.id, req.body )
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
});
