const express = require('express');
const router = express.Router();

const adminController = require("../controllers/admin.controller")

router.post('/admin/signin',adminController.handleAdminLogin);

module.exports = router;