const { ApplicationCommandType } = require('discord.js');

/** @type {import('@types/ContextType')} */
module.exports = {
  name: 'hello',
  description: 'Say hello to a user',
  enabled: true,
  ephemeral: false,
  type: ApplicationCommandType.User,
  execute: async (interaction) => {
    const { targetId } = interaction;
    await interaction.reply(`Hello <@${targetId}>! How are you? 🤗`);
  },
};
