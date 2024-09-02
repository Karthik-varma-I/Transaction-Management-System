const model = require('../models/model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createUser = (req, res) => {
    let data = req.body;
    
    bcrypt.genSalt(10)
    .then((salt) => {
        data.password = bcrypt.hashSync(data.password, salt);
        model.createUser(data, (err, result, fields) => {
            if(err) {
                console.log(err);
                res.status(400).send({"message" : err.sqlMessage,
                    "state" : err.sqlState
                });
            } else {
                res.status(201).send({
                    "message" : "Signed Up Successfully",
                    "result" : result
                });
            }
        });
    })
    .catch((err) => {
        res.status(500).send({"message" : "Server Side Error!!"});
        console.log(err);
    });
};

module.exports.checkUser = (req, res) => {
    let data = req.body;
    if(data.email) {
        model.checkUser(data.email, (err, result, fields) => {
            if(err) {
                res.status(500).send({"message" : "Server Side Error!!"});
                console.log(err);
            } else if(result.length == 0) {
                res.status(400).send({"message" : "No User Found"});
            } else {
                bcrypt.compare(data.password, result[0].password)
                .then((flag) => {
                    if(flag) {
                        try {
                            let token = jwt.sign(data, process.env.SECRETKEY, {"expiresIn" : "1h"});
                            res.status(200).send({
                                "message" : "Authenticated Successfully",
                                "token" : token
                            });
                        } catch(err) {
                            console.log(err);
                            res.status(500).send({"message" : "Server Side Error!!"});
                        }
                    } else {
                        res.status(400).send("Invaild password");
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({"message" : "Server Side Error!!"});
                })
            } 
        })
    } else {
        res.status(400).send({"message" : "Invaild data"});
    }
};


module.exports.addTransaction = (req, res) => {
    let data = req.body;
    if(data) {
        model.addTransaction(data, (err, result, fields) => {
            if(err) {
                res.status(500).send({"message" : "Server Side Error!!"});
                console.log(err);
            } else {
                res.status(201).send({
                    "message" : "Transaction Created Successfully",
                    "result" : result
                });
            }
        });
    } else {
        res.status(400).send({"message" : "Invaild data"});
    }
}

module.exports.getAllTransactionsByCustomerId = (req, res) => {
    let cid = req.params.customerid;
    model.getAllTransactionsByCustomerId(cid, (err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Successfully Fetched Transactions",
                "result" : result
            });
        }
    });
}

module.exports.getStatusTransactionsByCuustomerId = (req, res) => {
    let cid = req.params.customerid;
    let status = req.params.status;
    model.getStatusTransactionsByCuustomerId(cid, status, (err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Successfully Fetched Transactions",
                "result" : result
            });
        }
    })
};

module.exports.getTotalAmountByCustomerId = (req, res) => {
    let cid = req.params.customerid;
    model.getTotalAmountByCustomerId(cid, (err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Successfully Fetched Amount",
                "result" : result
            });
        }
    });
};

module.exports.getAllUsers = (req, res) => {
    model.getAllUsers((err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Successfully Fetched Users",
                "result" : result
            });
        }
    });
}

module.exports.getTransactionByTid = (req, res) => {
    let tid = req.params.transactionid;
    model.getTransactionByTid(tid, (err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Successfully Fetched Transaction",
                "result" : result
            });
        }
    });
}

module.exports.updatetransacionById = (req, res) => {
    let tid = req.params.transactionid;
    let data = req.body;
    
    model.updatetransacionById(tid, data, (err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Successfully Updated",
                "result" : result
            });
        }
    });
}

module.exports.deleteTransactionByid = (req, res) => {
    let tid = req.params.transactionid;
    model.deleteTransactionByid(tid, (err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Deleted Successfully",
                "result" : result
            });
        }
    });
}

module.exports.deleteUser = (req, res) => {
    let email = req.params.email;
    model.transactionsDeleteUser(email, (err1, result1, fields1) => {
        if(err1) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err1);
        } else {
            model.usersDeleteUser(email, (err2, result2, fields2) => {
                if(err2) {
                    res.status(500).send({"message" : "Server Side Error!!"});
                    console.log(err2);
                } else {
                    res.status(200).send({
                        "message" : "Successfully deleted from both tables",
                        "result1" : result1,
                        "result2" : result2
                    });
                }
            })
        }
    });
}

module.exports.checkAdmin = (req, res) => {
    let data = req.body;
    if(data.email) {
        model.checkAdmin(data.email, (err, result, fields) => {
            if(err) {
                res.status(500).send({"message" : "Server Side Error!!"});
                console.log(err);
            } else if(result.length == 0) {
                res.status(400).send({"message" : "No User Found"});
            } else {
                bcrypt.compare(data.password, result[0].password)
                .then((flag) => {
                    if(flag) {
                        try {
                            let token = jwt.sign(data, process.env.SECRETKEY, {"expiresIn" : "1h"});
                            res.status(200).send({
                                "message" : "Authenticated Successfully",
                                "token" : token
                            });
                        } catch(err) {
                            console.log(err);
                            res.status(500).send({"message" : "Server Side Error!!"});
                        }
                    } else {
                        res.status(400).send({"message" : "Invaild password"});
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send({"message" : "Server Side Error!!"});
                })
            } 
        })
    } else {
        res.status(400).send({"message" : "Invaild data"});
    }
};

module.exports.getNotifications = (req, res) => {
    model.getNotifications((err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Fetched Successfully",
                "result" : result
            });
        }
    });
};

module.exports.updateStatus = (req, res) => {
    let id = req.params.transsactionid;
    let status = req.params.status;
    model.updateStatus(id, status, (err, result, fields) => {
        if(err) {
            res.status(500).send({"message" : "Server Side Error!!"});
            console.log(err);
        } else {
            res.status(200).send({
                "message" : "Successfully Updated",
                "result" : result
            });
        }
    });
}