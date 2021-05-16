import { Component } from "react";
import { Card, Row, Col, OverlayTrigger, Popover } from "react-bootstrap";
import Loader from "../components/Loader";
import { Doughnut } from "@reactchartjs/react-chart.js";
import ReallifeRPG from "../ReallifeRPG";
import { settings } from "../config.json";
import "../style/routes/dashboard.scss";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const rlrpg = new ReallifeRPG();
    const apiKey = localStorage.getItem("@dag_apiKey");
    var profile = await rlrpg.getProfile(apiKey);
    var serverlist = await rlrpg.getServers();
    serverlist = serverlist.data;
    if (!settings.show_gungame) {
      serverlist = serverlist.filter(
        (server) => !server.Servername.toLowerCase().includes("gungame")
      );
    }
    this.setState({
      profile: profile.data !== undefined ? profile.data[0] : null,
      servers: serverlist,
      loading: false,
    });
  }

  render() {
    const { loading, profile, servers } = this.state;

    return (
      <div className="dashboard">
        <h3 className="page-title">Dashboard</h3>
        <Row>
          {loading ? (
            <Col xs={12} md={12} lg={6} xl={6}>
              <Card className="border-top shadow-md p-4">
                <Loader />
              </Card>
            </Col>
          ) : (
            servers.map((server, index) => {
              let friends = [];
              try {
                const playerList = server.Players,
                  playerName = profile.name,
                  hasClanTag = playerName.split("]"),
                  clanTag = hasClanTag[0] + "]";
                // if the length if above 1 the player has an active clan tag
                if (hasClanTag.length > 1) {
                  playerList.forEach((player) => {
                    if (
                      player.includes(clanTag) &&
                      player !== playerName &&
                      playerName !== `${player}(Lobby)`
                    ) {
                      friends.push(player);
                    }
                  });
                }
              } catch (err) {
                console.error(err);
              }

              const playerList = server.Players,
                sortedPlayerList = playerList.sort();

              const chartData = {
                  labels: ["Polizisten", "RAC", "Mediziner", "Zivilisten"],
                  datasets: [
                    {
                      fill: false,
                      borderWidth: 2,
                      lineTension: 0,
                      spanGaps: true,
                      borderColor: "#fff",
                      pointRadius: 3,
                      pointHoverRadius: 7,
                      pointColor: "#fff",
                      pointBackgroundColor: "#fff",
                      backgroundColor: ["#007bff", "#ffc107", "#dc3545", "#28a745"],
                      data: [server.Cops, server.Adac, server.Medics, server.Civilians],
                    },
                  ],
                },
                chartOptions = {
                  title: {
                    display: false,
                  },
                  legend: {
                    display: false,
                  },
                };
              return (
                <Col xs={12} md={12} lg={6} xl={6} className="server-card" key={index}>
                  <Card className="border-top shadow-md">
                    <Card.Header>
                      <Card.Title>
                        Server {server.Id}
                        <small className="ml-2">
                          {server.Playercount} / {server.Slots} Spieler
                        </small>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Row>
                        <Col xs={12} md={12} lg={6} xl={6}>
                          <Doughnut data={chartData} options={chartOptions} />
                        </Col>
                        <Col xs={12} md={12} lg={6} xl={6}>
                          <h5 className="text font-weight-bold mb-0">
                            Spielerliste
                            {friends.length > 0 ? (
                              <OverlayTrigger
                                trigger="hover"
                                placement="right"
                                overlay={
                                  <Popover>
                                    <Popover.Title as="h3">Clanmitglieder</Popover.Title>
                                    <Popover.Content>
                                      <ul className="list-unstyled mb-0">
                                        {friends.map((friend) => {
                                          return <li>{friend}</li>;
                                        })}
                                      </ul>
                                    </Popover.Content>
                                  </Popover>
                                }
                              >
                                <small className="ml-2">Freunde</small>
                              </OverlayTrigger>
                            ) : null}
                          </h5>
                          <ul>
                            {sortedPlayerList.map((player, index) => {
                              return <li key={index}>{player}</li>;
                            })}
                          </ul>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </div>
    );
  }
}
