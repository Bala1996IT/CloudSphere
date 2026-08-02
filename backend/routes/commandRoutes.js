const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    res.json({
        layer: "API Gateway Router",
        status: "success",
        message: "Command received"
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