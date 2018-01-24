const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlConnectionPool = require("../common/mysqlConnectionPool")

exports.user_signup = (req, res, next) => {

    let insert_sql = 'INSERT INTO user (user_name,user_email,user_address1,user_address2,user_address3,user_password,user_role)'
        + 'VALUES ("'
        + req.body.userName + '","'
        + req.body.email + '","'
        + req.body.addressLine1 + '","'
        + req.body.addressLine2 + '","'
        + req.body.addressLine3 + '","'
        + req.body.password + '","USER")';

    let validate_sql = 'SELECT * FROM user WHERE user_email =\'' + req.body.email + '\'';

    sqlConnectionPool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                message: "SQL Connection Error"
            });
        }
        else {
            connection.query(validate_sql, (sqlErr, results) => {
                if (sqlErr) {
                    console.log(sqlErr);
                    return res.status(500).json({
                        message: "SQL Connection Error"
                    });
                } else if (results.length > 0) {
                    return res.status(409).json({
                        message: "User already Exists"
                    });
                }
                else if (results.length == 0) {
                    sqlConnectionPool.getConnection((err1, connection1) => {
                        if (err1) {
                            return res.status(500).json({
                                message: "SQL Connection Error"
                            });
                        }
                        else {
                            connection1.query(insert_sql, (sqlErr1, results1) => {
                                if (sqlErr1) {
                                    console.log(sqlErr1);
                                    return res.status(500).json({
                                        message: "SQL Connection Error"
                                    });
                                } else if (results1) {
                                    console.log(results1);
                                    return res.status(201).json({
                                        message: "User created"
                                    });
                                } else {
                                    return res.status(500).json({
                                        message: "Something went wrong"
                                    });
                                }
                            });

                        }
                    })
                } else {
                    return res.status(500).json({
                        message: "Something went wrong"
                    });
                }
            });

        }
    })
};

exports.user_login = (req, res, next) => {
    let sql = 'SELECT * FROM user WHERE user_email =\'' + req.body.email + '\'';
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
                } else if (results.length > 0) {
                    if (results[0].user_password == req.body.password) {
                        const token = jwt.sign(
                            {
                                email: results[0].user_email,
                                userId: results[0].user_id,
                            },
                            "process.env.JWT_KEY",
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: "Auth successful",
                            userRole: results[0].user_role,
                            token: token
                        });
                    } else{
                        return res.status(401).json({
                            message: "Auth failed"
                        });
                    }
                }
            });

        }
    })

};

// exports.user_delete = (req, res, next) => {
//     return res.status(200).json({
//         message: "delete successful"
//     });
// };

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
