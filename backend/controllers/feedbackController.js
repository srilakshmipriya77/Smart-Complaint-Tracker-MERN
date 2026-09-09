const Feedback = require("../models/Feedback");
const Complaint = require("../models/Complaint");

const createFeedback = async (req, res) => {
    try {
        const { complaintId, rating, comment } = req.body;

        const complaint = await Complaint.findOne({
            complaintId,
            citizenId: req.user.userId,
            status: "Closed"
        });

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found or not closed"
            });
        }

        const existingFeedback = await Feedback.findOne({
            complaintId
        });

        if (existingFeedback) {
            return res.status(400).json({
                message: "Feedback already submitted"
            });
        }

        const feedback = await Feedback.create({
            complaintId,
            citizenId: req.user.userId,
            rating,
            comment
        });

        res.status(201).json({
            message: "Feedback submitted successfully",
            feedback
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

const getFeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find()
            .populate("citizenId", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createFeedback,
    getFeedback
};