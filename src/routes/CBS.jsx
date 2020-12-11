import { Component } from "react";
import { ProgressBar, Row, Col, Accordion, Card, Button, Badge } from "react-bootstrap";
import Loader from "../components/Loader";
import ReallifeRPG from "../ReallifeRPG";

export default class CBS extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    const projects = await new ReallifeRPG().getCBS();
    this.setState({ cbs: projects.data, loading: false });
  }

  render() {
    const { loading, cbs } = this.state;

    return (
      <div className="cbs">
        <h1>CBS</h1>
        <Row>
          {loading ? (
            <Col xs={12} md={6} lg={6} xl={4}>
              <Card className="border-top shadow-md p-4">
                <Loader />
              </Card>
            </Col>
          ) : cbs.length > 0 ? (
            cbs.map((project, index) => {
              return (
                <Col xs={12} md={6} lg={6} xl={4}>
                  <Accordion defaultActiveKey={index + 1}>
                    <Card className="border-top shadow-md">
                      <Card.Header>
                        <Accordion.Toggle
                          as={Button}
                          variant="link"
                          eventKey={index + 1}
                          className="text font-weight-bold text-decoration-none text-dark px-0"
                        >
                          {project.title}
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index + 1}>
                        <Card.Body>
                          <div className="position-relative">
                            <img
                              className="rounded shadow-md"
                              src={project.image}
                              alt={project.title}
                            />
                            <Badge
                              variant="primary"
                              className="p-2 position-absolute top-1 right-1"
                            >
                              {project.finished === 1 ? "Abgeschlossen" : "Aktiv"}
                            </Badge>
                          </div>

                          <ProgressBar
                            variant="primary"
                            animated
                            now={(project.amount * 100) / project.funding_required}
                          />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Col>
              );
            })
          ) : (
            <Col xs={12} md={6} lg={6} xl={4}>
              <Card className="border-top">
                <Card.Body>
                  <p className="text text-center font-weight-bold mb-0">Kein Projekt gefunden</p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </div>
    );
  }
}
