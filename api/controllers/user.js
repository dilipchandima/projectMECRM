const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlConnectionPool = require("../common/mysqlConnectionPool")

exports.user_signup = (req, res, next) => {
    return res.status(200).json({
        message: "signup successful"
    });
};

exports.user_login = (req, res, next) => {
    let sql = 'SELECT * FROM user WHERE user_name =\'' + req.body.email + '\'';
    sqlConnectionPool.getConnection((err, connection) => {
        if (err) {
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        else {
            connection.query(sql, (sqlErr, results) => {
                if (sqlErr) {
                    console.log(sqlErr);
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                } else if (results.length > 0 && results[0].user_name == req.body.password) {
                    const token = jwt.sign(
                        {
                            email: results[0].user_email,
                            userId: results[0].user_id
                        },
                        "process.env.JWT_KEY",
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
            });

        }
    })
    // return res.status(200).json({
    //     message: "login successful"
    // });
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
