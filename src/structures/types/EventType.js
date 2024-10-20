/**
 * @typedef {Object} EventType
 * @property {string} name - The name of the event.
 * @property {boolean} enabled - Whether the event is enabled or not.
 * @property {boolean} once - Whether the event should only be executed once
 * @property {function(import('@structures/BotClient').BotClient, ...*)} execute - The function to execute the event.
 */

/**
 * Placeholder for the event data
 * @type {EventType}
 */
module.exports = {
  name: '',
  enabled: true,
  once: false,
  async execute(_client, ..._args) {
    throw new Error('execute function not implemented');
  },
};
