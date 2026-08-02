const express = require('express');
const cors = require('cors');
const commandRoutes = require("./routes/commandRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/command", commandRoutes);

app.get('/', (req, res) => {
    res.send('CloudSphere API is running');
});

app.post('/api/command', (req, res) => {

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({
            success: false,
            message: 'Prompt is required'
        });
    }

    res.json({
        success: true,
        response: `CloudSphere received: ${prompt}`
    });

});

app.listen(PORT, () => {
    console.log(`CloudSphere server is running on port ${PORT}`);
});
