const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser")
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const DBConnection = require('./dao/database.js');

const notesRouter = require('./routers/notesRouter.js');
const credRouter = require('./routers/credRouter.js');
const courseRouter = require('./routers/courseRouter.js');
const { authorization } = require("./api/login.js");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
app.use(bodyParser.json())
app.use(cookieParser());

app.get("/hello", authorization, (req, res) => {
    res.send("Hello " + req.username);
});

app.use('/notes', notesRouter);
app.use('/', credRouter);
app.use('/course', courseRouter);

if(process.env.STATUS == "production") DBConnection.dial();

app.listen(PORT, () => {
    console.log(`server is listing on port ${PORT}`);
});

module.exports = app;