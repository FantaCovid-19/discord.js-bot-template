/** @type {import('@types/CommandType')} */
module.exports = {
  name: 'ping',
  description: 'shows the current ping from the bot to the discord servers',
  cooldown: 5,
  category: 'INFO',
  command: {
    enabled: true,
    aliases: ['pong'],
  },
  slashCommand: {
    enabled: true,
    ephemeral: true,
  },

  async messageExecute(message) {
    await message.reply(`🏓 Pong : \`${Math.floor(message.client.ws.ping)}ms\``);
  },

  async interactionExecute(interaction) {
    await interaction.reply(`🏓 Pong : \`${Math.floor(interaction.client.ws.ping)}ms\``);
  },
};
