const express = require("express");

const {
    protect,
    authorize
} = require("../middleware/authMiddleware");

const {
    createComplaint,
    getComplaints,
    getAllComplaints,
    getComplaintById,
    verifyComplaint,
    assignComplaint,
    getAssignedComplaints,
    startComplaint,
    resolveComplaint,
    closeComplaint
} = require("../controllers/complaintController");

const router = express.Router();

// Citizen
router.post(
    "/",
    protect,
    authorize("citizen"),
    createComplaint
);

router.get(
    "/",
    protect,
    authorize("citizen"),
    getComplaints
);

// Officer
router.get(
    "/assigned",
    protect,
    authorize("officer"),
    getAssignedComplaints
);

// Admin
// IMPORTANT: must come before /:id
router.get(
    "/admin/all",
    protect,
    authorize("admin"),
    getAllComplaints
);

router.patch(
    "/:id/verify",
    protect,
    authorize("admin"),
    verifyComplaint
);

router.patch(
    "/:id/assign",
    protect,
    authorize("admin"),
    assignComplaint
);

// Authenticated users can view a complaint
router.get(
    "/:id",
    protect,
    getComplaintById
);

// Officer status transitions
router.patch(
    "/:id/start",
    protect,
    authorize("officer"),
    startComplaint
);

router.patch(
    "/:id/resolve",
    protect,
    authorize("officer"),
    resolveComplaint
);

// Citizen status transition
router.patch(
    "/:id/close",
    protect,
    authorize("citizen"),
    closeComplaint
);

module.exports = router;