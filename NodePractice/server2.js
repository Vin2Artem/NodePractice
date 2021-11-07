'use strict';
const express = require("express");
const app = express();

// ���������� �������
const userRouter = express.Router();  // ��� ������� � "/users"

userRouter.use("/create", function (request, response) {
    response.send("���������� ������������");
});
userRouter.use("/", function (request, response) {
    response.send("������ �������������");
});
// ����c������� ������ � �������� ������ "/users"
app.use("/users", userRouter);

// ����� �����������
app.get("/about", function (request, response) {
    response.send("� �����");
});
app.get("/", function (request, response) {
    response.send("������� ��������");
});

// ��������� ������ 404
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