import React, { Component } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import ReallifeRPG from "../ReallifeRPG";

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

class ShopItems extends Component {
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

  render() {
    const { shown } = this.state;
    const { shopname, shopitems } = this.props;

    return (
      <Modal show={shown} onHide={this.handleClose} backdrop="static" size="md" centered>
        <Modal.Header /*closeButton*/>
          <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="white" className="px-3">
              Schließen
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

class InsertContact extends Component {
  constructor(props) {
    super();
    this.state = {
      shown: props.shown,
      loading: true,
    };
  }
  handleClose = () => {
    this.setState({ shown: false });
  };

  handleShow = () => {
    this.setState({ shown: true });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { phone } = event.target.elements;
  };

  async componentDidMount() {
    const apiKey = localStorage.getItem("@dag_apiKey");
    const player = await new ReallifeRPG().getProfile(apiKey);
    this.setState({ name: player.data[0].name, loading: false });
  }

  render() {
    const { shown, loading, name } = this.state;

    if (loading) {
      return null;
    } else {
      return (
        <Modal show={shown} onHide={this.handleClose} backdrop="static" size="md" centered>
          <Modal.Header /*closeButton*/>
            <Modal.Title id="contained-modal-title-vcenter">Kontakt erstellen</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Body className="pb-0">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" value={name} readOnly />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Telefon
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    name="phone"
                    placeholder="Telefonnummer eintragen"
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  IBAN
                </Form.Label>
                <Col sm={10}>
                  <Form.Control type="text" placeholder="IBAN eintragen" disabled />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="white" className="px-3">
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
}

class RemoveContact extends Component {}

export { SetKeyModal, ShopItems, InsertContact, RemoveContact };
