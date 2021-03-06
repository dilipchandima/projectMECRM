const express = require("express");
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.email + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');

router.post("/login", UserController.user_login);
router.post("/signup", UserController.user_signup);

router.post("/superAdmin/update", checkAuth, UserController.update_superAdminKey);

router.get("/getAll", checkAuth, UserController.user_getAll);
router.get("/:id", checkAuth, UserController.user_getById);
router.get("/byName/:name", checkAuth, UserController.user_getByName);
router.get("/superAdmin", checkAuth, UserController.get_superAdminKey);

router.delete("/delete/:id", checkAuth, UserController.user_delete);

module.exports = router;
