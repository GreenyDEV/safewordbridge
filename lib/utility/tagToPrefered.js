const userPreferences = require('../../config')

function tagToPreferred(message) {
    return userPreferences[message.author.id] || message.author.tag; // Return preferred name or original tag if not found
}

module.exports = tagToPreferred
