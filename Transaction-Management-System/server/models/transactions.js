module.exports.addTransaction = (data, callback, connection) => {
    connection.query(`insert into transactions 
        (transaction_id, customer_id, amount, status, payment_method, currency)
        values (?,?,?,?,?,?)`,
        [data.transaction_id, data.customer_id, data.amount, data.status, data.payment_method, data.currency],
        callback);
};

module.exports.getAllTransactionsByCustomerId = (cid, callback, connection) => {
    connection.query(`select * from transactions where customer_id = ? order by transaction_date`,
        [cid],
        callback
    )
};

module.exports.getStatusTransactionsByCuustomerId = (cid, status, callback, connection) => {
    connection.query(`select * from transactions where customer_id = ? and status = ? order by transaction_date`,
        [cid, status],
        callback
    )
}

module.exports.getTotalAmountByCustomerId = (cid, callback, connection) => {
    connection.query(`select count(customer_id) as count, sum(amount) as totalAmount from transactions 
            where customer_id = ? and status = 'success' 
            group by customer_id;`,
            [cid],
            callback);
};

module.exports.getTransactionByTid = (tid, callback, connection) => {
    connection.query("select * from transactions where transaction_id = ?", [tid], callback);
}

module.exports.updatetransacionById = (tid, data, callback, connection) => {
    // console.log(data);
    connection.query("update transactions set amount = ?, transaction_date = ?, status = ?, payment_method =? where transaction_id = ?",
        [data.amount, data.transaction_date, data.status, data.payment_method, tid],
        callback
    );
}

module.exports.deleteTransactionByid = (tid, callback, connection) => {
    connection.query("delete from transactions where transaction_id = ?", [tid], callback);
}

module.exports.deleteUser = (email, callback, connection) => {
    connection.query("delete from transactions where customer_id = ?", [email], callback);
}

module.exports.getNotifications = (callback, connection) => {
    connection.query("select * from transactions where status = 'pending' order by transaction_date", callback);
}

module.exports.updateStatus = (id, status, callback, connection) => {
    connection.query("update transactions set status = ? where transaction_id = ?", 
        [status, id],
        callback
    )
}