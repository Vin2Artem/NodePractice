'use strict';
const express = require("express");
const app = express();

// определяем роутеры
const userRouter = express.Router();  // для адресов с "/users"

userRouter.use("/create", function (request, response) {
    response.send("Добавление пользователя");
});
userRouter.use("/", function (request, response) {
    response.send("Список пользователей");
});
// сопоcтавляем роутер с конечной точкой "/users"
app.use("/users", userRouter);

// общие обработчики
app.get("/about", function (request, response) {
    response.send("О сайте");
});
app.get("/", function (request, response) {
    response.send("Главная страница");
});

// обработка ошибки 404
app.use(function (req, res, next) {
    res.status(404).send("Not Found")
});

app.listen(1337);
/*
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
*/