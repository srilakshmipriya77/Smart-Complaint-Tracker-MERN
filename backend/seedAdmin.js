require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const existingAdmin = await User.findOne({
            role: "admin"
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash("Admin@12345", 10);

        await User.create({
            name: "System Admin",
            email: "admin@sct.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully");
    } catch (error) {
        console.error("Admin creation failed:", error.message);
    } finally {
        await mongoose.connection.close();
    }
};

createAdmin();