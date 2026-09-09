const express = require("express");
const { protect,authorize } = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser
} = require("./authController");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        user: req.user
    });
});
router.get("/admin-test", protect, authorize("admin"), (req, res) => {
    res.status(200).json({
        message: "Admin access granted"
    });
});

module.exports = router;