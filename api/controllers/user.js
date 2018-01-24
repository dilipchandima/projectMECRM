const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlConnectionPool = require("../common/mysqlConnectionPool")

exports.user_signup = (req, res, next) => {
    return res.status(200).json({
        message: "signup successful"
    });
};

exports.user_login = (req, res, next) => {
    return res.status(200).json({
        message: "login successful"
    });
};

exports.user_delete = (req, res, next) => {
    return res.status(200).json({
        message: "delete successful"
    });
};

exports.user_getAll = (req, res, next) => {
    sqlConnectionPool.getConnection((err, connection) => {
        let sql = 'SELECT * FROM user';
        if (err) {
            return res.status(204).json({
                message: "SQL Error"
            });
        }
        else {
            connection.query(sql, (sqlErr, results) => {
                if (sqlErr) {
                    console.log(sqlErr);
                    return res.status(204).json({
                        message: "No existing Users"
                    });
                } else if (results.length > 0) {
                    return res.status(200).json({
                        message: "retrive successful",
                        data: results
                    });
                }
            });

        }
    })
};
