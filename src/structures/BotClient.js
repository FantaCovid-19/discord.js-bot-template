const { Client, Collection, GatewayIntentBits, Partials, ApplicationCommandType } = require('discord.js');

const Events = require('./Event');
const Commands = require('./Command');
const Context = require('./Context');
const { log, error } = require('@helpers/Logger');
const config = require('@config');

const { Guilds, GuildMessages, MessageContent, GuildInvites, GuildMembers, GuildPresences, GuildMessageReactions, GuildVoiceStates } =
  GatewayIntentBits;
const { User, Message, Reaction } = Partials;

module.exports = class BotClient extends Client {
  constructor() {
    super({
      intents: [Guilds, GuildMessages, MessageContent, GuildInvites, GuildMembers, GuildPresences, GuildMessageReactions, GuildVoiceStates],
      partials: [User, Message, Reaction],
      allowedMentions: { repliedUser: false },
      restRequestTimeout: 20000,
    });

    this.wait = require('util').promisify(setTimeout);

    /** @type {import('@types/ConfigType')} */
    this.config = config;

    /** @type {import('@types/CommandType')[]} */
    this.commands = [];
    this.commandIndex = new Collection();

    /** @type {Collection<string, import('@types/CommandType')>} */
    this.slashCommands = new Collection();

    /** @type {Collection<string, import('@types/ContextType')>} */
    this.contextMenus = new Collection();

    this.eventLoader = new Events(this);
    this.commandLoader = new Commands(this);
    this.contextLoader = new Context(this);
  }

  /**
   * Initialize the bot
   */
  async initialize() {
    this.eventLoader.loadEvents();
    this.commandLoader.loadFileCommands();
    this.contextLoader.loadFileContexts();

    this.login(process.env.DISCORD_TOKEN);
  }

  /**
   * Find command by name or alias
   * @param {string} invoke
   * @returns {import('@types/CommandType')|undefined}
   */
  getCommands(invoke) {
    const index = this.commandIndex.get(invoke.toLowerCase());
    return index !== undefined ? this.commands[index] : undefined;
  }

  /**
   * Register interactions in the bot
   * @param {string} [guildId]
   */
  async registerInteractions(guildId) {
    const toRegister = [];

    this.slashCommands
      .map((cmd) => ({
        name: cmd.name,
        description: cmd.description,
        type: ApplicationCommandType.ChatInput,
        options: cmd.slashCommand.options,
      }))
      .forEach((cmd) => toRegister.push(cmd));

    this.contextMenus
      .map((ctx) => ({
        name: ctx.name,
        type: ctx.type,
      }))
      .forEach((ctx) => toRegister.push(ctx));

    if (!guildId) {
      await this.application.commands.set(toRegister);
    } else if (guildId && typeof guildId === 'string') {
      const guild = await this.guilds.cache.get(guildId);

      if (!guild) return error(`Failed to register interactions in guild ${guildId}`, new Error('No matching guild'));

      await guild.commands.set(toRegister);
    } else {
      throw new Error('Did you provide a valid guildId to register interactions');
    }

    log('Successfully registered interactions');
  }
};
