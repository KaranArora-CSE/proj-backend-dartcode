const adminModel = require("../models/admin.model");
const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");


const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET


async function handleAdminLogin(req, res) {
    // ({adminCode:"97324",adminName:"admin-karan"})
    const { adminName, adminCode } = req.body;
    const admin = await adminModel.findOne({ adminName });

    if (!admin) return res.status(200).json(new apiError({}, "admin not found"));
    if (admin.adminName != adminName) return res.status(200).json(new apiError({}, "admin name incorrect"));
    if (admin.adminCode != adminCode) return res.status(200).json(new apiError({}, "admin code incorrect"));

    admin.adminCode = null;
    const date = Date.now();
    await adminModel.findOneAndUpdate({ adminName, adminCode }, { lastLogin: date });

    let token = jwt.sign({ id: admin.id, name: admin.adminName }, JWT_SECRET);
    return res.status(200).json(new apiResponse({ admin, token }, "verified as admin"));
}

module.exports = { handleAdminLogin };