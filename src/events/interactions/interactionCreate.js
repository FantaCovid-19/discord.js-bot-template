const { Events } = require('discord.js');
const { handlerSlashCommmand } = require('@handlers/Commands');
const { handlerContextMenu } = require('@handlers/Contexts');

/** @type {import('@types/EventType')} */
module.exports = {
  name: Events.InteractionCreate,
  enabled: true,
  once: false,
  execute: async (client, interaction) => {
    if (interaction.isChatInputCommand()) {
      await handlerSlashCommmand(interaction);
    } else if (interaction.isContextMenuCommand()) {
      const ctx = client.contextMenus.get(interaction.commandName);

      if (ctx) {
        await handlerContextMenu(interaction, ctx);
      } else {
        interaction.reply({ content: 'This context menu is not available', ephemeral: true });
      }
    }
  },
};
