const Feedback = require("../models/feedback.js");

exports.addFeedback = function (request, response) {
    response.render("createFeedback.ejs");
};
exports.getFeedbacks = function (request, response) {
    (async () => {
        //await Feedback.sync({ force: true });
        response.render("feedback.ejs", {
            feedbacks: await Feedback.findAll()
        });
    })()
};
exports.postFeedback = function (request, response) {
    (async () => {
        let filedata = request.file;
        console.log(filedata);
        if (!filedata)
            await Feedback.create({
                name: request.body.name,
                email: request.body.email,
                topic: request.body.topic,
                message: request.body.message,
                image: null,
            });
        else
            await Feedback.create({
                name: request.body.name,
                email: request.body.email,
                topic: request.body.topic,
                message: request.body.message,
                image: filedata.filename,
            });
        response.redirect("/feedbacks");
    })()
};