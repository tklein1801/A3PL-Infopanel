const FormData = require("form-data");
const fetch = require("node-fetch");

class Contact {
  /**
   * @param {string} playerName ReallifeRPG playername
   * @param {string} playerId Steam64 id
   * @param {string} avatarUrl Steam avatar url
   * @param {string} telNo ReallifeRPG telephone number
   */
  async create(playerName, playerId, avatarUrl, telNo) {
    const formData = new FormData();
    formData.append("playerName", playerName);
    formData.append("playerId", playerId);
    formData.append("avatarUrl", avatarUrl);
    formData.append("telNo", telNo);
    const response = await fetch("https://api.dulliag.de/acon/v1/create.php", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  }

  /**
   * @param {number} contactId
   */
  async delete(contactId) {
    const formData = new FormData();
    formData.append("contactId", contactId);
    const response = await fetch("https://api.dulliag.de/acon/v1/delete.php", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  }

  async getAll() {
    const response = await fetch("https://api.dulliag.de/acon/v1/getAll.php", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }

  /**
   * @param {string} playerId Steam64 id
   */
  async getByPlayerId(playerId) {
    const response = await fetch(`https://api.dulliag.de/acon/v1/getAll.php?playerId=${playerId}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }

  /**
   * @param {number} contactId
   */
  async get(contactId) {
    const response = await fetch(
      `https://api.dulliag.de/acon/v1/getAll.php?contactId=${contactId}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data;
  }
}

export { Contact };
