const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const operatorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    patronymic: {
        type: String,
        required: true,
    },
});

const Operator = mongoose.model('Operator', operatorSchema);

module.exports = Operator;
