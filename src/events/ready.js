const { Events } = require('discord.js');
const { log } = require('@helpers/Logger');

/** @type {import('@types/EventType')} */
module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    log(`Logged in as ${client.user.tag}`);
    log(`Bot is in ${client.guilds.cache.size} guilds`);
    log(`Bot is serving ${client.users.cache.size} users`);

    await client.registerInteractions();
  },
};
