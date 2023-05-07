const Operator = require("../models/operator");

const handleError = (res, error) => {
    res.status(500).json({ error });
}


const getOperators = (req, res) =>{
    Operator
        .find()
        .sort({ title: 1 })
        .then((operators) => {
            res
                .status(200)
                .json(operators);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
};

const getOneOperator = (req, res) =>{
    Operator
        .findById(req.params.id)
        .then((operator) => {
            res
                .status(200)
                .json(operator);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
};

const deleteOperator = (req, res) => {
    Operator
        .findByIdAndDelete(req.params.id)
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
};

const addOperator = (req, res) => {
    const operator = new Operator(req.body)
    operator
        .save()
        .then((result) => {
            res
                .status(201)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
}



const changeOperator = (req, res) =>{
    Operator
        .findByIdAndUpdate(req.params.id, req.body )
        .then((result) => {
            res
                .status(200)
                .json(result);
        })
        .catch(() => handleError(res, "Something goes wrong..."));
}

module.exports = {
    getOperators,
    getOneOperator,
    deleteOperator,
    addOperator,
    changeOperator
}