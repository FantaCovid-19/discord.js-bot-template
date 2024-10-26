/**
 * @typedef {Object} ContextType
 * @property {string} name - The name of the context menu
 * @property {string} description - The description of the context menu
 * @property {import('discord.js').ApplicationCommandType} type - The type of the context menu
 * @property {boolean} enabled - Whether the context menu is enabled or not
 * @property {boolean} ephemeral - Whether the response should be ephemeral or not
 * @property {import('discord.js').PermissionResolvable[]} [userPermissions] - The permissions required by the bot
 * @property {number} [cooldown=0] - The cooldown of the context menu
 * @property {function(import('discord.js').ContextMenuCommandInteraction)} execute - The function to execute the context menu
 */

/**
 * Placeholder for the context menu data
 * @type {ContextType}
 */
module.exports = {
  name: '',
  description: '',
  type: '',
  enabled: true,
  ephemeral: false,
  userPermissions: [],
  cooldown: 0,
  execute: (_interaction) => {
    throw new Error('execute function not implemented');
  },
};
