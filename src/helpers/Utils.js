const { readdirSync, lstatSync, existsSync } = require('fs');
const { join, extname } = require('path');

/**
 * Utils class.
 */
module.exports = class Utils {
  /**
   * Check if a string contains a link.
   * @param {String} str - The string to check.
   */
  static containsLink(str) {
    return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(
      str
    );
  }

  /**
   * Check if a string contains a Discord invite link.
   * @param {String} str - The string to check.
   */
  static containtsDiscordInviteLink(str) {
    return /(https?:\/\/)?(www.)?(discord.(gg|io|me|li|link|plus)|discorda?p?p?.com\/invite|invite.gg|dsc.gg|urlcord.cf)\/[^\s/]+?(?=\b)/.test(str);
  }

  /**
   * Read all files in a directory recursively.
   *
   * @param {String} dir - The directory to read files from.
   * @param {String[]} [allowedExtensions] - The allowed extensions to read.
   * @returns {String[]}
   */
  static recursiveReadDirSync(dir, allowedExtensions = ['.js']) {
    const filesPaths = [];

    /**
     * Read all files in a directory recursively.
     * @param {String} directory - The directory to read files from.
     * @returns {void}
     */
    const readDirectory = (directory) => {
      const path = join(process.cwd(), directory);
      if (!existsSync(path) || !lstatSync(path).isDirectory) throw new Error(`Directory ${dir} does not exist or is not a directory.`);

      const files = readdirSync(path);
      for (const file of files) {
        const filePath = join(path, file);
        const stat = lstatSync(filePath);

        if (stat.isDirectory()) {
          const subFiles = join(directory, file);
          readDirectory(subFiles);
        } else if (stat.isFile() && allowedExtensions.includes(extname(filePath))) {
          const fileContent = join(process.cwd(), directory, file);
          filesPaths.push(fileContent);
        }
      }
    };

    readDirectory(dir);

    return filesPaths;
  }
};
