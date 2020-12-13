import { Component } from "react";
import { Row, Col, Card, ProgressBar, Badge, Button, Nav, Tab, Table, Form } from "react-bootstrap";
import Loader from "../components/Loader";
import {
  faCar,
  faIdBadge,
  faMapMarkedAlt,
  faMedkit,
  faPlane,
  faShip,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "../components/Alerts";
import ReallifeRPG from "../ReallifeRPG";
import "../style/routes/profile.scss";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const apiKey = localStorage.getItem("@dag_apiKey"),
      rlrpg = new ReallifeRPG(),
      player = await rlrpg.getProfile(apiKey),
      vehicles = await rlrpg.getPlayerVehicles(apiKey);
    this.setState({ profile: player, vehicles: vehicles, loading: false });
  }

  render() {
    const { loading, profile, vehicles } = this.state;

    const lastSeen = !loading ? new Date(profile.data[0].last_seen.date) : null;
    const lsDate =
      lastSeen !== null
        ? {
            days: lastSeen.getDate(),
            month: lastSeen.getMonth() + 1,
            year: lastSeen.getFullYear(),
            hours: lastSeen.getHours(),
            minutes: lastSeen.getMinutes(),
          }
        : null;
    return (
      <div className="profile">
        <h1>Spielerprofil</h1>
        <Row>
          <Col xs={12} md={6} lg={5} xl={3} className="mb-3">
            {loading ? (
              <Card className="border-top shadow-md p-4">
                <Loader />
              </Card>
            ) : (
              <Card className="shadow-md border-top">
                <Card.Body className="pb-0">
                  <img className="avatar" src={profile.data[0].avatar_full} alt="Avatar" />

                  <div className="level-progress-container mb-2">
                    <p className="text font-weight-bold mb-0">
                      Level <span>{profile.data[0].level}</span>
                    </p>
                    <ProgressBar now={profile.data[0].level_progress} />
                  </div>

                  <div className="fraction-level-container mb-2">
                    <p class="text text-center font-weight-bold mb-2">Fraktionen</p>
                    <Row>
                      <Col xs={4} className="fraction-level">
                        <p class="text mb-0">
                          <FontAwesomeIcon icon={faIdBadge} className="icon" />
                        </p>
                        <Badge variant="primary" className="p-2">
                          Level {profile.data[0].coplevel}
                        </Badge>
                      </Col>
                      <Col xs={4} className="fraction-level">
                        <p class="text mb-0">
                          <FontAwesomeIcon icon={faMedkit} className="icon" />
                        </p>
                        <Badge variant="primary" className="p-2">
                          Level {profile.data[0].mediclevel}
                        </Badge>
                      </Col>
                      <Col xs={4} className="fraction-level">
                        <p class="text mb-0">
                          <FontAwesomeIcon icon={faWrench} className="icon" />
                        </p>
                        <Badge variant="primary" className="p-2">
                          Level {profile.data[0].adaclevel}
                        </Badge>
                      </Col>
                    </Row>
                  </div>

                  <div className="item">
                    <p>Name</p>
                    <p className="text">{profile.data[0].name}</p>
                  </div>

                  <div className="item">
                    <p>Player Id</p>
                    <p>{profile.data[0].pid}</p>
                  </div>

                  <div className="item">
                    <p>Bargeld</p>
                    <p>{profile.data[0].cash.toLocaleString(undefined)} €</p>
                  </div>

                  <div className="item">
                    <p>Kontostand</p>
                    <p>{profile.data[0].bankacc.toLocaleString(undefined)} €</p>
                  </div>

                  <div className="item">
                    <p>Quest Fortschritt</p>
                    <p>{profile.data[0].quest_row} / 39</p>
                  </div>

                  <div className="item">
                    <p>Skillpunkte</p>
                    <p>{profile.data[0].skillpoint} Verfügbare Punkte</p>
                  </div>

                  <div className="item">
                    <p>Aktive Spielzeit</p>
                    <p>{(profile.data[0].play_time.active / 60).toFixed(2)} Stunden</p>
                  </div>

                  <div className="item">
                    <p>Gesamte Spielzeit</p>
                    <p>{(profile.data[0].play_time.total / 60).toFixed(2)} Stunden</p>
                  </div>

                  <div class="item">
                    <p>Zuletzt online</p>
                    <p>
                      {lsDate.days > 9 ? lsDate.days : `0${lsDate.days}`}.
                      {lsDate.month > 9 ? lsDate.month : `0${lsDate.month}`}.
                      {lsDate.year > 9 ? lsDate.year : `0${lsDate.year}`} |{" "}
                      {lsDate.hours > 9 ? lsDate.hours : `0${lsDate.hours}`}:
                      {lsDate.minutes > 9 ? lsDate.minutes : `0${lsDate.minutes}`} Uhr
                    </p>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col xs={12} md={6} lg={7} xl={9}>
            {loading ? (
              <Card className="border-top shadow-md p-4">
                <Loader />
              </Card>
            ) : (
              <Card className="shadow-md border-top">
                <Tab.Container defaultActiveKey="bank-accounts">
                  <div className="nav-container rounded">
                    <Nav variant="pills">
                      <Nav.Link eventKey="bank-accounts">Konten</Nav.Link>
                      <Nav.Link eventKey="vehicles">Fahrzeuge</Nav.Link>
                      <Nav.Link eventKey="properties">Immobilien</Nav.Link>
                    </Nav>
                  </div>
                  <Tab.Content>
                    <Tab.Pane eventKey="bank-accounts" className="p-3">
                      <Row>
                        {profile.data[0].bank_main.map((bankAcc) => {
                          return (
                            <Col
                              xs={12}
                              md={12}
                              lg={6}
                              xl={4}
                              className="mb-3 mb-md-0 credit-card-container"
                            >
                              <div className="credit-card">
                                <img
                                  src="https://i0.wp.com/realliferpg.de/wp-content/uploads/2017/10/realliferpg100x100.png?fit=100%2C100&ssl=1"
                                  alt="rlrpg logo"
                                />
                                <h4 className="text font-weight-bold">NH-Bank</h4>
                                <Form.Group className="mb-3">
                                  <Form.Label>IBAN</Form.Label>
                                  <Form.Control type="text" value={bankAcc.iban} disabled />
                                </Form.Group>
                                <Form.Row>
                                  <Col xs={7}>
                                    <Form.Group>
                                      <Form.Label>Inhaber</Form.Label>
                                      <Form.Control type="text" value={bankAcc.pid} disabled />
                                    </Form.Group>
                                  </Col>
                                  <Col>
                                    <Form.Group>
                                      <Form.Label>Kontostand</Form.Label>
                                      <Form.Control
                                        type="text"
                                        value={`${bankAcc.balance.toLocaleString(undefined)} €`}
                                        disabled
                                      />
                                    </Form.Group>
                                  </Col>
                                </Form.Row>
                              </div>
                            </Col>
                          );
                        })}
                      </Row>
                    </Tab.Pane>
                    <Tab.Pane eventKey="vehicles">
                      <Table className="no-wrap" responsive hover borderless>
                        <thead>
                          <tr className="text-center">
                            <th>Typ</th>
                            <th>Status</th>
                            <th>Fahrzeug</th>
                            <th>Fraktion</th>
                            <th>Kennzeichen</th>
                            <th>Kilometerstand</th>
                            <th>Tank</th>
                          </tr>
                        </thead>
                        <tbody>
                          {vehicles.data.length > 0 ? (
                            vehicles.data.map((vehicle, index) => {
                              let type, status, fraction;
                              // Vehicle type
                              switch (vehicle.type) {
                                case "Ship":
                                  type = <FontAwesomeIcon icon={faShip} className="icon" />;
                                  break;

                                case "Air":
                                  type = <FontAwesomeIcon icon={faPlane} className="icon" />;
                                  break;

                                default:
                                  type = <FontAwesomeIcon icon={faCar} className="icon" />;
                                  break;
                              }

                              // Vehicle status
                              if (vehicle.active === 1) {
                                status = (
                                  <Badge variant="success" className="p-2">
                                    Ausgeparkt
                                  </Badge>
                                );
                              } else if (vehicle.impound === 1) {
                                status = (
                                  <Badge variant="danger" className="p-2">
                                    Beschlagnahmt
                                  </Badge>
                                );
                              } else {
                                status = (
                                  <Badge variant="primary" className="p-2">
                                    Geparkt
                                  </Badge>
                                );
                              }

                              // Fraction
                              if (vehicle.side === "COP") {
                                fraction = "Polizei";
                              } else if (vehicle.side === "EAST") {
                                fraction = "RAC";
                              } else if (vehicle.side === "MEDIC" || vehicle.side === "GUER") {
                                fraction = "Medic";
                              } else {
                                fraction = "Zivilisten";
                              }

                              return (
                                <tr key={index} className="text-center">
                                  <td>{type}</td>
                                  <td>{status}</td>
                                  <td>
                                    <p className="text mb-0">{vehicle.vehicle_data.name}</p>
                                  </td>
                                  <td>
                                    <p className="text mb-0">{fraction}</p>
                                  </td>
                                  <td>
                                    <Badge className="p-2" variant="primary">
                                      {vehicle.plate}
                                    </Badge>
                                  </td>
                                  <td>
                                    <p className="text mb-0">{vehicle.kilometer_total} Km</p>
                                  </td>
                                  <td>
                                    <ProgressBar
                                      animated
                                      variant="danger"
                                      now={vehicle.fuel * 100}
                                      // label={`${(vehicle.fuel * 100).toFixed(2)}%`}
                                    />
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr className="text-center">
                              <td colSpan="7">
                                <p className="text font-weight-bold mb-0">Kein Fahrzeug gefunden</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="properties">
                      <Alert
                        message={
                          "Hier werden nur Immobilien, Appartments & Baustellen angezeigt für welche du einen Schlüssel besitzt!"
                        }
                      />

                      <h4 className="text font-weight-bold px-3">Häuser</h4>
                      <Table className="no-wrap" responsive hover borderless>
                        <thead>
                          <tr className="text-center">
                            <th>Id</th>
                            <th>Status</th>
                            <th>Inhaber</th>
                            <th>Mitbewohner</th>
                            <th>Gewartet für</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profile.data[0].houses.length > 0 ? (
                            profile.data[0].houses.map((house, index) => {
                              let status;
                              status =
                                house.disabled === 0 ? (
                                  <Badge variant="primary" className="p-2">
                                    Gewartet
                                  </Badge>
                                ) : (
                                  <Badge variant="danger" className="p-2">
                                    Zerstört
                                  </Badge>
                                );
                              const loc = house.location
                                .substring(1, house.location.length - 1)
                                .split(",");
                              return (
                                <tr key={index} className="text-center">
                                  <td>
                                    <p className="text mb-0">{house.id}</p>
                                  </td>
                                  <td>{status}</td>
                                  <td>
                                    <p className="text mb-0">{profile.data[0].name}</p>
                                  </td>
                                  <td>
                                    {house.players.map((player) => {
                                      return (
                                        <Badge variant="primary" className="px-2 mr-1">
                                          {player}
                                        </Badge>
                                      );
                                    })}
                                  </td>
                                  <td>
                                    <p className="text mb-0">{house.payed_for / 24} Tage</p>
                                  </td>
                                  <td>
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      onClick={() =>
                                        (window.location = `https://info.realliferpg.de/map?x=${loc[0]}&amp;y=${loc[1]}`)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faMapMarkedAlt} className="icon" />
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr className="text-center">
                              <td colSpan="5">
                                <p className="text font-weight-bold mb-0">Kein Haus gefunden</p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      <h4 className="text font-weight-bold px-3">Appartments</h4>
                      <Table className="no-wrap" responsive hover borderless>
                        <thead>
                          <tr className="text-center">
                            <th>Id</th>
                            <th>Status</th>
                            <th>Gemietet für</th>
                            <th>Inhaber</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profile.data[0].rentals.length > 0 ? (
                            profile.data[0].rentals.map((rental, index) => {
                              return (
                                <tr key={index} className="text-center">
                                  <td>
                                    <p className="text mb-0">{rental.id}</p>
                                  </td>
                                  <td>
                                    <p className="text mb-0">
                                      <Badge variant="primary" className="p-2">
                                        Gemietet
                                      </Badge>
                                    </p>
                                  </td>
                                  <td>
                                    <p className="text mb-0">{rental.payed_for / 24} Tage</p>
                                  </td>
                                  <td>
                                    <p className="text mb-0">{profile.data[0].name}</p>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr className="text-center">
                              <td colSpan="5">
                                <p className="text font-weight-bold mb-0">
                                  Kein Appartment gefunden
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>

                      <h4 className="text font-weight-bold px-3">Baustellen</h4>
                      <Table className="no-wrap" responsive hover borderless>
                        <thead>
                          <tr className="text-center">
                            <th>Id</th>
                            <th>Status</th>
                            <th>Stufe</th>
                            <th>Inhaber</th>
                            <th>Mitbewohner</th>
                          </tr>
                        </thead>
                        <tbody>
                          {profile.data[0].buildings.length > 0 ? (
                            profile.data[0].buildings.map((building, index) => {
                              let status;
                              status =
                                building.disabled === 0 ? (
                                  <Badge variant="primary" className="p-2">
                                    Aktiv
                                  </Badge>
                                ) : (
                                  <Badge variant="danger" className="p-2">
                                    Zerstört
                                  </Badge>
                                );
                              const loc = building.location
                                .substring(1, building.location.length - 1)
                                .split(",");
                              return (
                                <tr key={index} className="text-center">
                                  <td>
                                    <p className="text mb-0">{building.id}</p>
                                  </td>
                                  <td>{status}</td>
                                  <td>
                                    <p className="text mb-0">{building.stage}</p>
                                  </td>
                                  <td>
                                    <p className="text mb-0">{profile.data[0].name}</p>
                                  </td>
                                  <td>
                                    {building.players.map((player) => {
                                      return (
                                        <Badge variant="primary" className="px-2 mr-1">
                                          {player}
                                        </Badge>
                                      );
                                    })}
                                  </td>
                                  <td>
                                    <Button
                                      variant="primary"
                                      size="sm"
                                      onClick={() =>
                                        (window.location = `https://info.realliferpg.de/map?x=${loc[0]}&amp;y=${loc[1]}`)
                                      }
                                    >
                                      <FontAwesomeIcon icon={faMapMarkedAlt} className="icon" />
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr className="text-center">
                              <td colSpan="5">
                                <p className="text font-weight-bold mb-0">
                                  Keine Baustelle gefunden
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
