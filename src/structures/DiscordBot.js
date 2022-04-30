const { Client, Collection } = require('discord.js');
const Logger = require("./Logger");
const { readdirSync } = require('fs');
const path = require("path");
const Jsoning = require("jsoning");

class DiscordBot extends Client {

    constructor(props) {
        super(props);

        this.commands = new Collection();
        this.database = {
            guilds: new Jsoning('.database/guilds.json') // For example
        }
        this.logger = new Logger('.logs/all.log');

        if (process.env.BOT_TOKEN == "")
            return new TypeError('The botconfig.js is not filled out. Please make sure nothing is blank, otherwise the bot will not work properly.'.red);

        this.loadCommands();
        this.loadEvents();
    }

    loadCommands() {
        this.logger.blankLine().info('   << Commands Loading ... >>'.bold.yellow);
        const dir = path.join(__dirname, "..", "commands");
        this.commands.clear();
        readdirSync(dir).forEach(dirs => {
            const commands = readdirSync(`${dir}/${dirs}/`).filter(files => files.endsWith('.js'));
            for (const file of commands) {
                const cmd = require(`${dir}/${dirs}/${file}`);
                if (!cmd.name || !cmd.description || !cmd.run)
                    return this.log(`Unable to load Command: ${file.split(".")[0]}, Reason: File doesn't had run/name/desciption`);
                this.commands.set(cmd.name.toLowerCase(), cmd)
                this.logger.info(`-> Command loaded: ${cmd.name}`);
            }
        });
        this.registerSlashCommands();
    }

    loadEvents() {
        this.logger.blankLine().info('   << Events Loading ... >>'.bold.yellow);
        const dir = path.join(__dirname, "..", "events");
        readdirSync(dir).forEach(dirs => {
            const eventFiles = readdirSync(`${dir}/${dirs}/`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event = require(`${dir}/${dirs}/${file}`);
                if (!event.name || !event.run)
                    return this.log(`Unable to load Event: ${file.split(".")[0]}, Reason: File doesn't had run/name`);
                if (event.once) {
                    this.once(event.name, (...args) => event.run(...args));
                } else {
                    this.on(event.name, (...args) => event.run(...args));
                }
                this.logger.info(`-> Event loaded: ${event.name} - ${file}`);
            }
        });
        this.logger.blankLine();
    }

    sendError(channel, error) {
        let embed = new MessageEmbed()
            .setTitle("An error occured")
            .setColor("RED")
            .setDescription(error)
            .setFooter("If you think this as a bug, please report it in the support server!");

        channel.send(embed);
    }

    build() {
        this.login(process.env.BOT_TOKEN);
        // And other parameters of your application
    }

    registerSlashCommands() {
        this.logger.blankLine().info('   << Slash Commands Posting ... >>'.bold.yellow).info('-> Posting started ...'.italic.gray);
        this.guilds.fetch().then( (guilds) => {
            guilds.map((guild) => require("../util/RegisterSlashCommand")(this, guild.id));
        })
    }

}

module.exports = DiscordBot;