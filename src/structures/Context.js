const { basename } = require('path');
const { table } = require('table');

const { log, error } = require('@helpers/Logger');
const { recursiveReadDirSync } = require('@helpers/Utils');
const { ApplicationCommandType } = require('discord.js');

const tableConfig = {
  header: {
    alignment: 'center',
    content: 'Context Loaded',
  },
  singleLine: true,
  columns: [{ width: 25 }, { width: 10, alignment: 'center' }],
};

module.exports = class Context {
  constructor(client) {
    this.client = client;
  }

  /**
   * Load all contexts from the contexts folder
   * @param {string} directory - The directory to load the contexts from (default: 'src/contexts')
   */
  loadFileContexts(directory = 'src/contexts') {
    log('(/) Loading contexts...');

    let success = 0,
      failed = 0;
    const clientContexts = [];
    const files = recursiveReadDirSync(directory);

    for (const file of files) {
      const ctxFiles = basename(file);

      try {
        const ctx = require(file);

        if (typeof ctx !== 'object') continue;

        this.client.contextMenus.set(ctx.name, ctx);
        clientContexts.push([ctxFiles, 'Passed']);
        success++;
      } catch (err) {
        error(`Failed to load context ${ctxFiles} Reason: ${err.message}`);
        clientContexts.push([ctxFiles, 'Failed']);
        failed++;
      }
    }

    const userContexts = this.client.contextMenus.filter((ctx) => ctx.type === ApplicationCommandType.User).size;
    const messageContexts = this.client.contextMenus.filter((ctx) => ctx.type === ApplicationCommandType.Message).size;

    if (userContexts > 3) throw new Error('You can only have up to 3 user context commands.');
    if (messageContexts > 3) throw new Error('You can only have up to 3 message context commands.');

    log("Client's context menus: \n" + table(clientContexts, tableConfig));
    log(`Loaded ${this.client.contextMenus.size} context menus`);
    log(`Loaded ${success + failed} contexts menus, Successfully loaded: ${success}, Failed to load ${failed}`);
  }
};
