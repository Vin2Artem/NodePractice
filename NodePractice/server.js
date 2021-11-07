'use strict';
const express = require("express");
const app = express();
const userRouter = require("./routers/userRouter.js");
const feedbackRouter = require("./routers/feedbackRouter.js");
const homeRouter = require("./routers/homeRouter.js");

app.use(express.static("public"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.use("/feedbacks", feedbackRouter);
app.use("/users", userRouter);
app.use("/", homeRouter);

app.use(function (req, res, next) {
    res.status(404).send("Not Found");
});

app.listen(1337);