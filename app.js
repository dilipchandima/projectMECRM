const express = require('express');
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require('path');
var cookieParser = require('cookie-parser');

const app = express();


const userRoutes = require('./api/routes/user');
const jobRouts = require('./api/routes/jobs');
const noteRouts = require('./api/routes/notes');

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser())


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));


app.engine('html', require('ejs').renderFile);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});


app.use("/api/user", userRoutes);
app.use("/api/job", jobRouts);
app.use("/api/note", noteRouts);

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;