require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createOfficer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingOfficer = await User.findOne({
            email: "officer@sct.com"
        });

        if (existingOfficer) {
            console.log("Officer already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("Officer@12345", 10);

        await User.create({
            name: "Test Officer",
            email: "officer@sct.com",
            password: hashedPassword,
            role: "officer"
        });

        console.log("Officer created successfully");
    } catch (error) {
        console.error("Officer creation failed:", error.message);
    } finally {
        await mongoose.connection.close();
    }
};

createOfficer();