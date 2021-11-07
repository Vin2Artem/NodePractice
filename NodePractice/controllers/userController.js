const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const User = require("../models/user.js");

exports.addUser = function (request, response) {
    response.render("createUser.ejs");
};
exports.getUsers = function (request, response) {
    (async () => {
        //await User.sync({ force: true });
        response.render("users.ejs", {
            users: await User.findAll()
        });
    })()
};
exports.postUser = function (request, response) {
    (async () => {
        let filedata = request.file;
        console.log(filedata);
        let isCorrect = true;
        const Op = require('Sequelize').Op;
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