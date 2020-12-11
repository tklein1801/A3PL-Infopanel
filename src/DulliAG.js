class Contact {
  /**
   * @param {string} playerName ReallifeRPG playername
   * @param {string} playerId Steam64 id
   * @param {string} avatarUrl Steam avatar url
   * @param {string} telNo ReallifeRPG telephone number
   */
  async create(playerName, playerId, avatarUrl, telNo) {
    const form = new FormData();
    form.append("playerName", playerName);
    form.append("playerId", playerId);
    form.append("avatarUrl", avatarUrl);
    form.append("telNo", telNo);
    const response = await fetch("https://api.dulliag.de/acon/v1/create.php", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const data = response.json();
    return data;
  }

  /**
   * @param {number} contactId
   */
  async delete(contactId) {
    const form = new FormData();
    form.append("contactId", contactId);
    const response = await fetch("https://api.dulliag.de/acon/v1/delete.php", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
