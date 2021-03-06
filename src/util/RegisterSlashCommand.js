const { Client } = require("discord.js");
const { readdirSync } = require("fs");
const path = require("path");
const https = require('https');

/**
 * Register slash commands for a guild
 * @param {Client} client
 * @param {string} guildId
 */
module.exports = (client, guildId) => {
  client.logger.info(`-> Registering slash commands for Guild ${guildId}`.italic);
  const dir = path.join(__dirname, "..", "commands");
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
    commands.forEach(async (file) => {
      const cmd = require(`${dir}/${dirs}/${file}`);
      if (!cmd.name || !cmd.run) return;

      const dataStuff = {
        name: cmd.name,
        type: cmd.type ? cmd.type : 1,
        description: cmd.description,
        options: cmd.options,
        default_permission: cmd.default_permission,
      };

      let clientAPI = client.api.applications(process.env.APPLICATION_ID);
      let guildAPI = clientAPI.guilds(guildId);

      client.logger.info('['+'Slash Command'.magenta +']: ['+'POST'.cyan +'] '+`Guild ${guildId}, Command: ${dataStuff.name}`);
      try {
        await guildAPI.commands.post({ data: dataStuff });
      } catch (err) {
        client.logger.error('['+'Slash Command'.magenta +']: ['+'POST-FAILED'.red +'] '+`Guild ${guildId}, Command: ${cmd.name} \n-->  ${err}`);
        console.log(err);
      }
    });
  });
}