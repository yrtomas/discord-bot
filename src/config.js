require('dotenv').config();

module.exports = {
    token: process.env.DISCORD_TOKEN,
    port: process.env.PORT || 3000,
};
