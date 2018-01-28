const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sqlConnectionPool = require("../common/mysqlConnectionPool");
var fs = require('fs');

exports.user_signup = (req, res, next) => {
  var dt = new Date();
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  imagetype = req.body.picture.split(";")[0].split("/")[1];
  console.log(imagetype);
  var base64d;
  if (imagetype == 'jpeg') {

    base64d = req.body.picture.replace(/^data:image\/jpeg;base64,/, "");
  } else if (imagetype == 'png') {

    base64d = req.body.picture.replace(/^data:image\/png;base64,/, "");
  } else if (imagetype == 'jpg') {

    base64d = req.body.picture.replace(/^data:image\/jpg;base64,/, "");
  }
  var path = "./public/images/" + text + dt.getDate() + dt.getMonth() + dt.getMilliseconds() + "." + imagetype;
  var path1 = "/images/" + text + dt.getDate() + dt.getMonth() + dt.getMilliseconds() + "." + imagetype;
  fs.writeFile(path, base64d, 'base64', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });

  let insert_sql = 'INSERT INTO user (user_name,user_email,user_address1,user_address2,user_address3,user_phone,user_profile_picture,user_password,user_role)'
    + 'VALUES ("'
    + req.body.name + '","'
    + req.body.email + '","'
    + req.body.address1 + '","'
    + req.body.address2 + '","'
    + req.body.address3 + '","'
    + req.body.phone + '","'
    + path1 + '","'
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
            return res.cookie('CRM_COOKIE', token, { maxAge: 3600 * 24 * 1000 })
              .status(200)
              .json({
                message: "Auth successful",
                userRole: results[0].user_role,
                userId: results[0].user_id
              });
          } else {
            return res.status(401).json({
              message: "Auth failed"
            });
          }
        }
      });

    }
  })

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
        } else {
          return res.status(204).json({
            message: "No existing Users"
          });
        }
      });

    }
  })
};

exports.user_getById = (req, res, next) => {
  const id = req.params.id;
  let sql = 'SELECT * FROM user WHERE user_id =\'' + id + '\'';
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
            message: "No existing Users"
          });
        } else if (results.length > 0) {
          return res.status(200).json({
            message: "retrive successful",
            data: results
          });
        } else {
          return res.status(204).json({
            message: "No existing Users"
          });
        }
      });

    }
  })
};

exports.user_getByName = (req, res, next) => {
  const id = req.params.name;
  let sql = 'SELECT * FROM user WHERE user_name =\'' + id + '\'';
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
            message: "No existing Users"
          });
        } else if (results.length > 0) {
          return res.status(200).json({
            message: "retrive successful",
            data: results
          });
        } else {
          return res.status(204).json({
            message: "No existing Users"
          });
        }
      });

    }
  })
};

