const express = require("express");
const authService = require("../services/authService");
const session = require("../data/session.json");
const conversationService = require("../services/conversationService");

const router = express.Router();

router.post("/", (req, res) => {

    const prompt = req.body.prompt;
    conversationService.addMessage("user", prompt);
    session.pendingCommand = prompt;
    const user = authService.getUserByLanId(prompt);

    if (!session.authenticated) {
        
        conversationService.addMessage(
    "cloudsphere",
    "Please provide your LAN ID."
);

    return res.json({
        status: "authentication_required",
        message: "Please provide your LAN ID."
    });
}

    if (!user) {
    return res.json({
        status: "failed",
        message: "Invalid LAN ID"
    });
}

res.json({
    status: "success",
    message: `Welcome ${user.lanId}`,
    role: user.role
});
});

router.get("/", (req, res) => {
    res.json({
        layer: "API Gateway Router",
        status: "success",
        message: "CloudSphere Gateway Online"
    });
});

module.exports = router;