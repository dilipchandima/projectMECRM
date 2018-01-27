const jwt = require("jsonwebtoken");
const sqlConnectionPool = require("../common/mysqlConnectionPool")

exports.job_getAll = (req, res, next) => {
    sqlConnectionPool.getConnection((err, connection) => {
        let sql = 'SELECT * FROM job';
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
                        message: "No existing Jobs"
                    });
                } else if (results.length > 0) {
                    return res.status(200).json({
                        message: "retrive successful",
                        data: results
                    });
                } else {
                    return res.status(204).json({
                        message: "No existing Jobs"
                    });
                }
            });

        }
    })
};

exports.job_getById = (req, res, next) => {
    const id = req.params.id;
    let sql = 'SELECT * FROM job WHERE job_id =' + id;
    sqlConnectionPool.getConnection((err, connection) => {
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
                        message: "No existing Jobs"
                    });
                } else if (results.length > 0) {
                    console.log(results);
                    return res.status(200).json({
                        message: "retrive successful",
                        data: results
                    });
                } else {
                    return res.status(204).json({
                        message: "No existing Jobs"
                    });
                }
            });

        }
    })
};

exports.job_getByUserId = (req, res, next) => {
    const id = req.params.userId;
    let sql = 'SELECT * FROM job WHERE user_id =' + id;
    sqlConnectionPool.getConnection((err, connection) => {
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
                        message: "No existing Jobs"
                    });
                } else if (results.length > 0) {
                    return res.status(200).json({
                        message: "retrive successful",
                        data: results
                    });
                } else {
                    return res.status(204).json({
                        message: "No existing Jobs"
                    });
                }
            });

        }
    })
};


exports.job_getByStatus = (req, res, next) => {
    const id = req.params.status;
    let sql = 'SELECT * FROM job WHERE job_status = \'' + id + '\'';
    sqlConnectionPool.getConnection((err, connection) => {
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
                        message: "No existing Jobs"
                    });
                } else if (results.length > 0) {
                    return res.status(200).json({
                        message: "retrive successful",
                        data: results
                    });
                } else {
                    return res.status(204).json({
                        message: "No existing Jobs"
                    });
                }
            });

        }
    })
};

exports.job_create = (req, res, next) => {

    let insert_sql = "INSERT INTO job(job_address,job_discription,job_status,user_id) "
        + "VALUES('"
        + req.body.address + "','"
        + req.body.description
        + "','RETAIRE',"
        + req.body.userId + ")";

    sqlConnectionPool.getConnection((err, connection) => {
        if (err) {
            return res.status(204).json({
                message: "SQL Error"
            });
        }
        else {
            connection.query(insert_sql, (sqlErr, results) => {
                if (sqlErr) {
                    console.log(sqlErr);
                    return res.status(204).json({
                        message: "No existing Jobs"
                    });
                } else if (results) {
                    console.log(results);
                    return res.status(201).json({
                        message: "Job created"
                    });
                } else {
                    return res.status(500).json({
                        message: "Something went wrong"
                    });
                }
            });
        }
    })
}