const express = require('express');

const {
    getOperators,
    getOneOperator,
    deleteOperator,
    addOperator,
    changeOperator
} = require('../controlers/operator-controler')



const router = express.Router();

router.get('/operators', getOperators);
router.get('/operators/:id', getOneOperator);
router.delete('/operators/:id', deleteOperator);
router.post('/operators',addOperator);
router.patch('/operators/:id',changeOperator);


module.exports = router