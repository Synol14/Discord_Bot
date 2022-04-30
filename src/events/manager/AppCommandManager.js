const { Interaction } = require("discord.js");
//const { getEmbed, embedReply } = require("../../structures/Utils");

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * Execute Event
     * @param {Interaction} interaction
     */
    async run(interaction) {
        /// Quit if not a command
        if (!interaction.isCommand()) return;

        /// Get Data
        const { commandName, options } = interaction;

        /// Geting command
        const command = interaction.client.commands.get(commandName);
        
        /// Execute
        let state = 'SUCCESS'
        if (!command) {
            //await embedReply(interaction, getEmbed('Command no Done !', process.env.RED), true, true);
            state = 'FAIL (No Done)';
        }
        else {
            try {
                if (command.defer) await interaction.deferReply({ ephemeral: command.ephemeral });
                await command.run(interaction.client, interaction, options);
            } catch (error) {
                console.error(error);
                //await embedReply(interaction, getEmbed('Command Error !', process.env.RED), true, true);
                state = `FAIL ( ${error} )`;
            } finally {
                /// Log Command
                interaction.client.logger.logAppCmd(interaction, state);
            }
        }
    }
}