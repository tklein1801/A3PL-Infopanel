import { Component } from "react";
import { Row, Col, Accordion, Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import Loader from "../components/Loader";
import ReallifeRPG from "../ReallifeRPG";

export default class Changelogs extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const changelogs = await new ReallifeRPG().getChangelogs();
    this.setState({ changelogs: changelogs, loading: false });
  }

  render() {
    const { changelogs, loading } = this.state;

    return (
      <div className="changelogs">
        <h1>Changelogs</h1>
        <Row>
          <Col md={6}>
            {loading ? (
              <Card className="border-top shadow-md p-5">
                <Loader />
              </Card>
            ) : (
              <Accordion defaultActiveKey="1">
                {changelogs.data.map((changelog, index) => {
                  const releaseAt = new Date(changelog.release_at),
                    release = {
                      date: releaseAt.getDate(),
                      month: releaseAt.getMonth() + 1,
                      year: releaseAt.getFullYear(),
                      hours: releaseAt.getHours(),
                      minutes: releaseAt.getMinutes(),
                    },
                    createdAt = new Date(changelog.created_at),
                    created = {
                      date: createdAt.getDate(),
                      month: createdAt.getMonth() + 1,
                      year: createdAt.getFullYear(),
                      hours: createdAt.getHours(),
                      minutes: createdAt.getMinutes(),
                    };
                  return (
                    <Card className={index === 0 ? "border-top" : null}>
                      <Card.Header>
                        <Row className="mx-0">
                          <Accordion.Toggle
                            as={Button}
                            variant="link"
                            eventKey={index + 1}
                            className="text font-weight-bold text-decoration-none text-dark px-0"
                          >
                            Update {changelog.version}
                          </Accordion.Toggle>

                          <OverlayTrigger
                            placement={"top"}
                            overlay={
                              <Tooltip>
                                Verfügbar ab {created.date > 9 ? created.date : `0${created.date}`}.
                                {created.month > 9 ? created.month : `0${created.month}`}.
                                {created.year > 9 ? created.year : `0${created.year}`} @{" "}
                                {created.hours > 9 ? created.hours : `0${created.hours}`}:
                                {created.minutes > 9 ? created.minutes : `0${created.minutes}`} Uhr
                              </Tooltip>
                            }
                          >
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey={index + 1}
                              className="text font-weight-bold text-decoration-none text-dark px-0 ml-auto"
                            >
                              {created.date > 9 ? created.date : `0${created.date}`}.
                              {created.month > 9 ? created.month : `0${created.month}`}.
                              {created.year > 9 ? created.year : `0${created.year}`} @{" "}
                              {created.hours > 9 ? created.hours : `0${created.hours}`}:
                              {created.minutes > 9 ? created.minutes : `0${created.minutes}`} Uhr
                            </Accordion.Toggle>
                          </OverlayTrigger>
                        </Row>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index + 1}>
                        <Card.Body>
                          {changelog.note !== "" ? (
                            <div className="p-3 mb-2 bg-light rounded">{changelog.note}</div>
                          ) : null}

                          {changelog.change_mission.length > 0 ? (
                            <h5 className="text font-weight-bold">Mission</h5>
                          ) : null}
                          {changelog.change_mission.length > 0 ? (
                            <ul>
                              {changelog.change_mission.map((change) => {
                                return <li>{change}</li>;
                              })}
                            </ul>
                          ) : null}

                          {changelog.change_map.length > 0 ? (
                            <h5 className="text font-weight-bold">Mod</h5>
                          ) : null}
                          {changelog.change_map.length > 0 ? (
                            <ul>
                              {changelog.change_map.map((change) => {
                                return <li>{change}</li>;
                              })}
                            </ul>
                          ) : null}

                          {changelog.change_mod.length > 0 ? (
                            <h5 className="text font-weight-bold">Karte</h5>
                          ) : null}
                          {changelog.change_mod.length > 0 ? (
                            <ul>
                              {changelog.change_mod.map((change) => {
                                return <li>{change}</li>;
                              })}
                            </ul>
                          ) : null}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  );
                })}
              </Accordion>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
