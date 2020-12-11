import { Component } from "react";
import Loader from "../components/Loader";
import { Row, Col, Form, Card, Button } from "react-bootstrap";
import { version, description, bugs } from "../../package.json";

export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  submitSettings = (event) => {
    event.preventDefault();
    const newKey = this.state.apiKey,
      originalKey = this.state.originalKey;
    if (newKey !== originalKey) {
      localStorage.setItem("@dag_apiKey", newKey);
      window.location.reload();
    }
  };

  componentDidMount() {
    const apiKey = localStorage.getItem("@dag_apiKey");
    this.setState({ originalKey: apiKey, apiKey: apiKey });
  }

  render() {
    const { loading, apiKey } = this.state;

    if (loading) {
      return <Loader />;
    } else {
      return (
        <div className="settings">
          <h1>Einstellungen</h1>
          <Row>
            <Col xs={12} md={6} lg={6} xl={4} className="mb-3">
              <Card className="shadow-md border-top">
                <Card.Header className="border-bottom-0 bg-white pb-0">
                  <Card.Title className="mb-0">Einstellungen</Card.Title>
                </Card.Header>
                <Card.Body className="pt-0">
                  <Form onSubmit={this.submitSettings}>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                      <Form.Label column sm="3">
                        API-Key
                      </Form.Label>
                      <Col sm="9">
                        <Form.Control
                          type="text"
                          placeholder="API-Key"
                          value={apiKey}
                          onChange={(e) => this.setState({ apiKey: e.target.value })}
                        />
                      </Col>
                    </Form.Group>
                    <i>
                      Der API-Key wird nur im lokalen Speicher deines Gerätes gespeichert. Die{" "}
                      <a href="https://dulliag.de">DulliAG</a> hat keinen Zugriff auf deinen
                      API-Key. Außerdem hast du die Möglichkeit den API-Key aus deinem lokalen
                      Speicher zu löschen.
                    </i>
                    <Form.Group as={Row} className="mx-0 mb-0">
                      <Button
                        variant="danger"
                        className="ml-auto mr-3"
                        onClick={() => {
                          localStorage.removeItem("@dag_apiKey");
                          window.location.reload();
                        }}
                      >
                        Löschen
                      </Button>
                      <Button type="submit" variant="primary">
                        Speichern
                      </Button>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={6} xl={4} className="mb-3">
              <Card className="shadow-md border-top">
                <Card.Header className="border-bottom-0 bg-white pb-0">
                  <Card.Title className="mb-0">Arma-Infopanel</Card.Title>
                </Card.Header>
                <Card.Body className="pt-0">
                  <Card.Text className="mb-0">
                    Dieses Infopanel gehört nicht zu{" "}
                    <a href="https://realliferpg.de">ReallifeRPG</a>. Das offizielle Infopanel kann{" "}
                    <a href="https://info.realliferpg.de">hier</a> gefunden werden.
                    <p className="text mb-0">
                      <strong className="mb-0">Version: {version}</strong> <br />
                      <strong className="mb-0">Beschreibung</strong> <br />
                      {description}
                      <br />
                      <strong className="mb-0">GitHub:</strong> <a href={bugs.url}>Repository</a>
                      <br />
                      <strong className="mb-0">Fehler & Verbesserungen</strong>{" "}
                      <a href={bugs.url}>hier</a> einreichen
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} lg={6} xl={4}>
              <Card className="shadow-md border-top mb-3">
                <Card.Header className="border-bottom-0 bg-white pb-0">
                  <Card.Title className="mb-0">DulliAG</Card.Title>
                </Card.Header>
                <Card.Body className="pt-0">
                  <Card.Text className="mb-0">
                    Dieses Infopanel wurde von der <a href="https://dulliag.de">DulliAG</a>{" "}
                    entwickelt und ist als Open-Source Projekt auf{" "}
                    <a href="https://github.com/tklein1801/Arma-Infopanel">GitHub</a> eingesehen
                    werden. Für Rückfragen könnt ihr uns unter dieser{" "}
                    <a href="mailto: contact@dulliag.de">E-Mail Adresse</a> erreichen.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="shadow-md border-top">
                <Card.Header className="border-bottom-0 bg-white pb-0">
                  <Card.Title className="mb-0">ReallifeRPG</Card.Title>
                </Card.Header>
                <Card.Body className="pt-0">
                  <Card.Text className="mb-0">
                    Dieses Infopanel gehört nicht zu{" "}
                    <a href="https://realliferpg.de">ReallifeRPG</a>. Das offizielle Infopanel kann{" "}
                    <a href="https://info.realliferpg.de">hier</a> gefunden werden.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      );
    }
  }
}
