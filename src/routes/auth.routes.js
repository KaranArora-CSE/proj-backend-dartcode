const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth.controller');

router.get('/auth/working',AuthController.handleAuth);
router.post('/auth/signup',AuthController.handleSignUp);
router.post('/auth/signin',AuthController.handleSignIn);
// router.get('/auth/signout',AuthController.handleSignOut);

// general user routes
// router.route("/login").post(loginUSer)     
// router.route("/logout").post(verifyJwt ,logoutUser)
// router.route("/refreshToken").post(refreshAccessToken)  
// router.route("/change-password").post(verifyJwt,changeCurrentPassword)
// router.route("/current-user").get(verifyJwt ,getCurrentUser)
// router.route("/update-account").patch(verifyJwt,UpdateAccountDetails)
// router.route("/update-avatar").patch(verifyJwt,upload.single("avatar"),updateAvatar)
// router.route("/update-coverimage").patch(verifyJwt,upload.single("coverimage"),updateUserCoverImage)
// router.route("/c/:username").get(verifyJwt,getUserChannelProfile)
// router.route("/watchHistory").get(verifyJwt,getWatchHistory)
// router.route("/forgot-password").post(forgotPassword)

module.exports = router;