const express = require("express");

const {
    createUser,
    getOfficers
} = require("../controllers/userController");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("admin"),
    createUser
);

router.get(
    "/officers",
    protect,
    authorize("admin"),
    getOfficers
);

module.exports = router;