const { handlerPrefixCommand } = require('@handlers/Commands');
const { Events } = require('discord.js');

/** @type {import('@types/EventType')} */
module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute: async (client, message) => {
    if (!message.guild || message.author.bot) return;

    let isCommand = false;
    const prefix = client.config.PrefixCommand.defaultPrefix;
    if (true) {
      if (message.content.includes(`${client.user.id}`)) {
        message.channel.safeSend(`> My prefix is \`${prefix}\``);
      }

      if (message.content && message.content.startsWith(prefix)) {
        const invoke = message.content.replace(prefix, '').split(/\s+/)[0];
        const cmd = client.getCommands(invoke);

        if (cmd) {
          isCommand = true;
          handlerPrefixCommand(message, cmd, {});
        }
      }
    }
  },
};
