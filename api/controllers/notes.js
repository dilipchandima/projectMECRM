const jwt = require("jsonwebtoken");
const sqlConnectionPool = require("../common/mysqlConnectionPool")

exports.notes_getAll = (req, res, next) => {
    sqlConnectionPool.getConnection((err, connection) => {
        let sql = 'SELECT * FROM note';
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
                        message: "No existing Notes"
                    });
                } else if (results.length > 0) {
                    return res.status(200).json({
                        message: "retrive successful",
                        data: results
                    });
                } else {
                    return res.status(204).json({
                        message: "No existing Notes"
                    });
                }
            });

        }
    })
};

exports.notes_getByJob = (req, res, next) => {

    const id = req.params.jobId;
    let sql = 'SELECT * FROM note WHERE job_id =' + id;

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
                        message: "No existing Notes"
                    });
                } else if (results.length > 0) {
                    return res.status(200).json({
                        message: "retrive successful",
                        data: results
                    });
                } else {
                    return res.status(204).json({
                        message: "No existing Notes"
                    });
                }
            });

        }
    })
};

exports.notes_create = (req, res, next) => {

    let sql = "INSERT INTO note (note_date,note_time,note_description,note_role,job_id) "
        + " VALUES (\""
        + req.body.date + "\" ,\""
        + req.body.time + "\",\""
        + req.body.description + "\" ,\""
        + req.body.role + "\" ,"
        + req.body.jobId + ");";

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
                        message: "No existing Notes"
                    });
                } else if (results) {
                    console.log(results);
                    return res.status(201).json({
                        message: "Note created"
                    });
                } else {
                    return res.status(500).json({
                        message: "Something went wrong"
                    });
                }
            });

        }
    })
};

exports.notes_delete = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  let sql = 'DELETE FROM note WHERE job_id =\'' + id + '\'';
  sqlConnectionPool.getConnection((err, connection) => {
    if (err) {
      return res.status(404).json({
        message: "SQL Error"
      });
    }
    else {
      connection.query(sql, (sqlErr, results) => {
        if (sqlErr) {
          return res.status(404).json({
            message: "No existing Users"
          });
        } else {
          return res.status(204).json({
            message: "Delete Successful"
          });
        }
      });

    }
  })
};
