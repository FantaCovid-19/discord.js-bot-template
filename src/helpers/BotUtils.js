const { getJson } = require('./HttpUtils');
const { error, log } = require('./Logger');

module.exports = class BotUtils {
  /**
   * Check for updates in the repository
   * @param {String} repository - The repository to check for updates
   * @returns {Promise<Boolean>}
   */
  static async checkForUpdates(repository) {
    log('Checking for updates...');

    const response = await getJson(`https://api.github.com/repos/${repository.toString()}/releases/latest`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    if (!response.success) return error('Failed to check for updates:', response.data);
    if (response.data) {
      const lastestVersion = response.data.tag_name.replace('v', '');
      const currentVersion = require('@/package.json').version.replace('/[^0-9]/g', '');

      if (currentVersion >= lastestVersion) {
        log('Bot is up to date with the latest version available');
      } else {
        error('Bot is not up to date with the latest version available');
      }
    }
  }
};
