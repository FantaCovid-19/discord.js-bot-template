const { getJson } = require('./HttpUtils');

module.exports = class Utils {
  /**
   * Check for updates in the repository
   * @param {string} repository - The repository to check for updates
   * @returns {Promise<boolean>}
   */
  static async checkForUpdates(repository) {
    const response = await getJson(`https://api.github.com/repos/${repository}/releases/latest`, {
      headers: {
        'User-Agent': 'node.js',
        Accept: 'application/vnd.github.v3+json',
        Authorization: `Bearer  ${process.env.GITHUB_TOKEN}`,
        'X-Github-Api-Version': '2022-11-28',
      },
    });

    if (!response.success) return;
    if (response.data) {
      const lastestVersion = response.data.tag_name.replace('v', '');
      const currentVersion = require('@/package.json').version.replace('/[^0-9]/g', '');

      if (lastestVersion <= currentVersion) {
        return true;
      } else {
        return false;
      }
    }
  }
};
