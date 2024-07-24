
const userModel = require("../models/user.model");

const apiError = require("../utils/apiError");
const apiResponse = require("../utils/apiResponse");
const msgToCode = require("../utils/serverPhraseToCode");

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET



function handleAuth(req, res) {
    return res.status(msgToCode.Bad_Gateway).json(new apiResponse({}, "working"));
}




async function handleSignUp(req, res) {

    try {
        // checking data 
        const { email, password, name, address, number } = req.body;
        if (!(email && password && name && address && number)) {
            return res.status(msgToCode.Bad_Request).json(new apiError({}, "Missing data"));
        }

        // existing user check
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            let name = existingUser.name;
            let number = existingUser.number;
            return res.status(409).json(new apiError({ user: existingUser }, "Existing Email"));
        }

        // creating new user 
        let newUser = await userModel.create({ email, password, number, name, address });
        let newUserId = newUser.id;
        let newUserEmail = newUser.email;
        let token = jwt.sign({ id: newUserId, email: newUserEmail }, JWT_SECRET);
        return res.status(200).json(new apiResponse({ newUser, token }, "New User Created"));

    } catch (error) {
        // console.log(error);
        return res.json(new apiError({ error }, "Unknown Server Error"));
    }

}


async function handleSignIn(req, res) {

    try {
        // checking data 
        const { email, password } = req.body;
        if (!(email && password)) {
            return res.status(msgToCode.Bad_Request).json(new apiError({}, "Missing data"));
        }

        // checking username and password
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            let UserEmail = existingUser.name;
            let UserPassword = existingUser.password;
            if (UserPassword == password) {
                let UserId = existingUser.id;
                let token = jwt.sign({ id: UserId, email: UserEmail }, JWT_SECRET);
                return res.status(200).json(new apiError({ user: existingUser, token }, "Password Verified"));
            } else {
                return res.status(200).json(new apiError({ user: existingUser }, "Password Incorrect"));
            }
        }

        // user does not exists 
        return res.status(409).json(new apiResponse({}, "User not exists"));

    } catch (error) {
        console.log(error);
        return res.json(new apiError({ error }, "Unknown Server Error"));
    }
}


// function handleSignOut(req, res) {
//     let response = new Response(null, { status: "ok" }, "working", 200);
//     return response.sendResponse(res);
// }

module.exports = { handleAuth, handleSignUp , handleSignIn };
