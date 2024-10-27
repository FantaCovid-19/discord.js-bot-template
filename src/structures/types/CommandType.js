/**
 * @typedef {Object} SubCommand
 * @property {String} trigger - The name of the subcommand
 * @property {String} description - The description of the subcommand
 */

/**
 * @typedef {'NONE' | 'ADMIN' | 'FUN' | 'INFO' | 'MODERATION' | 'MUSIC' | 'UTILITY' | 'OWNER'} CommandCategory
 */

/**
 * @typedef {import('discord.js').PermissionResolvable[]} PermissionResolvable
 */

/**
 * @typedef {Object} InteractionInfo
 * @property {Boolean} enabled - Whether the command is enabled or not
 * @property {Boolean} ephemeral - Whether the response should be ephemeral or not
 * @property {import('discord.js').ApplicationCommandOptionData[]} options - The options for the slash command
 */

/**
 * @typedef {Object} CommandInfo
 * @property {Boolean} enabled - Whether the command is enabled or not
 * @property {String[]} [aliases] - The aliases for the command
 * @property {String} [usage] - The usage of the command
 * @property {Number} [minArgsCount] - The minimum number of arguments required
 * @property {SubCommand[]} [subCommands] - The subcommands for the command
 */

/**
 * @callback MessageExecuteFunction
 * @param {import('discord.js').Message} _message - The message object
 * @param {String[]} _args - The arguments provided by the user
 * @param {Object} _data - Additional data
 * @returns {void}
 */

/**
 * @callback InteractionExecuteFunction
 * @param {import('discord.js').ChatInputCommandInteraction} _interaction - The interaction object
 * @param {Object} _data - Additional data
 * @returns {void}
 */

/**
 * @typedef {Object} CommandData
 * @property {String} name - The name of the command
 * @property {String} description - The description of the command
 * @property {Number} cooldown - The cooldown of the command
 * @property {CommandCategory} category - The category of the command
 * @property {PermissionResolvable[]} [botPermissions] - The permissions required by the bot
 * @property {PermissionResolvable[]} [userPermissions] - The permissions required by the user
 * @property {CommandInfo} command - The command info
 * @property {InteractionInfo} slashCommand - The slash command info
 * @property {MessageExecuteFunction} messageExecute - The function to execute the command
 * @property {InteractionExecuteFunction} interactionExecute - The function to execute the slash command
 */

/**
 * Placeholder for the command data
 * @type {CommandData}
 */
module.exports = {
  name: '',
  description: '',
  cooldown: 0,
  category: '',
  botPermissions: [],
  userPermissions: [],
  command: {
    enabled: true,
    aliases: [],
    usage: '',
    minArgsCount: 0,
    subCommands: [],
  },
  slashCommand: {
    enabled: true,
    ephemeral: false,
    options: [],
  },
  messageExecute: (_message, _args, _data) => {
    throw new Error('messageExecute function not implemented');
  },
  interactionExecute: (_interaction, _data) => {
    throw new Error('interactionExecute function not implemented');
  },
};
