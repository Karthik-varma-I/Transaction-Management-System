const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/createaccount', controller.createUser);
router.post('/signin', controller.checkUser);
router.post('/admin', controller.checkAdmin);
router.post('/createtransaction', verifyToken, controller.addTransaction);
router.get('/transactions/:customerid', controller.getAllTransactionsByCustomerId);
router.get('/transactions/:customerid/:status', controller.getStatusTransactionsByCuustomerId);
router.get('/totalamount/:customerid', controller.getTotalAmountByCustomerId);
router.get('/getusers', verifyToken, controller.getAllUsers);
router.get('/notifications', verifyToken, controller.getNotifications);
router.get('/gettransaction/:transactionid', verifyToken, controller.getTransactionByTid);
router.put('/updatestatus/:transactionid/:status', verifyToken, controller.updateStatus)
router.put('/updatetransactions/:transactionid', verifyToken, controller.updatetransacionById);
router.delete('/deletetransactions/:transactionid', verifyToken, controller.deleteTransactionByid);
router.delete('/deleteuser/:email', verifyToken, controller.deleteUser);

function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if(token) {
        jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
            if(err) {
                res.status(400).send({"message" : "Unauthorized"});
            } else {
                next();
            }
        })
    } else {
        res.status(400).send({"message" : "Unotherized"});
    }
}

module.exports = router;