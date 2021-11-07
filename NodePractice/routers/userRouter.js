const multer = require("multer");
const fs = require('fs-extra');
const express = require("express");
const userController = require("../controllers/userController.js");
const userRouter = express.Router();

userRouter.use("/postuser", multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            let path = "./public/avatars";
            fs.mkdirsSync(path);
            callback(null, path);
        }
    })
}).single("filedata"), userController.postUser);
userRouter.use("/create", userController.addUser);
userRouter.use("/", userController.getUsers);

module.exports = userRouter;