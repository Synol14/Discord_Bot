const { Intents } = require('discord.js');
const DiscordBot = require("./structures/DiscordBot");
require('dotenv').config();
require('colors');

const client = new DiscordBot({
    /// Set Intents
    intents: [
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_MEMBERS
    ],
    allowedMentions: false,
    /// Set Presence
    presence: {
        status: 'online',
    }
});

client.build();

module.exports = client;