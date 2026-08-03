const users = require("../data/users.json");

function getUserByLanId(lanId) {
    return users.users.find(
        user =>
            user.lanId.toUpperCase() === lanId.toUpperCase() &&
            user.enabled === true
    );
}

module.exports = {
    getUserByLanId
};