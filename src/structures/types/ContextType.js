/**
 * @typedef {import('discord.js').ApplicationCommandType} ApplicationCommandType
 */

/**
 * @typedef {import('discord.js').PermissionResolvable[]} PermissionResolvable
 */

/**
 * @callback ContextExecuteFunction
 * @param {import('discord.js').ContextMenuCommandInteraction} _interaction - The interaction object
 * @returns {void}
 */

/**
 * @typedef {Object} ContextType
 * @property {String} name - The name of the context menu
 * @property {String} description - The description of the context menu
 * @property {ApplicationCommandType} type - The type of the context menu
 * @property {Boolean} enabled - Whether the context menu is enabled or not
 * @property {Boolean} ephemeral - Whether the response should be ephemeral or not
 * @property {PermissionResolvable} [userPermissions] - The permissions required by the bot
 * @property {Number} [cooldown] - The cooldown of the context menu
 * @property {ContextExecuteFunction} execute - The function to execute the context menu
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
