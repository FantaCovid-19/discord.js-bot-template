require('dotenv').config();
require('module-alias/register');

const Client = require('@structures/BotClient');

const client = new Client();

(async () => {
  await client.initialize();
})();
