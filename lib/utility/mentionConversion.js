const iDToPreferred = require('./idToPrefered')



function replaceWithUser(content, client) {
    let newString;
    let match = content.match(/<@..................>/s)
    if (match) {
        return replaceWithUser(`
        ${content.split(match[0]).join("<b class='mention'> @" 
        + iDToPreferred(client.users.cache.get(match[0].slice(2,-1)).id,
        client.users.cache.get(match[0].slice(2,-1)).tag) 
        + "</b>") }`)
    } else {
        return content;
    }
}

module.exports = replaceWithUser;