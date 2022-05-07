const { Client, CommandInteractionOptionResolver, CommandInteraction } = require("discord.js")

module.exports = {
    name: 'test',
    type: 1, // 1(CHAT_INPUT), [ 2(USER), 3(MESSAGE) ]-> no descrption and no options
    description: 'Test Command',
    defer: true,
    ephemeral: true,
    default_permission: false, // Only Admin can use it
    options: [
        {
            name: "arg",
            description: "Main Argument",
            type: 3, // String Type
            required: true
        },
        {
            name: "optional",
            description: "Optional Argument",
            type: 4, // Integer Type
            required: false
        }
    ],
    /**
     * Run Method for Slash Command Interaction
     * @param {Client} client Bot Client
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {CommandInteractionOptionResolver} options Application Command Options
     */
    run: async function(client, interaction, options) {
        let message = options.getString('arg');
        if (options.getInteger('optional')) message += " -> " + options.getInteger('optional')
        interaction.editReply("message");
    }
}