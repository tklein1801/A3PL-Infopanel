import { topJobs, bonus, illegalItems } from "./config.json";

export default class ReallifeRPG {
  constructor() {
    this.api = "https://api.realliferpg.de/v1/";
    this.blacklistItems = topJobs.blacklist;
  }

  /**
   * @returns array
   */
  async getServers() {
    const response = await fetch(this.api + "servers/");
    const data = await response.json();
    return data;
  }

  /**
   *
   * @param {number} serverId
   * @returns array
   */
  async getServer(serverId) {
    const response = await fetch(this.api + "servers/");
    const json = await response.json();
    const serverData = json.data.filter((server) => server.Id == serverId);
    return serverData;
  }

  /**
   * Get an ReallifeRPG player profile
   * @param {string} apiKey ReallifeRPG API-Key
   * @returns array
   */
  async getProfile(apiKey) {
    const response = await fetch(`${this.api}player/${apiKey}`);
    const data = await response.json();
    return data;
  }

  /**
   * Get an ReallifeRPG player vehicles
   * @param {string} apiKey ReallifeRPG API-Key
   * @returns array
   */
  async getPlayerVehicles(apiKey) {
    const response = await fetch(`${this.api}player/${apiKey}/vehicles`);
    const data = await response.json();
    return data;
  }

  /**
   * Get the current market prices for each server
   * @returns array
   */
  async getGlobalMarket() {
    const response = await fetch(this.api + "market_all/");
    const data = await response.json();
    return data;
  }

  /**
   * Get the current market prices for an server
   * @param {number} serverId
   * @returns array
   */
  async getMarket(serverId) {
    const response = await fetch(`${this.api}market/${serverId}`);
    const data = await response.json();
    return data;
  }

  /**
   * Get an list of the highest paid items
   * @param {number} serverId ReallifeRPG server id
   * @param {number} amount Amount of items
   * @returns array
   */
  async getTopJobs(serverId, amount) {
    const serverData = await this.getServer(serverId);
    const response = await fetch(`${this.api}market/${serverId}`);
    const marketData = await response.json();
    var temp = [],
      topItems = {
        items: [],
        prices: [],
        itemName: [],
      };
    marketData.data.forEach((item) => {
      // Check if the items are blacklisted for the top-jobs
      if (!this.blacklistItems.includes(item.item)) {
        // If the length equals 1 the server is online
        if (serverData.length === 1 && illegalItems.includes(item.item)) {
          let copAmount =
            serverData.length === 1
              ? serverData[0].Side.Cops.filter((player) => player.includes("[C")).length
              : null;
          let multiplier = bonus.filter((boni) => boni.amount === copAmount)[0].multiplier;
          let newPrice = parseInt(item.price * multiplier).toFixed(0);
          temp.push([item.localized, newPrice, item.item]);
        } else {
          temp.push([item.localized, item.price, item.item]);
        }
      }
    });

    // Sort the items
    temp.sort((a, b) => a[1] - b[1]);

    // Get the top 10 items
    for (let i = temp.length - 1; i > temp.length - (amount + 1); i--) {
      const item = temp[i];
      // We're gonna use an object with contains 2 different array instean an array which contains multiple objects
      // because its easier to use with chart.js to split the requried array for the chart
      // topItems.push({
      //   item: item[0],
      //   price: item[1],
      // });
      topItems.items.push(item[0]);
      topItems.prices.push(item[1]);
      topItems.itemName.push(item[2]);
    }

    return topItems;
  }

  /**
   * Get an rice backlog for an item
   * @param {number} serverId
   * @param {string} itemName
   * @param {number} backlogTime Backlog in hours
   * @returns array
   */
  async getItemBacklog(serverId, itemName, backlogTime) {
    const response = await fetch(`${this.api}market/${serverId}/${itemName}/${backlogTime / 6}`);
    const data = await response.json();
    return data;
  }

  /**
   * Get an list with all avaiable changelogs
   * @returns array
   */
  async getChangelogs() {
    const response = await fetch(this.api + "changelog");
    const data = await response.json();
    return data;
  }

  /**
   * Get all Twitch livestreams
   * @returns array
   */
  async getStreams() {
    const response = await fetch(this.api + "twitch");
    const data = await response.json();
    return data;
  }

  /**
   * Returns a list with all community buildings
   * @returns array
   */
  async getCBS() {
    const response = await fetch(this.api + "cbs");
    const data = await response.json();
    return data;
  }

  /**
   * Get a list of all avaiable item or vehicle shops
   * @param {string} category Should be vehicles or items
   * @returns array
   */
  async getShops(category) {
    const response = await fetch(`${this.api}info/${category}_shoptypes`);
    const data = await response.json();
    return data;
  }

  /**
   * Get a list of all offered items for an specific shop
   * @param {string} category Should be vehicles or items
   * @param {string} shoptype
   * @returns array
   */
  async getShopItems(category, shoptype) {
    const response = await fetch(`${this.api}info/${category}/${shoptype}`);
    const data = await response.json();
    return data;
  }
}
