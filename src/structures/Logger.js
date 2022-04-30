const { CommandInteraction, Interaction } = require("discord.js");
const winston = require("winston");

const pattern = new RegExp(/.(\[)([0-9]+)m/g);
 
class Logger {

    constructor(file) {
        this.file = file;
        this.winstonLogger = winston.createLogger({
            format: winston.format.combine(
                
                winston.format.simple()
              ),
            transports: [new winston.transports.File({ filename: this.file })],
          });
        this.winstonLogger.log('', '\n\n');
        this.date = new Date();
    }

    getTime() {
        return `${this.date.getHours()}:${this.date.getMinutes()} - ${this.date.getDate()}/${this.date.getMonth()}/${this.date.getFullYear()}`;
    }

    log(message) { return this.info(message); }
    
    info(message) {
        console.log('['+'Info'.blue+`] ${message}`);
        this.winstonLogger.log({
            level: "info",
            message: `${this.getTime()} | [Info]: ${message.replace(pattern, '')}`,
          });
        return this;
    }

    error(message) {
        console.error('['+'Error'.red+`] ${message}`);
        this.winstonLogger.log({
            level: 'error',
            message: `${this.getTime()} | [Error]: ${message.replace(pattern, '')}`,
          });
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