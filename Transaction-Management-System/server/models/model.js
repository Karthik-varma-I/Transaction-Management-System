const mysql = require('mysql2');
const userModel = require('./users');
const transactionModel = require('./transactions');
require('dotenv').config();

const connection = mysql.createConnection({
    host : process.env.HOST,
    user : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE
});

connection.connect((err) => {
    if(err) {
        console.log(err);
    } else {
        console.log("Connection to the database successfull");
    }
});

module.exports.createUser = (data, callback) => {
    userModel.createUser(data, callback, connection);
}
module.exports.checkUser = (data, callback) => {
    userModel.checkUser(data, callback, connection);
}

module.exports.addTransaction = (data, callback) => {
    transactionModel.addTransaction(data, callback, connection);
}

module.exports.getAllTransactionsByCustomerId = (cid, callback) => {
    transactionModel.getAllTransactionsByCustomerId(cid, callback, connection);
}

module.exports.getStatusTransactionsByCuustomerId = (cid, status, callback) => {
    transactionModel.getStatusTransactionsByCuustomerId(cid, status, callback, connection);
}

module.exports.getTotalAmountByCustomerId = (cid, callback) => {
    transactionModel.getTotalAmountByCustomerId(cid, callback, connection);
}

module.exports.getAllUsers = (callback) => {
    userModel.getAllUsers(callback, connection);
}

module.exports.getTransactionByTid = (tid, callback) => {
    transactionModel.getTransactionByTid(tid, callback, connection);
} 

module.exports.updatetransacionById = (tid, data, callback) => {
    transactionModel.updatetransacionById(tid, data, callback, connection);
}

module.exports.deleteTransactionByid = (tid, callback) => {
    transactionModel.deleteTransactionByid(tid, callback, connection);
}

module.exports.usersDeleteUser = (email, callback) => {
    userModel.deleteUser(email, callback, connection);
}

module.exports.transactionsDeleteUser = (email, callback) => {
    transactionModel.deleteUser(email, callback, connection);
}

module.exports.checkAdmin = (email, callback) => {
    userModel.checkAdmin(email, callback, connection);
}

module.exports.updateStatus = (id, status, callback) => {
    transactionModel.updateStatus(id, status, callback, connection);
}

module.exports.getNotifications = (callback) => {
    transactionModel.getNotifications(callback, connection);
}