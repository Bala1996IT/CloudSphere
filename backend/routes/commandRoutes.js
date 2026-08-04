const express = require("express");
const conversationService = require("../services/conversationService");

const router = express.Router();

router.post("/", (req, res) => {

    const prompt = req.body.prompt;

    const result = conversationService.processMessage(prompt);

    return res.json(result);

});

router.get("/", (req, res) => {
    res.json({
        layer: "API Gateway Router",
        status: "success",
        message: "CloudSphere Gateway Online"
    });
});

module.exports = router;