const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


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
