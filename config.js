const userPreferences = {
    "1168045766770696193":"entrpix",
    "366312087317774336": "walkeast",
    "247349845298249728": "flowergirl",
    "578375908247863296":"riotboy",
    "927240253272645662":"coalforchristmas",
    "988511127979843706 ": "firefly",
    "725902788059594853": "crypto",
    "1191137445765451876": "mark",
    "1006048734708240434": "pepperjack"
}; // Discord IDs -> Usernames (Ex. Discord ID 1168045766770696193 will show up as Entrpix)

const httpPort = 3001; // Server Port
const frontend = "public"; // Frontend Directory

const token = ""; // Discord Token
const groupDM_ID = "1078485480439550023"; // Group DM ID

const disc_status = "dnd" // dnd (Do Not Distrub), Online, Idle, Ivisible | Discord Status
const disc_activity = "SafeWord Bridge" // Discord Activity
const disc_activity_status = "PLAYING" // PLAYING, LISTENING, WATCHING, STREAMING | Discord Activity Status

module.exports = userPreferences, httpPort, frontend, token, groupDM_ID, disc_status, disc_activity, disc_activity_status;
