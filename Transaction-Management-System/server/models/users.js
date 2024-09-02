module.exports.createUser = (data, callback, connection) => {
    connection.query("insert into users values (?, ?)", [data.email, data.password], callback);
}

module.exports.checkUser = (email, callback, connection) => {
    connection.query("select password from users where email = ?", [email], callback);
}

module.exports.getAllUsers = (callback, connection) => {
    connection.query("select email from users", callback);
}

module.exports.deleteUser = (email, callback, connection) => {
    connection.query("delete from users where email = ?", [email], callback);
}

module.exports.checkAdmin = (email, callback, connection) => {
    connection.query("select password from admin where email = ?", [email], callback);
}
