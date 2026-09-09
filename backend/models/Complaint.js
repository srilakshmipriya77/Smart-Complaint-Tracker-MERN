const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
    {
        complaintId: {
            type: String,
            required: true,
            unique: true,
            immutable: true
        },

        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 100
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 10,
            maxlength: 1000
        },

        address: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 300
        },

        status: {
            type: String,
            enum: [
                "Submitted",
                "Verified",
                "Assigned",
                "In Progress",
                "Resolved",
                "Closed"
            ],
            default: "Submitted"
        },

        citizenId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            immutable: true
        },

        officerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        }
    },
    {
        timestamps: true
    }
);
complaintSchema.index({ citizenId: 1 });
complaintSchema.index({ officerId: 1 });
complaintSchema.index({ status: 1 });
const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;