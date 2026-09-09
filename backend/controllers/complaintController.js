const User = require("../models/User");
const Complaint = require("../models/Complaint");

const createComplaint = async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            address
        } = req.body;

        const complaintId = `CMP-${Date.now()}`;

        const complaint = await Complaint.create({
            complaintId,
            title,
            category,
            description,
            address,
            citizenId: req.user.userId
        });

        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            citizenId: req.user.userId
        });

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getComplaintById = async (req, res) => {
    try {
        const query = {
            complaintId: req.params.id
        };

        if (req.user.role === "citizen") {
            query.citizenId = req.user.userId;
        }

        if (req.user.role === "officer") {
            query.officerId = req.user.userId;
        }

        const complaint = await Complaint.findOne(query);

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json(complaint);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findOneAndUpdate(
            { complaintId: req.params.id },
            req.body,
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json(complaint);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const deleteComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findOneAndDelete({
            complaintId: req.params.id
        });

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found"
            });
        }

        res.status(200).json({
            message: "Complaint deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const verifyComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findOneAndUpdate(
            {
                complaintId: req.params.id,
                status: "Submitted"
            },
            {
                status: "Verified"
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found or already verified"
            });
        }

        res.status(200).json({
            message: "Complaint verified successfully",
            complaint
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const assignComplaint = async (req, res) => {
    try {
        const { officerId } = req.body;

        if (!officerId) {
            return res.status(400).json({
                message: "Officer ID is required"
            });
        }

        const officer = await User.findOne({
            _id: officerId,
            role: "officer"
        });

        if (!officer) {
            return res.status(404).json({
                message: "Officer not found"
            });
        }

        const complaint = await Complaint.findOneAndUpdate(
            {
                complaintId: req.params.id,
                status: "Verified"
            },
            {
                officerId: officer._id,
                status: "Assigned"
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found or not ready for assignment"
            });
        }

        res.status(200).json({
            message: "Complaint assigned successfully",
            complaint
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getAssignedComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find({
            officerId: req.user.userId
        });

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const startComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findOneAndUpdate(
            {
                complaintId: req.params.id,
                officerId: req.user.userId,
                status: "Assigned"
            },
            {
                status: "In Progress"
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found or not assigned to you"
            });
        }

        res.status(200).json({
            message: "Complaint marked as in progress",
            complaint
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const resolveComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findOneAndUpdate(
            {
                complaintId: req.params.id,
                officerId: req.user.userId,
                status: "In Progress"
            },
            {
                status: "Resolved"
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found or not in progress"
            });
        }

        res.status(200).json({
            message: "Complaint resolved successfully",
            complaint
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const closeComplaint = async (req, res) => {
    try {
        const complaint = await Complaint.findOneAndUpdate(
            {
                complaintId: req.params.id,
                citizenId: req.user.userId,
                status: "Resolved"
            },
            {
                status: "Closed"
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!complaint) {
            return res.status(404).json({
                message: "Complaint not found or not ready to be closed"
            });
        }

        res.status(200).json({
            message: "Complaint closed successfully",
            complaint
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const getAllComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find()
            .sort({ createdAt: -1 });

        res.status(200).json(complaints);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createComplaint,
    getComplaints,
    getComplaintById,
    updateComplaint,
    deleteComplaint,
    verifyComplaint,
    assignComplaint,
    getAssignedComplaints,
    startComplaint,
    resolveComplaint,
    closeComplaint,
    getAllComplaints
};