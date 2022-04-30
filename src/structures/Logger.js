const { CommandInteraction, Interaction } = require("discord.js");

class Logger {

    constructor() {

    }

    log(message) { return this.info(message); }
    
    info(message) {
        console.log('['+'Info'.blue+`] ${message}`);
        return this;
    }

    error(message) {
        console.error('['+'Error'.red+`] ${message}`);
        return this;
    }

    blankLine() {
        console.log(' ');
        return this;
    }

    /**
     * Log an Interaction Info
     * @param {Interaction} interaction Application Command Interaction
     * @param {String} message Message to log
     */
    infoInteraction(interaction, message) {
        this.info(`[${interaction.id}]`.grey +` ${message}`);
        return this;
    }

    /**
    * Log an Interaction Error
    * @param {Interaction} interaction Application Command Interaction
    * @param {String} message Message to log
    */
    errorInteraction(interaction, message) {
        this.error(`[${interaction.id}]`.grey +` ${message}`);
        return this;
    }

    /**
     * Log an App Command Info
     * @param {CommandInteraction} interaction Application Command Interaction
     * @param {String} state Executiung state of command
     */
    logAppCmd(interaction, state) {
        const msg = '['+`App_Cmd - ${interaction.commandId}`.magenta +`]  The \'${interaction.commandName}\' command has been use with  ${state}`;
        if (state.startsWith('SUCCES')) this.infoInteraction(interaction, msg);
        else this.errorInteraction(interaction, msg);
        return this;
    }
    
}

module.exports = Logger;