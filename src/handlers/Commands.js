const { EmbedBuilder } = require('discord.js');
const { error } = require('@helpers/Logger');

const cooldownCache = new Map();

module.exports = {
  /**
   * Handle the command prefix execution for the message command
   * @param {import('discord.js').Message} message
   * @param {import("@types/CommandType")} cmd
   * @param {Object} settings
   * @returns {Promise<void>}
   */
  handlerPrefixCommand: async function (message, cmd, settings) {
    const prefix = '$';
    const args = message.content.replace(prefix, '').split(/\s+/);
    const invoke = args.shift().toLowerCase();

    const data = {
      settings,
      prefix,
      invoke,
    };

    if (!message.channel.permissionsFor(message.guild.members.me).has('SendMessages')) return;

    if (cmd.command.minArgsCount > args.length) {
      const usageEmbed = getCommandUsage(cmd, prefix, invoke);
      return message.reply({ embeds: [usageEmbed] });
    }

    if (cmd.cooldown > 0) {
      const remaining = getRemainingCooldown(message.author.id, cmd);
      if (remaining > 0) {
        return message.reply(`Please wait ${remaining.toFixed(1)} more second(s) before reusing the \`${cmd.name}\` command.`);
      }
    }

    try {
      await cmd.messageExecute(message, args, data);
    } catch (err) {
      error(err);
      message.channel.send('"An error occurred while running this command');
    } finally {
      if (cmd.cooldown > 0) applyCooldown(message.author.id, cmd);
    }
  },

  /**
   * Handle the command prefix execution for the slash command
   * @param {import('discord.js').ChatInputCommandInteraction} interaction
   */
  handlerSlashCommmand: async function (interaction) {
    const cmd = interaction.client.slashCommands.get(interaction.commandName);
    if (!cmd) return interaction.reply({ content: 'This command is not available', ephemeral: true });

    if (cmd.cooldown > 0) {
      const remaining = getRemainingCooldown(interaction.user.id, cmd);
      if (remaining > 0) {
        return interaction.reply({
          content: `Please wait ${remaining.toFixed(1)} more second(s) before reusing the \`${cmd.name}\` command.`,
          ephemeral: true,
        });
      }
    }

    try {
      await cmd.interactionExecute(interaction);
    } catch (err) {
      error('An error occurred while running this command', err);
      interaction.reply({ content: 'An error occurred while running this command', ephemeral: true });
    } finally {
      if (cmd.cooldown > 0) applyCooldown(interaction.user.id, cmd);
    }
  },
};

/**
 * Build embed for command usage
 *
 * @param {import("@types/CommandType")} cmd
 * @param {string} prefix
 * @param {string} invoke
 * @returns {import('discord.js').Embed}
 */
function getCommandUsage(cmd, prefix, invoke) {
  let description = '';

  if (cmd.command.subCommands && cmd.command.subCommands.length > 0) {
    cmd.command.subCommands.forEach((subCmd) => {
      description += `\`${prefix}${invoke || cmd.name} ${subCmd.trigger}\`\n ${subCmd.description}\n`;
    });

    if (cmd.cooldown) {
      description += `\n**Cooldown:** ${cmd.cooldown} seconds`;
    }
  } else {
    description += `\`${prefix}${invoke || cmd.name} ${cmd.command.usage}\``;
    if (cmd.description !== '') description += `\n**Help:** ${cmd.description}`;
    if (cmd.cooldown) description += `\n**Cooldown:** ${cmd.cooldown} seconds`;
  }

  const embed = new EmbedBuilder().setColor('Random').setDescription(description);
  return embed;
}

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
