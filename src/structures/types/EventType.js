/**
 * @typedef {Object} EventData
 * @property {import('discord.js').Events} name - The name of the event.
 * @property {boolean} enabled - Whether the event is enabled or not.
 * @property {boolean} once - Whether the event should only be executed once.
 * @property {function(import('@src/structures').BotClient, ...*): void} execute - The function to execute when the event is triggered.
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
