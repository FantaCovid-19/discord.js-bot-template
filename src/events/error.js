const { Events } = require('discord.js');
const { error } = require('@helpers/Logger');

/**
 * @type {import('@types/EventType')}
 */
module.exports = {
  name: Events.Error,
  enabled: true,
  once: false,
  execute: async (_client, err) => {
    error('An error occurred:', err);
  },
};
