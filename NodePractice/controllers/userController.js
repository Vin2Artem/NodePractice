const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const User = require("../models/user.js");
const Op = require('Sequelize').Op;
let firstNum;
let secondNum;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

exports.addUser = function (request, response) {
    response.render("createUser.ejs");
};
exports.loginUser = function (request, response) {
    firstNum = getRandomInt(1, 100);
    secondNum = getRandomInt(1, 100);
    response.render("loginUser.ejs", {
        firstNum: firstNum,
        secondNum: secondNum,
    });
};
exports.getUsers = function (request, response) {
    (async () => {
        //await User.sync({ force: true });
        response.render("users.ejs", {
            users: await User.findAll()
        });
    })()
};
const correctPassword = (enteredPassword, originalPassword) => {
    return new Promise(resolve => {
        bcrypt.compare(enteredPassword, originalPassword, (err, res) => {
            resolve(res)
        });
    })
}
exports.enterUser = function (request, response) {
    (async () => {
        if (!(request.body.login && request.body.password && request.body.answer)) {
            response.send("<script>alert('Заполните все поля!'); window.history.back();</script>");
            return;
        }
        if (request.body.answer != firstNum + secondNum) {
            response.send("<script>alert('Капча решена неверно!'); window.history.back();</script>");
            return;
        }
        User.findOne({
            where: {
                login: request.body.login
            }
        }).then(user => {
            if (!user) {
                response.send("<script>alert('Такого пользователя не существует!'); window.history.back();</script>");
                return;
            }
            correctPassword(request.body.password, user.password)
                .then(authenticated => {
                    if (authenticated)
                        response.send("<html><head></head><body>Привет, " + user.login + "!<br><a href='/'>На главную</a></body></html>");
                    else
                        response.send("<script>alert('Неверное имя пользователя или пароль!'); window.history.back();</script>");
                })
                .catch(e => {
                    response.send(e)
                });
        })
    })()
};
exports.postUser = function (request, response) {
    (async () => {
        let filedata = request.file;
        console.log(filedata);
        let isCorrect = true;
        await User.findAll({
            where: {
                [Op.or]: [
                    { login: request.body.login },
                    { email: request.body.email }
                ]
            }
        }).then(users => {
            if (users.length != 0) {
                isCorrect = false;
            }
        });
        if (!isCorrect) {
            response.send("<script>alert('Пользователь с таким логином и/или email уже существует!'); window.history.back();</script>");
            return;
        }
        if (request.body.password != request.body.rpassword) {
            response.send("<script>alert('Пароли не совпадают!'); window.history.back();</script>");
            return;
        }
        await User.create({
            login: request.body.login,
            email: request.body.email,
            password: bcrypt.hashSync(request.body.password, salt),
            avatar: filedata ? filedata.filename : null,
        });
        /*
        if (!filedata)
            await User.create({
                login: request.body.login,
                email: request.body.email,
                password: bcrypt.hashSync(request.body.password, salt),
                avatar: null,
            });
        else
            await User.create({
                login: request.body.login,
                email: request.body.email,
                password: bcrypt.hashSync(request.body.password, salt),
                avatar: filedata.filename,
            });
        */
        response.redirect("/users");
    })()
};