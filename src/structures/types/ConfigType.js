/**
 * @typedef {Object} PresenceType
 * @property {Boolean} enabled - Whether the presence is enabled or not
 * @property {String} activity - The activity of the bot
 * @property {import('discord.js').ActivityType} type - The type of the activity
 * @property {import('discord.js').PresenceUpdateStatus} status - The status of the bot
 * @property {String} [name] - The name of the activity
 * @property {String} [url] - The url of the activity
 */

/**
 * @typedef {Object} InteractionType
 * @property {Boolean} SlashCommands - Whether the slash commands are enabled or not
 * @property {Boolean} ContextMenu - Whether the context menu are enabled or not
 * @property {Boolean} GlobalRegister - Whether the slash commands are registered globally or not
 * @property {String[]} GuildRegister - Whether the slash commands are registered in the guild or not
 */

/**
 * @typedef {Object} PrefixCommandType
 * @property {Boolean} enabled - The default prefix for the bot
 * @property {String} defaultPrefix - The default prefix for the bot
 */

/**
 * @typedef {Object} ConfigType
 * @property {Array<String>} OwnerID - List of owner's user id
 * @property {String} SupportServer - The support server invite link
 * @property {PrefixCommandType} PrefixCommand - The prefix command configuration
 * @property {InteractionType} Interaction - The interaction configuration
 * @property {PresenceType} Presence - The presence configuration
 */

/**
 * Placeholder for the configuration data
 * @type {ConfigType}
 */
module.exports = {
  OwnerID: [],
  SupportServer: '',
  PrefixCommand: {
    enabled: true,
    defaultPrefix: '!',
  },
  Interaction: {
    SlashCommands: true,
    ContextMenu: true,
    GlobalRegister: true,
    GuildRegister: [],
  },
  Presence: {
    enabled: true,
    activity: '',
    type: '',
    status: '',
    name: '',
    url: '',
  },
};
