require("dotenv").config();

const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const logger = require('./utils/logger');
const connectDB = require('./config/db_config')

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
    logger.info(`${req.method.toUpperCase()} - ${req.url}`);
    next();
})

app.use('/api', require("./routes/api.js"))

app.use('/', (err, req, res, next) => {
    const errMessage = err.message;
    const errStack = err.stack;
    const errStatus = err.status || 500;

    logger.error(errStack);
    res.status(errStatus).json({ error: errMessage});
})

app.use((req, res, next) => {
    res.status(404);
    res.format({
        html: () => {
            res.sendFile(path.join(__dirname, "/views/404.html"));
        },
        json: () => {
            res.json({message: "404 Not Found!"});
        },
        default: () => {
            res.send("404 Not Found!");
        }
    });
});

app.listen(PORT, () => {
    logger.info(`Server is listening on port ${PORT}.`);
});

/** TODO:
 *  [] CORS
 *  [] MONGODB + MONGOOSE
 *  [] MODELS
 *  [] CONTROLLERS
 *  [] AUTH + JWT
 */
