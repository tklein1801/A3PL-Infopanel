import { Component } from "react";
import { Row, Col, Card, Tab, Nav, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import { ShopItems } from "../components/Modals";
import ReallifeRPG from "../ReallifeRPG";

export default class Shops extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      shopname: null,
      shopitems: null,
      showItems: false,
    };
  }

  async componentDidMount() {
    const rlrpg = new ReallifeRPG(),
      vehicleShops = await rlrpg.getShops("vehicles"),
      itemShops = await rlrpg.getShops("items");
    this.setState({ vehicleShops: vehicleShops.data, itemShops: itemShops.data, loading: false });
  }

  renderShop(type, shop) {
    return (
      <tr
        className="text-center"
        key={shop.shoptype}
        onClick={() => this.setState({ showItems: true })}
      >
        <td>
          <p className="text font-weight-bold mb-0">{shop.shopname}</p>
        </td>
      </tr>
    );
  }

  render() {
    const { loading, vehicleShops, itemShops, shopname, shopitems, showItems } = this.state;
    console.log(this.state.showItems);
    if (loading) {
      return <Loader />;
    } else {
      return (
        <div className="shops">
          <h1>Händler</h1>
          <Row>
            <Col xs={12} md={12} lg={6} xl={4}>
              <Card className="border-top shadow-md">
                <Tab.Container defaultActiveKey="vehicles">
                  <div className="nav-container rounded">
                    <Nav variant="pills">
                      <Nav.Link eventKey="vehicles">Fahrzeuge</Nav.Link>
                      <Nav.Link eventKey="items">Items</Nav.Link>
                    </Nav>
                  </div>
                  <Tab.Content>
                    <Tab.Pane eventKey="vehicles">
                      <Table>
                        <tbody>
                          {vehicleShops.map((shop) => {
                            return this.renderShop("vehicles", shop);
                          })}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                    <Tab.Pane eventKey="items">
                      <Table>
                        <tbody>
                          {itemShops.map((shop) => {
                            return this.renderShop("items", shop);
                          })}
                        </tbody>
                      </Table>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card>
            </Col>
          </Row>

          <ShopItems shown={showItems} shopname={shopname} items={shopitems} />
        </div>
      );
    }
  }
}
