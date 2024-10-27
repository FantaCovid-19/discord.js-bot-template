require('dotenv').config();
require('module-alias/register');

const Client = require('@structures/BotClient');
const { validateConfigurations } = require('@helpers/Validator');
const { checkForUpdates } = require('@helpers/BotUtils');
const config = require('@config');

const client = new Client();

validateConfigurations();

(async () => {
  if (config.checkUpdates) await checkForUpdates(process.env.GITHUB_REPO);

  await client.initialize();
})();
