import React, { Component } from "react";
import Loader from "../components/Loader";
import { Card, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { faCreditCard, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Stylesheets
import ReallifeRPG from "../ReallifeRPG";

export default class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  _renderNoContent = (message) => {
    return (
      <div className="bg-light rounded p-3 mb-3">
        <p className="text text-center font-weight-bold mb-0">{message}</p>
      </div>
    );
  };

  _renderPhoneNumber = (phoneNumber) => {
    return (
      <div className="bg-light mb-3 rounded p-2" key={phoneNumber.phone}>
        <Row>
          <Col xs={12} md={12} lg={6} xl={6}>
            <p className="text text-center font-weight-bold mb-0">
              {phoneNumber.note === "default" ? "Standardnummer" : phoneNumber.note}
            </p>
          </Col>
          <Col xs={12} md={12} lg={6} xl={6} className="border-right-2">
            <p className="text text-center font-weight-bold mb-0">
              <FontAwesomeIcon icon={faPhone} className="icon mr-2" />
              {phoneNumber.phone}
            </p>
          </Col>
        </Row>
      </div>
    );
  };

  _renderContact = (contact) => {
    return (
      <div className="bg-light mb-3 rounded p-2" key={contact.name}>
        <Row>
          <Col xs={12} md={12} lg={12} xl={12}>
            <p className="text text-center font-weight-bold mb-0">{contact.name}</p>
          </Col>
          <Col xs={12} md={12} lg={6} xl={6} className="border-right-2">
            <p className="text text-center font-weight-bold mb-0 mb-2">
              <FontAwesomeIcon icon={faPhone} className="icon mr-2" />
              {contact.number}
            </p>
          </Col>
          <Col xs={12} md={12} lg={6} xl={6}>
            <p className="text text-center font-weight-bold mb-0">
              <FontAwesomeIcon icon={faCreditCard} className="icon mr-2" />
              {contact.iban !== "" ? contact.iban : "Keine Angabe"}
            </p>
          </Col>
        </Row>
      </div>
    );
  };

  filterContacts = (event) => {
    const { contacts } = this.state;
    const keyword = event.target.value;
    const result = contacts.filter((contact) => {
      const playerName = contact.name.toLowerCase();
      return playerName.includes(keyword.toLowerCase());
    });
    this.setState({ displayedContacts: result });
  };

  async componentDidMount() {
    const apiKey = localStorage.getItem("@dag_apiKey");
    const profile = await new ReallifeRPG().getProfile(apiKey);
    const phonebook = profile.data[0].phonebooks[0].phonebook;
    const phoneNumbers = profile.data[0].phones;
    this.setState({
      contacts: phonebook,
      displayedContacts: phonebook,
      phoneNumbers: phoneNumbers,
      loading: false,
    });
  }

  render() {
    const { loading, displayedContacts, phoneNumbers } = this.state;
    return (
      <div className="contacts">
        <h3 className="page-title">Kontaktbuch</h3>
        <Row>
          <Col xs={12} md={12} lg={6} xl={4}>
            {loading ? (
              <Card className="border-top shadow-md p-5">
                <Loader />
              </Card>
            ) : (
              <Card className="border-top shadow-md mb-3 mb-md-0">
                <Card.Header className="bg-white border-bottom-0 pb-0">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      placeholder="Kontakt suchen"
                      onChange={this.filterContacts}
                    />
                  </InputGroup>
                </Card.Header>
                <Card.Body className="pb-0 pt-0">
                  {displayedContacts.length > 0
                    ? displayedContacts.map((contact) => {
                        return this._renderContact(contact);
                      })
                    : this._renderNoContent("Keine Kontakte gefunden")}
                </Card.Body>
              </Card>
            )}
          </Col>

          <Col xs={12} md={12} lg={6} xl={4}>
            {loading ? (
              <Card className="border-top shadow-md p-5">
                <Loader />
              </Card>
            ) : (
              <Card className="border-top shadow-md">
                <Card.Header className="bg-white border-bottom-0 pb-0">
                  <Card.Title>Telefonnummern</Card.Title>
                </Card.Header>
                <Card.Body className="pb-0 pt-0">
                  {phoneNumbers.length > 0
                    ? phoneNumbers.map((phoneNumber) => {
                        return this._renderPhoneNumber(phoneNumber);
                      })
                    : this._renderNoContent("Keine Telefonnummern gefunden")}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
