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
import RLRPG_LOGO from "../img/rlrpg-logo.png";
// Stylesheets
import "../style/routes/profile.scss";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  _renderBuilding = (profile, building) => {
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
    const loc = building.location.substring(1, building.location.length - 1).split(",");
    return (
      <tr key={building.id} className="text-center">
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
  };

  _renderRental = (profile, rental) => {
    <tr key={rental.id} className="text-center">
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
    </tr>;
  };

  _renderHouse = (profile, house) => {
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
    const loc = house.location.substring(1, house.location.length - 1).split(",");
    return (
      <tr key={house.id} className="text-center">
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
              (window.location = `https://info.realliferpg.de/map?x=${loc[0]}&y=${loc[1]}`)
            }
          >
            <FontAwesomeIcon icon={faMapMarkedAlt} className="icon" />
          </Button>
        </td>
      </tr>
    );
  };

  _renderVehicle = (vehicle) => {
    var type, status, fraction;
    // Vehicle type
    if (vehicle.type === "Ship") {
      type = <FontAwesomeIcon icon={faShip} className="icon" />;
    } else if (vehicle.type === "Air") {
      type = <FontAwesomeIcon icon={faPlane} className="icon" />;
    } else {
      type = <FontAwesomeIcon icon={faCar} className="icon" />;
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
    const vehiclePlate = vehicle.plate,
      formattedPlate = `${vehiclePlate.substring(0, 2)} ${vehiclePlate.substring(
        2,
        4
      )} ${vehiclePlate.substring(4, 8)}`;
    return vehicle.alive === 1 ? (
      <tr key={vehicle.id} className="text-center">
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
            {formattedPlate}
          </Badge>
        </td>
        <td>
          <p className="text mb-0">{vehicle.kilometer_total.toLocaleString(undefined)} Km</p>
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
    ) : null;
  };

  _renderCompany = (company) => {
    const createdAt = new Date(company.created_at);
    const createDate = {
      day: createdAt.getDate() > 9 ? createdAt.getDate() : `0${createdAt.getDate()}`,
      month:
        createdAt.getMonth() + 1 > 9 ? createdAt.getMonth() + 1 : `0${createdAt.getMonth() + 1}`,
      year: createdAt.getFullYear(),
      hours: createdAt.getHours() > 9 ? createdAt.getHours() : `0${createdAt.getHours()}`,
      minutes: createdAt.getMinutes() > 9 ? createdAt.getMinutes() : `0${createdAt.getMinutes()}`,
    };
    return (
      <Col xs={12} md={12} lg={6} xl={6} className="company-container">
        <div className="card bg-light rounded p-3">
          <h4 className="text-center font-weight-bold">{company.name}</h4>
          <Row className="text-center mt-3">
            <Col xs={12} md={12} lg={6} xl={6}>
              <h6 className="font-weight-bold mb-0">Bankkonto 1</h6>
              <p>{company.bank_1}</p>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6}>
              <h6 className="font-weight-bold mb-0">Bankkonto 2</h6>
              <p>{company.bank_2}</p>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6}>
              <h6 className="font-weight-bold mb-0">Telefonnummer</h6>
              <p className="mb-0">{company.phone}</p>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6}>
              <h6 className="font-weight-bold mb-0">Gegründet am</h6>
              <p className="mb-0">
                {createDate.day}.{createDate.month}.{createDate.year} um {createDate.hours}:
                {createDate.minutes} Uhr
              </p>
            </Col>
          </Row>
        </div>
      </Col>
    );
  };

  _renderCreditCard = (company = false, owner, iban, balance) => {
    return (
      <div key={iban} className={company === true ? "credit-card company" : "credit-card private"}>
        <img src={RLRPG_LOGO} alt="ReallifeRPG Logo" />
        <h4 className="text font-weight-bold">NH-Bank</h4>
        <Form.Group className="mb-3">
          <Form.Label>IBAN</Form.Label>
          <Form.Control type="text" value={iban} disabled />
        </Form.Group>
        <Form.Row>
          <Col xs={7}>
            <Form.Group>
              <Form.Label>Inhaber</Form.Label>
              <Form.Control type="text" value={owner} disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Kontostand</Form.Label>
              <Form.Control type="text" value={balance} disabled />
            </Form.Group>
          </Col>
        </Form.Row>
      </div>
    );
  };

  async componentDidMount() {
    const apiKey = localStorage.getItem("@dag_apiKey"),
      rlrpg = new ReallifeRPG(),
      player = await rlrpg.getProfile(apiKey),
      vehicles = await rlrpg.getPlayerVehicles(apiKey),
      ownedCompanies = player.data[0].company_owned.filter((company) => company.disabled === 0);
    this.setState({
      profile: player,
      vehicles: vehicles,
      companies: ownedCompanies,
      loading: false,
    });
  }

  render() {
    const { loading, profile, vehicles, companies } = this.state;

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

                  <div className="item mb-3">
                    <p>Zuletzt online</p>
                    <p>
                      {lsDate.days > 9 ? lsDate.days : `0${lsDate.days}`}.
                      {lsDate.month > 9 ? lsDate.month : `0${lsDate.month}`}.
                      {lsDate.year > 9 ? lsDate.year : `0${lsDate.year}`} um{" "}
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
                      {companies.length > 0 && (
                        <Nav.Link eventKey="owned-companies">Unternehmen</Nav.Link>
                      )}
                      <Nav.Link eventKey="vehicles">Fahrzeuge</Nav.Link>
                      <Nav.Link eventKey="properties">Immobilien</Nav.Link>
                    </Nav>
                  </div>
                  <Tab.Content>
                    <Tab.Pane eventKey="bank-accounts">
                      <Alert message="Hier werden nur die Firmenkonten von aktiven Firmen angezeigt!" />
                      <Row className="pr-3 pb-3 pl-3">
                        {profile.data[0].bank_main.map((acc) => {
                          return (
                            <Col
                              xs={12}
                              md={12}
                              lg={6}
                              xl={4}
                              className="mb-3 mb-md-0 credit-card-container"
                            >
                              {this._renderCreditCard(
                                false,
                                acc.pid,
                                acc.iban,
                                `${acc.balance.toLocaleString(undefined)} €`
                              )}
                            </Col>
                          );
                        })}
                        {companies.map((company) => {
                          return (
                            <>
                              <Col
                                xs={12}
                                md={12}
                                lg={6}
                                xl={4}
                                className="mb-3 mb-md-0 credit-card-container"
                              >
                                {this._renderCreditCard(
                                  true,
                                  company.name,
                                  company.bank_1,
                                  "UNBEKANNT"
                                )}
                              </Col>
                              <Col
                                xs={12}
                                md={12}
                                lg={6}
                                xl={4}
                                className="mb-3 mb-md-0 credit-card-container"
                              >
                                {this._renderCreditCard(
                                  true,
                                  company.name,
                                  company.bank_2,
                                  "UNBEKANNT"
                                )}
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    </Tab.Pane>
                    {companies.length > 0 && (
                      <Tab.Pane eventKey="owned-companies">
                        <Alert message="Hier werden nur aktive Firmen angezeigt!" />
                        <Row className="pr-3 pb-3 pl-3">
                          {companies.length > 0 ? (
                            companies.map((company) => {
                              return this._renderCompany(company);
                            })
                          ) : (
                            <div className="rounded-light p-3">
                              <p className="text-center font-weight-bold mb-0">
                                Keine Unternehmen gefunden
                              </p>
                            </div>
                          )}
                        </Row>
                      </Tab.Pane>
                    )}
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
                            vehicles.data.map((vehicle) => {
                              return this._renderVehicle(vehicle);
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
                      <Alert message="Hier werden nur Immobilien, Appartments & Baustellen angezeigt für welche du einen Schlüssel besitzt!" />

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
                            profile.data[0].houses.map((house) => {
                              return this._renderHouse(profile, house);
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
                            profile.data[0].rentals.map((rental) => {
                              return this._renderRental(profile, rental);
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
                            profile.data[0].buildings.map((building) => {
                              return this._renderBuilding(profile, building);
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
