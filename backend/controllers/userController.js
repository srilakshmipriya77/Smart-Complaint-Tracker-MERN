const User=require("../models/User");

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const getOfficers = async (req, res) => {
    try {
        const officers = await User.find(
            { role: "officer" },
            {
                name: 1,
                email: 1,
                role: 1
            }
        );

        res.status(200).json(officers);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    createUser,
    getOfficers
};