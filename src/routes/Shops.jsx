import { Component } from 'react';
import { Row, Col, Card, Tab, Nav, Table, Modal, Button } from 'react-bootstrap';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Loader from '../components/Loader';
import ReallifeRPG from '../ReallifeRPG';

export default class Shops extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      loadingItems: true,
      itemModal: false,
    };
  }

  handleOpen = () => this.setState({ itemModal: true });

  handleClose = () => this.setState({ itemModal: false, loadingItems: true });

  renderShopItem(category, item) {
    if (category === 'vehicles') {
      return (
        <tr className='text-center'>
          <td className='text font-weight-bold'>{item.name}</td>
          <td>{item.level}</td>
          <td>{item.v_space} Kg.</td>
          <td className='text font-weight-bold'>{item.price.toLocaleString(undefined)} €</td>
        </tr>
      );
    } else if (category === 'items') {
      return (
        <tr className='text-center'>
          <td className='text font-weight-bold'>{item.name}</td>
          <td>{item.level}</td>
          <td className='text font-weight-bold'>{item.price.toLocaleString(undefined)} €</td>
        </tr>
      );
    }
  }

  async getShopItems(category, shop) {
    this.handleOpen();
    const items = await new ReallifeRPG().getShopItems(category, shop.shoptype);
    const tableCells =
      category === 'vehicles'
        ? ['Item', 'Level', 'Kapazität', 'Preis']
        : ['Item', 'Level', 'Preis'];
    this.setState({
      shopItems: items.data,
      tableCells: tableCells,
      shopCategory: category,
      loadingItems: false,
    });
  }

  renderShop(category, shop) {
    return (
      <tr
        className='text-center'
        key={shop.shoptype}
        onClick={() => this.getShopItems(category, shop)}
      >
        <td>
          <p className='text font-weight-bold mb-0'>{shop.shopname}</p>
        </td>
      </tr>
    );
  }

  async componentDidMount() {
    const rlrpg = new ReallifeRPG(),
      vehicleShops = await rlrpg.getShops('vehicles'),
      itemShops = await rlrpg.getShops('items');
    this.setState({ vehicleShops: vehicleShops.data, itemShops: itemShops.data, loading: false });
  }

  render() {
    const {
      loading,
      loadingItems,
      vehicleShops,
      itemShops,
      itemModal,
      tableCells,
      shopItems,
      shopCategory,
    } = this.state;

    return (
      <div className='shops'>
        <h3 className='page-title'>Händler</h3>
        <Row>
          <Col xs={12} md={12} lg={6} xl={4}>
            {loading ? (
              <Card className='border-top shadow-md p-4'>
                <Loader />
              </Card>
            ) : (
              <Card className='border-top shadow-md'>
                <Tab.Container defaultActiveKey='vehicles'>
                  <div className='nav-container rounded'>
                    <Nav variant='pills'>
                      <Nav.Link eventKey='vehicles'>Fahrzeuge</Nav.Link>
                      <Nav.Link eventKey='items'>Items</Nav.Link>
                    </Nav>
                  </div>
                  <Tab.Content>
                    <Tab.Pane eventKey='vehicles'>
                      <Table id='vehicle-table'>
                        <tbody>
                          {vehicleShops.map((shop) => {
                            return this.renderShop('vehicles', shop);
                          })}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                    <Tab.Pane eventKey='items'>
                      <Table id='item-table'>
                        <tbody>
                          {itemShops.map((shop) => {
                            return this.renderShop('items', shop);
                          })}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card>
            )}
          </Col>
        </Row>

        <Modal show={itemModal} onHide={this.handleClose} size='lg' centered>
          <Modal.Header>
            <Modal.Title id='contained-modal-title-vcenter'>Angebot</Modal.Title>
            <button className='close-btn' onClick={this.handleClose}>
              <FontAwesomeIcon icon={faTimes} className='icon' />
            </button>
          </Modal.Header>
          <Modal.Body className='p-0'>
            {loadingItems ? (
              <Loader />
            ) : (
              <Table className='no-wrap' responsive hover borderless size='sm'>
                <thead>
                  <tr className='text-center'>
                    {tableCells.map((cell) => {
                      return <th key={cell}>{cell}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {shopItems.map((item) => {
                    return this.renderShopItem(shopCategory, item);
                  })}
                </tbody>
              </Table>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant='white' className='px-3' onClick={this.handleClose}>
              Schließen
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
