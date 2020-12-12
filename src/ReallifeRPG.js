import { topJobs } from "./config.json";

export default class ReallifeRPG {
  constructor() {
    this.api = "https://api.realliferpg.de/v1/";
    this.blacklistItems = topJobs.blacklist;
  }

  /**
   * Returns an array includes the current server list
   */
  async getServers() {
    const response = await fetch(this.api + "servers/");
    const data = await response.json();
    return data;
  }

  /**
   * Get an ReallifeRPG player profile
   * @param {string} apiKey ReallifeRPG API-Key
   */
  async getProfile(apiKey) {
    const response = await fetch(`${this.api}player/${apiKey}`);
    const data = await response.json();
    return data;
  }

  /**
   * Get an ReallifeRPG player vehicles
   * @param {string} apiKey ReallifeRPG API-Key
   */
  async getPlayerVehicles(apiKey) {
    const response = await fetch(`${this.api}player/${apiKey}/vehicles`);
    const data = await response.json();
    return data;
  }

  /**
   * Get the current market prices for each server
   */
  async getGlobalMarket() {
    const response = await fetch(this.api + "market_all/");
    const data = await response.json();
    return data;
  }

  /**
   * Get the current market prices for an server
   * @param {number} serverId
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
   */
  async getTopJobs(serverId, amount) {
    var temp = [],
      // topItems = [];
      topItems = {
        items: [],
        prices: [],
      };
    const response = await fetch(`${this.api}market/${serverId}`);
    const data = await response.json();
    data.data.forEach((item) => {
      if (!this.blacklistItems.includes(item.item)) {
        temp.push([item.localized, item.price]);
      }
    });
    temp.sort((a, b) => a[1] - b[1]);
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
    }
    return topItems;
  }

  /**
   * Get an rice backlog for an item
   * @param {number} serverId
   * @param {string} itemName
   * @param {number} backlogTime Backlog in hours
   */
  async getItemBacklog(serverId, itemName, backlogTime) {
    const response = await fetch(`${this.api}market/${serverId}/${itemName}/${backlogTime / 6}`);
    const data = await response.json();
    return data;
  }

  /**
   * Get an list with all avaiable changelogs
   */
  async getChangelogs() {
    const response = await fetch(this.api + "changelog");
    const data = await response.json();
    return data;
  }

  /**
   * Get all Twitch livestreams
   */
  async getStreams() {
    const response = await fetch(this.api + "twitch");
    const data = await response.json();
    return data;
  }

  /**
   * Returns a list with all community buildings
   */
  async getCBS() {
    const response = await fetch(this.api + "cbs");
    const data = await response.json();
    return data;
  }

  /**
   * Get a list of all avaiable item or vehicle shops
   * @param {string} category Should be vehicles or items
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
   */
  async getShopItems(category, shoptype) {
    const response = await fetch(`${this.api}info/${category}/${shoptype}`);
    const data = await response.json();
    return data;
  }
}
