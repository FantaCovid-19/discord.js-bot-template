/**
 * @typedef {import('discord.js').Events} EventType
 * @typedef {import('discord.js').ClientEvents} ClientEventType
 */

/**
 * @callback EventExecuteFunction
 * @param {import('@structures/BotClient')} _client - The client object
 * @param  {[...*] | any} _args - Additional arguments
 * @returns {void}
 */

/**
 * @typedef {Object} EventData
 * @property {EventType} name - The name of the event.
 * @property {Boolean} enabled - Whether the event is enabled or not.
 * @property {Boolean} once - Whether the event should only be executed once.
 * @property {EventExecuteFunction} execute - The function to execute when the event is triggered.
 */

/**
 * Placeholder for the event data
 * @type {EventData}
 */
module.exports = {
  name: '',
  enabled: true,
  once: false,
  execute: async (_client, ..._args) => {
    throw new Error('execute function not implemented');
  },
};
