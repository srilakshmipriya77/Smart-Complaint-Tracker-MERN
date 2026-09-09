const express = require("express");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    createFeedback,
    getFeedback
} = require("../controllers/feedbackController");

const router = express.Router();

router.post(
    "/",
    protect,
    authorize("citizen"),
    createFeedback
);

router.get(
    "/",
    protect,
    authorize("admin"),
    getFeedback
);

module.exports = router;