const { Guild } = require("discord.js");

module.exports = {
    name: 'guildCreate',
    once: false,
    /**
     * Execute Event
     * @param {Guild} guild Guild
     */
    async run(guild) {
        guild.client.logger.info(` Bot Join Guild ${guild.name} - ${guild.id}`.yellow);
        require('../../util/RegisterSlashCommand')(guild.client, guild.id);
        guild.client.logger.blankline();
    }
}