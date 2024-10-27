module.exports = class HttpUtils {
  /**
   * Make a GET request to a URL and return the response.
   * @param {String} url - The URL to make the request to.
   * @param {Object} [options] - The fetch options.
   * @returns {Promise<Object>}
   */
  static async getJson(url, options) {
    try {
      const response = options ? await fetch(url, options) : await fetch(url);
      const json = await response.json();

      return {
        success: response.status === 200 ? true : false,
        status: response.status,
        data: json,
      };
    } catch (error) {
      return {
        success: false,
        status: 500,
        data: error,
      };
    }
  }
};
