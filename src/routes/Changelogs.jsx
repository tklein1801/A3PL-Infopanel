import { Component } from 'react';
import { Row, Col, Accordion, Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Loader from '../components/Loader';
import ReallifeRPG from '../ReallifeRPG';

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
      <div className='changelogs'>
        <h3 className='page-title'>Changelogs</h3>
        <Row>
          <Col md={6}>
            {loading ? (
              <Card className='border-top shadow-md p-4'>
                <Loader />
              </Card>
            ) : (
              <Card className='border-top shadow-md bg-light'>
                <Accordion defaultActiveKey='0'>
                  {changelogs.data.map((changelog, index) => {
                    const releaseAt = new Date(changelog.release_at),
                      release = {
                        date: releaseAt.getDate(),
                        month: releaseAt.getMonth() + 1,
                        year: releaseAt.getFullYear(),
                        hours: releaseAt.getHours(),
                        minutes: releaseAt.getMinutes(),
                      };
                    return (
                      <Card className={index === 0 ? 'mt-1' : null}>
                        <Card.Header>
                          <Row className='mx-0'>
                            <Accordion.Toggle
                              as={Button}
                              variant='link'
                              eventKey={index + 1}
                              className='text font-weight-bold text-decoration-none text-dark px-0'
                            >
                              Update {changelog.version}
                            </Accordion.Toggle>

                            <OverlayTrigger
                              placement={'top'}
                              overlay={
                                <Tooltip>
                                  Verfügbar ab{' '}
                                  {release.date > 9 ? release.date : `0${release.date}`}.
                                  {release.month > 9 ? release.month : `0${release.month}`}.
                                  {release.year > 9 ? release.year : `0${release.year}`} @{' '}
                                  {release.hours > 9 ? release.hours : `0${release.hours}`}:
                                  {release.minutes > 9 ? release.minutes : `0${release.minutes}`}{' '}
                                  Uhr
                                </Tooltip>
                              }
                            >
                              <Accordion.Toggle
                                as={Button}
                                variant='link'
                                eventKey={index + 1}
                                className='text font-weight-bold text-decoration-none text-dark px-0 ml-auto'
                              >
                                {release.date > 9 ? release.date : `0${release.date}`}.
                                {release.month > 9 ? release.month : `0${release.month}`}.
                                {release.year > 9 ? release.year : `0${release.year}`} @{' '}
                                {release.hours > 9 ? release.hours : `0${release.hours}`}:
                                {release.minutes > 9 ? release.minutes : `0${release.minutes}`} Uhr
                              </Accordion.Toggle>
                            </OverlayTrigger>
                          </Row>
                        </Card.Header>
                        <Accordion.Collapse eventKey={index + 1}>
                          <Card.Body>
                            {changelog.note !== '' ? (
                              <div className='p-3 mb-2 bg-light rounded'>{changelog.note}</div>
                            ) : null}

                            {changelog.change_mission.length > 0 ? (
                              <h5 className='text font-weight-bold'>Mission</h5>
                            ) : null}
                            {changelog.change_mission.length > 0 ? (
                              <ul>
                                {changelog.change_mission.map((change) => {
                                  return <li>{change}</li>;
                                })}
                              </ul>
                            ) : null}

                            {changelog.change_map.length > 0 ? (
                              <h5 className='text font-weight-bold'>Karte</h5>
                            ) : null}
                            {changelog.change_map.length > 0 ? (
                              <ul>
                                {changelog.change_map.map((change) => {
                                  return <li>{change}</li>;
                                })}
                              </ul>
                            ) : null}

                            {changelog.change_mod.length > 0 ? (
                              <h5 className='text font-weight-bold'>Mod</h5>
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
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
