import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

class SetKeyModal extends Component {
  constructor(props) {
    super();
    this.state = {
      shown: props.shown,
    };
  }
  handleClose = () => {
    this.setState({ shown: false });
  };

  handleShow = () => {
    this.setState({ shown: true });
  };

  handleInput = (event) => {
    let val = event.target.value;
    this.setState({ input: val });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { input } = this.state;
    localStorage.setItem("@dag_apiKey", input);
    this.handleClose();
    window.location.reload(false);
  };

  render() {
    const { shown } = this.state;

    return (
      <Modal show={shown} onHide={this.handleClose} backdrop="static" size="md" centered>
        <Modal.Header /*closeButton*/>
          <Modal.Title id="contained-modal-title-vcenter">Einstellungen</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body className="pb-0">
            <Form.Group as={Row} className="align-items-center">
              <Form.Label column sm={3}>
                <strong>API-Key</strong>
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  value={localStorage.getItem("@dag_apiKey")}
                  onChange={this.handleInput}
                />
              </Col>
            </Form.Group>
            <div id="key-disclaimer">
              <strong>Achtung</strong> <br />
              <i>
                Der API-Key wird nur im lokalen Speicher deines Gerätes gespeichert. Die{" "}
                <a href="https://dulliag.de">DulliAG</a> hat keinen Zugriff auf deinen API-Key.
                Außerdem hast du die Möglichkeit den API-Key in den{" "}
                <a href="../Einstellungen/">Einstellungen</a> aus deinem lokalen Speicher zu
                löschen.
              </i>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="white"
              className="px-3"
              onClick={
                () =>
                  window.location.reload(
                    false
                  ) /*we're gonna reload the page to prevent erros when the user haven't set an key*/
              }
            >
              Abbrechen
            </Button>
            <Button variant="primary" className="px-3" type="submit">
              Speichern
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export { SetKeyModal };
