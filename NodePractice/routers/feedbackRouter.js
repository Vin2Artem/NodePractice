const multer = require("multer");
const fs = require('fs-extra');
const express = require("express");
const feedbackController = require("../controllers/feedbackController.js");
const feedbackRouter = express.Router();

feedbackRouter.use("/postfeedback", multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            let path = "./public/scans";
            fs.mkdirsSync(path);
            callback(null, path);
        }
    })
}).single("filedata"), feedbackController.postFeedback);
feedbackRouter.use("/create", feedbackController.addFeedback);
feedbackRouter.use("/", feedbackController.getFeedbacks);

module.exports = feedbackRouter;