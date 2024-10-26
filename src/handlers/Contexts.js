const { error } = require('@helpers/Logger');

const cooldownCache = new Map();

module.exports = {
  /**
   * Handle the context menu execution for the context menu command.
   * @param {import('discord.js').ContextMenuCommandInteraction} interaction
   * @param {import('@types/ContextType')} ctx
   * @returns {Promise<void>}
   */
  handlerContextMenu: async function (interaction, ctx) {
    if (ctx.cooldown > 0) {
      const remaining = getRemainingCooldown(interaction.user.id, ctx);
      if (remaining > 0) {
        return interaction.reply({
          content: `Please wait ${remaining.toFixed(1)} more second(s) before reusing the \`${ctx.name}\` command.`,
          ephemeral: true,
        });
      }
    }

    try {
      await ctx.execute(interaction);
    } catch (err) {
      error('An error occurred while running this context menu command', err);
      interaction.reply({ content: 'An error occurred while running this context menu command', ephemeral: true });
    } finally {
      if (ctx.cooldown > 0) applyCooldown(interaction.user.id, ctx);
    }
  },
};

/**
 * Apply cooldown to the command
 * @param {string} memberId
 * @param {import("@types/CommandType")} cmd
 */
function applyCooldown(memberId, cmd) {
  const key = cmd.name + '|' + memberId;
  cooldownCache.set(key, Date.now());
}

/**
 * Get remaining cooldown
 * @param {string} memberId
 * @param {import("@types/CommandType")} cmd
 * @returns {number}
 */
function getRemainingCooldown(memberId, cmd) {
  const key = cmd.name + '|' + memberId;
  if (cooldownCache.has(key)) {
    const remaining = (Date.now() - cooldownCache.get(key)) * 0.001;
    if (remaining > cmd.cooldown) {
      cooldownCache.delete(key);
      return 0;
    }
    return cmd.cooldown - remaining;
  }

  return 0;
}
