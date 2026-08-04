const session = require("../data/session.json");
const authService = require("./authService");

function addMessage(speaker, message) {
    session.history.push({
        speaker,
        message
    });
}

function getHistory() {
    return session.history;
}

function getCurrentState() {
    return session.state;
}

function setCurrentState(state) {
    session.state = state;
}

function processMessage(prompt) {

    addMessage("user", prompt);

    if (session.state === "WAITING_FOR_COMMAND") {

        session.pendingCommand = prompt;
        session.state = "WAITING_FOR_LAN_ID";

        addMessage(
            "cloudsphere",
            "Please share your LAN ID for authentication."
        );

        return {
            status: "authentication_required",
            message: "Before we proceed further, could you please share your LAN ID for authentication?."
        };
    }

    if (session.state === "WAITING_FOR_LAN_ID") {

        const user = authService.getUserByLanId(prompt);

        if (!user) {

            addMessage(
                "cloudsphere",
                "Sorry, you are not authorized to access CloudSphere."
            );

            return {
                status: "unauthorized",
                message:
                    "Sorry, you are not authorized to access CloudSphere."
            };
        }

        session.authenticated = true;
        session.lanId = user.lanId;
        session.role = user.role;

        session.state = "AUTHENTICATED";

        addMessage(
            "cloudsphere",
            "Authentication successful."
        );

        return {
            status: "success",
            message: "Thank you.\n\nAuthentication successful.\n\nHow may I assist you today?"
        };
    }

    return {
        status: "success",
        message: "Thinking..."
    };
}

module.exports = {
    addMessage,
    getHistory,
    getCurrentState,
    setCurrentState,
    processMessage
};