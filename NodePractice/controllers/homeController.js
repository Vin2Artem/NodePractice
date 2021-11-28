exports.index = function (request, response) {
    response.send("Главная страница <br><a href='/users/login'>Войти</a><br><a href='/users'>Пользователи</a><br><a href='/feedbacks'>Вопросы</a>");
};
exports.about = function (request, response) {
    response.send("О сайте");
};