const config = require('@config/index');
const { log, warn, error } = require('./Logger');

/**
 * Validates the configurations in the config file and other.
 */
module.exports = class Validator {
  /**
   * Validates the configurations in the config file.
   * @returns {void}
   */
  static validateConfigurations() {
    log('Validating configurations...');

    if (!process.env.DISCORD_TOKEN) {
      error('DISCORD_TOKEN is missing! Exiting...');
      process.exit(1);
    }

    if (!Array.isArray(config.OwnerID)) {
      error('OwnerID must be an array! Exiting...');
      process.exit(1);
    }

    if (typeof config.checkUpdates !== 'boolean') {
      error('checkUpdates must be a boolean! Exiting...');
      process.exit(1);
    }

    // Warnings
    if (config.OwnerID.length === 0) warn('OwnerID is empty! You will not be able to use owner commands.');
    if (!config.SupportServer) warn('SupportServer is empty! You will not be able to get support.');
    if (!config.checkUpdates) warn('checkUpdates is disabled! You will not be notified of updates.');
  }
};
