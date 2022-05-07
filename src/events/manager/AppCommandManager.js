const { Interaction } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    once: false,
    /**
     * Execute Event
     * @param {Interaction} interaction
     */
    async run(interaction) {

        /// Get Name
        const { commandName, options } = interaction;

        /// Geting command
        const command = interaction.client.commands.get(commandName);
        
        /// Execute
        let state = 'SUCCESS'
        if (!command) {
            //--> Can send message
            state = 'FAIL (No Done)';
        }
        else {
            try {
                if (command.defer) await interaction.deferReply({ ephemeral: command.ephemeral });
                await command.run(interaction.client, interaction, options);
                //--> Can send message
            } catch (error) {
                console.error(error);
                //--> Can send message
                state = `FAIL ( ${error} )`;
            } finally {
                /// Log Command
                interaction.client.logger.logAppCmd(interaction, state);
            }
        }
    }
}