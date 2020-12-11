import { Component } from "react";
import Loader from "../components/Loader";
import { Row, Col, Card, Button, Badge } from "react-bootstrap";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReallifeRPG from "../ReallifeRPG";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const streams = await new ReallifeRPG().getStreams();
    this.setState({ streams: streams, loading: false });
  }

  render() {
    const { loading, streams } = this.state;

    if (loading) {
      return <Loader />;
    } else {
      return (
        <div className="streams">
          <h1>Streams</h1>
          <Row>
            {streams.data.length > 0 ? (
              streams.data.map((stream, index) => {
                return (
                  <Col
                    key={index}
                    xs={12}
                    md={6}
                    lg={6}
                    xl={3}
                    className={index !== streams.data.length - 1 ? "mb-3" : "mb-0"}
                  >
                    <Card>
                      <Card.Header className="p-0 position-relative">
                        <Card.Img variant="top" src={stream.preview_large} />

                        <Badge
                          variant="success"
                          className="position-absolute p-2"
                          style={{ top: "1rem", right: "1rem" }}
                        >
                          <FontAwesomeIcon icon={faUsers} className="icon" />
                          <span className="ml-1">{stream.viewers}</span>
                        </Badge>
                      </Card.Header>
                      <Card.Body>
                        <Card.Title className="mb-0" style={{ fontSize: "1.3rem" }}>
                          {stream.display_name}
                        </Card.Title>
                        <Card.Text>{stream.status}</Card.Text>

                        <Button variant="primary" onClick={() => (window.location = stream.url)}>
                          Zuschauen
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            ) : (
              <Col xs={12} md={6} lg={6} xl={3}>
                <Card className="border-top">
                  <Card.Body>
                    <p className="text text-center font-weight-bold mb-0">Kein Stream gefunden</p>
                  </Card.Body>
                </Card>
              </Col>
            )}
          </Row>
        </div>
      );
    }
  }
}
