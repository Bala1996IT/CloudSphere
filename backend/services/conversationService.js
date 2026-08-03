const session = require("../data/session.json");

function addMessage(speaker, message) {
    session.history.push({
        speaker,
        message
    });
}

function getHistory() {
    return session.history;
}

module.exports = {
    addMessage,
    getHistory
};