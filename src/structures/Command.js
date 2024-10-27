const { basename } = require('path');
const { table } = require('table');

const { log, error, warn } = require('@helpers/Logger');
const { recursiveReadDirSync } = require('@helpers/Utils');

const tableConfig = {
  header: {
    alignment: 'center',
    content: 'Commands Loaded',
  },
  singleLine: true,
  columns: [{ width: 25 }, { width: 10, alignment: 'center' }],
};

module.exports = class Commands {
  /** @param {import('@structures/BotClient')} client */
  constructor(client) {
    this.client = client;
  }

  /**
   * Register command to the client
   * @param {import("@types/CommandType")} cmd
   */
  #loadCommand(cmd) {
    if (cmd.command?.enabled) {
      const index = this.client.commands.length;
      if (this.client.commandIndex.has(cmd.name)) throw new Error(`Command ${cmd.name} already exists.`);

      if (Array.isArray(cmd.command.aliases)) {
        for (const alias of cmd.command.aliases) {
          if (this.client.commandIndex.has(alias)) throw new Error(`Alias ${alias} already exists.`);
          this.client.commandIndex.set(alias.toLowerCase(), index);
        }
      }

      this.client.commandIndex.set(cmd.name.toLowerCase(), index);
      this.client.commands.push(cmd);
    } else {
      warn(`Skipping Command ${cmd.name}. Command is disabled.`);
    }

    if (cmd.slashCommand?.enabled) {
      if (this.client.slashCommands.has(cmd.name)) throw new Error(`Slash Command ${cmd.name} already exists.`);

      this.client.slashCommands.set(cmd.name, cmd);
    } else {
      warn(`Skipping Slash Command ${cmd.name}. Slash Command is disabled.`);
    }
  }

  /**
   * Load all commands from the commands folder
   * @param {string} directory - The directory to load the commands from (default: 'src/commands')
   */
  loadFileCommands(directory = 'src/commands') {
    log('(/) Loading commands...');

    let success = 0,
      failed = 0;
    const clientCommands = [];
    const files = recursiveReadDirSync(directory);

    for (const file of files) {
      const cmdFiles = basename(file);

      try {
        const cmd = require(file);

        if (typeof cmd !== 'object') continue;
        this.#loadCommand(cmd);

        clientCommands.push([cmdFiles, 'Passed']);
        success++;
      } catch (err) {
        error(`Failed to load ${cmdFiles} Reason: ${err.message}`);
        clientCommands.push([cmdFiles, 'Failed']);
        failed++;
      }
    }

    log("Client's commands: \n" + table(clientCommands, tableConfig));
    log(`Loaded ${this.client.commands.length} commands`);
    log(`Loaded ${this.client.slashCommands.size} slash commands`);
    log(`Loaded ${success + failed} commands, Successfully loaded: ${success}, Failed to load: ${failed}`);
  }
};
