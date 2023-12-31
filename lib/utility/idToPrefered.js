const userPreferences = require('../../config/preferedNames')

function iDToPreferred(id, tag) {

    return userPreferences[id] || tag; // Return preferred name or original tag if not found
}

module.exports = iDToPreferred