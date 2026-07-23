const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Welcome to CloudSphere API');
});

app.listen(PORT, () => {
    console.log(`CloudSphere server is running on port ${PORT}`);
});