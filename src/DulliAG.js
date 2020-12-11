export default class DulliAG {
  async getContacts() {
    const response = await fetch("https://dev.dulliag.de/armaContact/v1/getAll.php");
    const data = response.json();
    return data;
  }

  async insertContact(playerName, playerId, avatarUrl, telNo) {
    // const body = {
    //   name: playerName,
    //   player: playerId,
    //   avatar: avatarUrl,
    //   telNo: telNo,
    // };
    // const response = await fetch("https://dev.dulliag.de/v1/armaContact/create.php", {
    //   method: "post",
    //   body: JSON.stringify(body),
    // });
    const response = await fetch(
      `https://dev.dulliag.de/armaContact/v1/create.php?name=${playerName}&player=${playerId}&avatar=${avatarUrl}&telNo=${telNo}`
    );
    const data = await response.json();
    return data;
  }

  async deleteContact() {}
}
