/**
 * @typedef {Object} SubCommand
 * @property {string} trigger - The name of the subcommand
 * @property {string} description - The description of the subcommand
 */

/**
 * @typedef {"NONE"|"ADMIN"|"FUN"|"INFO"|"MODERATION"|"MUSIC"|"UTILITY"} CommandCategory
 */

/**
 * @typedef {Object} InteractionInfo
 * @property {boolean} enabled - Whether the command is enabled or not
 * @property {boolean} ephemeral - Whether the response should be ephemeral or not
 * @property {import('discord.js').ApplicationCommandOptionData[]} options - The options for the slash command
 */

/**
 * @typedef {Object} CommandInfo
 * @property {boolean} enabled - Whether the command is enabled or not
 * @property {string[]} [aliases] - The aliases for the command
 * @property {string} [usage=""] - The usage of the command
 * @property {number} [minArgsCount=0] - The minimum number of arguments required
 * @property {SubCommand[]} [subCommands=[]] - The subcommands for the command
 */

/**
 * @typedef {Object} CommandData
 * @property {string} name - The name of the command
 * @property {string} description - The description of the command
 * @property {number} cooldown - The cooldown of the command
 * @property {CommandCategory} category - The category of the command
 * @property {import('discord.js').PermissionResolvable[]} [botPermissions] - The permissions required by the bot
 * @property {import('discord.js').PermissionResolvable[]} [userPermissions] - The permissions required by the user
 * @property {CommandInfo} command - The command info
 * @property {InteractionInfo} slashCommand - The slash command info
 * @property {function(import('discord.js').Message, string[], object)} messageExecute - The function to execute the command
 * @property {function(import('discord.js').ChatInputCommandInteraction, object)} interactionExecute - The function to execute the slash command
 */

/**
 * Placeholder for the command data
 * @type {CommandData}
 */
module.exports = {
  name: '',
  description: '',
  cooldown: 0,
  category: 'NONE',
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
