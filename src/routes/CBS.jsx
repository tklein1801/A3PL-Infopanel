import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar, Row, Col, Card, Badge, Image } from 'react-bootstrap';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';
import ReallifeRPG from '../ReallifeRPG';

export default class CBS extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  _renderCard(project) {
    return (
      <Col key={project.id} xs={12} md={6} lg={6} xl={3} className='mb-3'>
        <Card className='cbs-card'>
          <Card.Header className='p-0 border-bottom-0 bg-white position-relative'>
            <Card.Img variant='top' src={project.image} />

            <Badge
              variant='success'
              className='position-absolute p-2'
              style={{ top: '1rem', right: '1rem' }}
              onClick={() =>
                (window.location.href = `https://info.realliferpg.de/map?x=${project.map_pos_x}&y=${project.map_pos_y}`)
              }
            >
              <FontAwesomeIcon icon={faMapPin} className='icon' />
              <span className='ml-1'>
                {project.map_pos_x} / {project.map_pos_y}
              </span>
            </Badge>
          </Card.Header>
          <Card.Body>
            <Card.Title className='mb-0 font-weight-bold'>{project.title}</Card.Title>
            <Card.Text className='mb-2'>{project.desc}</Card.Text>
            <Card.Text className='font-weight-bold mb-0'>Geld gesammelt</Card.Text>
            <ProgressBar now={(project.amount * 100) / project.funding_required} />
            <Card.Text className='font-weight-bold mt-2 mb-0'>Materialien gesammelt</Card.Text>
            <Row>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_rock_u.png`}
                    alt='Rock icon'
                  />
                  {project.delivered.rock_u} / {project.rock_u}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_copper_r.png`}
                    alt='Rock icon'
                  />
                  {project.delivered.copper_r} / {project.copper_r}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_wood_r.png`}
                    alt='Wood icon'
                  />
                  {project.delivered.wood_r} / {project.wood_r}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_iron_r.png`}
                    alt='Iron icon'
                  />
                  {project.delivered.iron_r} / {project.iron_r}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_sand_u.png`}
                    alt='Sand icon'
                  />
                  {project.delivered.sand_u} / {project.sand_u}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_sand_r.png`}
                    alt='Rock icon'
                  />
                  {project.delivered.sand_r} / {project.sand_r}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_rock_r.png`}
                    alt='Rock icon'
                  />
                  {project.delivered.rock_r} / {project.rock_r}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_plastic.png`}
                    alt='Rock icon'
                  />
                  {project.delivered.plastic} / {project.plastic}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold mb-0'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_clay_r.png`}
                    alt='Clay icon'
                  />
                  {project.delivered.clay_r} / {project.clay_r}
                </p>
              </Col>
              <Col xs={6} xl={6}>
                <p className='font-weight-bold mb-0'>
                  <Image
                    className='item-icon'
                    src={`https://info.realliferpg.de/icons/ingame/market_steel.png`}
                    alt='Steel icon'
                  />
                  {project.delivered.steel} / {project.steel}
                </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  async componentDidMount() {
    const projects = await new ReallifeRPG().getCBS();
    this.setState({ cbs: projects.data, loading: false });
  }

  render() {
    const { loading, cbs } = this.state;

    return (
      <div className='cbs'>
        <h3 className='page-title'>CBS</h3>
        <Row>
          {loading ? (
            <Col xs={12} md={6} lg={6} xl={4}>
              <Card className='border-top shadow-md p-4'>
                <Loader />
              </Card>
            </Col>
          ) : cbs.length > 0 ? (
            cbs.map((project) => {
              return this._renderCard(project);
            })
          ) : (
            <Col xs={12} md={6} lg={6} xl={4}>
              <Card className='border-top'>
                <Card.Body>
                  <p className='text text-center font-weight-bold mb-0'>Kein Projekt gefunden</p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}
