const express = require('express');
const { ObjectId } = require('mongodb');
const { connectToDb, getDb } = require('./db');

const PORT = 3000;

const app = express();
app.use(express.json());

let db;

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`listening port ${PORT}`);
        });
        db = getDb();
    } else {
        console.log(`DB connection error: ${err}`);
    }
});

const handleError = (res, error) => {
    res.status(500).json({ error });
}

app.get('/operators', (req, res) => {
    const operators = [];

    db
        .collection('operator')
        .find()
        .sort({ title: 1 })
        .forEach((operator) => operators.push(operator))
        .then(() => {
            res
                .status(200)
                .json(operators);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.get('/operators/:id', (req, res) => {
    if ( ObjectId.isValid(req.params.id)) {
        db
            .collection('operator')
            .findOne({ _id: new ObjectId(req.params.id) })
            .then((doc) => {
                res
                    .status(200)
                    .json(doc);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
    } else {
        handleError(res, "Wrong id");
    }
});




app.delete('/operators/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db
            .collection('operator')
            .deleteOne({ _id: new ObjectId(req.params.id) })
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
    } else {
        handleError(res, "Wrong id");
    }
});


app.post('/operators', (req, res) => {
    db
        .collection('operator')
        .insertOne(req.body)
        .then((result) => {
            res
                .status(201)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
});

app.patch('/operators/:id', (req, res) => {
    console.log(req.params.id)
    if (ObjectId.isValid(req.params.id)) {
        db
            .collection('operator')
            .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
            .then((result) => {
                res
                    .status(200)
                    .json(result);
            })
            .catch(() => handleError(res, "Something goes wrong..."));
    } else {
        handleError(res, "Wrong id");
    }
});
