const { Events } = require('discord.js');
const { warn } = require('@helpers/Logger');

/**
 * @type {import('@types/EventType')}
 */
module.exports = {
  name: Events.Warn,
  enabled: true,
  once: false,
  execute: async (_client, info) => {
    warn('A warning occurred:', info);
  },
};
