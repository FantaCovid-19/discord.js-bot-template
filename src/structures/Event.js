const { basename } = require('path');
const { table } = require('table');

const { log, error } = require('@helpers/Logger');
const { recursiveReadDirSync } = require('@helpers/Utils');

const tableConfig = {
  header: {
    alignment: 'center',
    content: 'Events Loaded',
  },
  singleLine: true,
  columns: [{ width: 25 }, { width: 10, alignment: 'center' }],
};

module.exports = class Events {
  constructor(client) {
    this.client = client;
  }

  /**
   * Load all events from the events folder
   * @param {string} directory - The directory to load the events from (default: 'src/events')
   */
  loadEvents(directory = 'src/events') {
    log('(+) Loading events...');

    let success = 0,
      failed = 0;
    const clientEvents = [];
    const files = recursiveReadDirSync(directory);

    for (const file of files) {
      const eventFiles = basename(file);

      try {
        const event = require(file);

        if (typeof event !== 'object') continue;

        if (event.once) {
          this.client.once(event.name, (...args) => event.execute(this.client, ...args));
        } else {
          this.client.on(event.name, (...args) => event.execute(this.client, ...args));
        }

        clientEvents.push([eventFiles, 'Passed']);
        delete require.cache[require.resolve(file)];
        success++;
      } catch (err) {
        clientEvents.push([eventFiles, 'Failed']);
        error(`Failed to load event ${eventFiles}: ${err}`);
        failed++;
      }
    }

    log("Client's events: \n" + table(clientEvents, tableConfig));
    log(`Loaded ${success + failed} events, Successfully loaded: ${success}, Failed to load: ${failed}`);
  }
};
