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
    var profileData = profile.data[0];
    var phonebook = profileData.phonebooks[0].phonebook;
    var phonebooks = profileData.phonebooks;
    var phoneNumbers = profileData.phones;
    phoneNumbers = phoneNumbers.filter((number) => number.disabled === 0);
    this.setState({
      contacts: phonebook,
      displayedContacts: phonebook,
      phonebooks: phonebooks,
      phoneNumbers: phoneNumbers,
      loading: false,
    });
  }

  render() {
    const { loading, displayedContacts, phonebooks, phoneNumbers } = this.state;

    const Contact = ({ name, iban, phone }) => {
      return (
        <div className="bg-light mb-3 rounded p-2">
          <Row>
            <Col xs={12} md={12} lg={12} xl={12}>
              <p className="text text-center font-weight-bold mb-0">{name}</p>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} className="border-right-2">
              <p className="text text-center font-weight-bold mb-0 mb-2">
                <FontAwesomeIcon icon={faPhone} className="icon mr-2" />
                {phone}
              </p>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6}>
              <p className="text text-center font-weight-bold mb-0">
                <FontAwesomeIcon icon={faCreditCard} className="icon mr-2" />
                {iban !== "" ? iban : "Keine Angabe"}
              </p>
            </Col>
          </Row>
        </div>
      );
    };

    const PhoneNumber = ({ note, phone }) => {
      return (
        <div className="bg-light mb-3 rounded p-2">
          <Row>
            <Col xs={12} md={12} lg={6} xl={6}>
              <p className="text text-center font-weight-bold mb-0">
                {note === "default" ? "Standardnummer" : note}
              </p>
            </Col>
            <Col xs={12} md={12} lg={6} xl={6} className="border-right-2">
              <p className="text text-center font-weight-bold mb-0">
                <FontAwesomeIcon icon={faPhone} className="icon mr-2" />
                {phone}
              </p>
            </Col>
          </Row>
        </div>
      );
    };

    const NoContent = ({ message }) => {
      return (
        <div className="bg-light rounded p-3 mb-3">
          <p className="text text-center font-weight-bold mb-0">{message}</p>
        </div>
      );
    };

    return (
      <div className="contacts">
        <h3 className="page-title">Kontaktbuch</h3>
        <Row>
          {loading ? (
            <Col xs={12} md={12} lg={6} xl={4}>
              <Card className="border-top shadow-md p-5">
                <Loader />
              </Card>
            </Col>
          ) : (
            phonebooks.map((book) => {
              var side = book.side;
              if (side === "CIV") {
                side = "Zivilist";
              } else if (side === "COP") {
                side = "Polizei";
              } else if (side === "EAST") {
                side = "RAC";
              } else if (side === "MEDIC" || side === "GUER") {
                side = "Abramier";
              } else {
                side = "Unbekannt";
              }
              var contactList = book.phonebook;
              return (
                <Col xs={12} md={12} lg={6} xl={4}>
                  <Card className="border-top shadow-md mb-3 mb-md-0">
                    <Card.Header className="bg-white border-bottom-0 pb-0">
                      <Card.Title>{side}</Card.Title>
                    </Card.Header>
                    <Card.Body className="pb-0 pt-0">
                      {contactList.length > 0 ? (
                        contactList.map((contact) => {
                          return (
                            <Contact
                              phone={contact.number}
                              iban={contact.iban}
                              name={contact.name}
                            />
                          );
                        })
                      ) : (
                        <NoContent message="Keine Kontakte gefunden" />
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}

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
                  {phoneNumbers.length > 0 ? (
                    phoneNumbers.map((phone, index) => {
                      var note;
                      switch (phone.note) {
                        case "default":
                          note = "Standardnummer";
                          break;

                        case "bought":
                          note = "Gekauft";
                          break;

                        default:
                          note = phone.note;
                          break;
                      }
                      return <PhoneNumber note={note} phone={phone.phone} key={index} />;
                    })
                  ) : (
                    <NoContent message="Keine Telefonnummern gefunden" />
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}
