import { Component } from 'react';
// import { topJobs, bonus, illegalItems } from '../config.json';
import ReallifeRPG from '../ReallifeRPG';
// Components
import { Row, Col, Card, Button, Table } from 'react-bootstrap';
import { faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';
// Stylesheets
import '../style/routes/market.scss';

const reallifeRPG = new ReallifeRPG();

export default class CompanyShops extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const data = await reallifeRPG.getCompanies();
    console.log(data.data);
    this.setState({ loading: false, shops: data.data });
  }

  render() {
    const { loading, shops } = this.state;

    return (
      <div className='market'>
        <h3 className='page-title'>Warenankauf</h3>
        <Row>
          {loading ? (
            <Col xs={12} md={6} lg={4} xl={4}>
              <Card className='border-top shadow-md p-4'>
                <Loader />
              </Card>
            </Col>
          ) : shops.length > 0 ? (
            shops.map((shop, index) => {
              var loc = shop.pos.substring(1, shop.pos.length - 1).split(',');
              var shopItems = shop.shops;
              return (
                <Col key={index} xs={12} md={6} lg={4} xl={4}>
                  <Card
                    className={
                      index !== shops.length - 1
                        ? 'border-top shadow-md mb-3'
                        : 'border-top shadow-md mb-0'
                    }
                  >
                    <Card.Header className='bg-white border-0'>
                      <div className='row align-items-center justify-content-between px-2'>
                        <Card.Title className='mb-0'>{shop.company.name}</Card.Title>
                        <Button
                          variant='primary'
                          size='sm'
                          onClick={() =>
                            (window.location = `https://info.realliferpg.de/map?x=${loc[0]}&y=${loc[1]}`)
                          }
                        >
                          <FontAwesomeIcon icon={faMapMarkedAlt} className='icon' />
                        </Button>
                      </div>
                    </Card.Header>
                    <Card.Body className='p-0'>
                      <Table className='item-table no-wrap' responsive hover borderless>
                        <thead>
                          <tr>
                            <th className='pl-3'>Item</th>
                            <th className='text-right'>Stück</th>
                            <th className='text-right pr-3'>Preis</th>
                          </tr>
                        </thead>
                        <tbody>
                          {shopItems.length > 0 ? (
                            shopItems.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td className='pl-3'>
                                    <p className='mb-0'>{item.item_localized}</p>
                                  </td>
                                  <td className='text-right'>
                                    <p className='mb-0'>
                                      {item.amount.toLocaleString(undefined)} Stk.
                                    </p>
                                  </td>
                                  <td className='text-right pr-3'>
                                    <p className='mb-0'>{item.price.toLocaleString(undefined)} €</p>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan='3'>
                                <p className='text-center font-weight-bold mb-0'>
                                  Keine Angebote gefunden
                                </p>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <Col xs={12} md={6} lg={4} xl={4}>
              <Card className='border-top shadow-md p-2'>
                <Card.Header className='bg-white border-0'>
                  <Card.Title className='text-center mb-0'>Keine Unternehmen gefunden</Card.Title>
                </Card.Header>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}
