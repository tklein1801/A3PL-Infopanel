import React, { Component } from "react";
import Loader from "../components/Loader";
import { Card, Row, Col, InputGroup, FormControl, Button, Modal, Form } from "react-bootstrap";
import { faCreditCard, faPhone, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SwipeableListItem } from "@sandstreamdev/react-swipeable-list";
import "@sandstreamdev/react-swipeable-list/dist/styles.css";
import ReallifeRPG from "../ReallifeRPG";
import { Contact } from "../DulliAG";

export default class Contacts extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      insertModal: false,
    };
    this.insertModal = React.createRef();
  }

  handleOpen = () => {
    this.setState({ insertModal: true });
  };

  handleClose = () => {
    this.setState({ insertModal: false });
  };

  async removeContact(contactId) {
    const { displayedContacts } = this.state;
    // try {
    //   const result = await new Contact().delete(contactId);
    //   console.log("Repsonse", result); // TODO Add an response for the user
    //   const newList = displayedContacts.filter((contact) => {
    //     return contact.id !== contactId;
    //   });
    //   this.setState({ displayedContacts: newList });
    // } catch (err) {
    //   console.log(err);
    // }
  }

  submitForm = async (event) => {
    event.preventDefault();
    const { profile, displayedContacts } = this.state;
    const { phone } = event.target.elements;
    // try {
    //   const result = await new Contact().create(
    //     profile.name,
    //     profile.pid,
    //     profile.avatar_full,
    //     phone.value
    //   );
    //   console.log("Repsonse", result); // TODO Add an response for the user
    //   // Display the new inserted contact
    //   displayedContacts.push({
    //     id: result.inserted_id,
    //     playerName: profile.name,
    //     playerId: profile.pid,
    //     avatarUrl: profile.avatar_full,
    //     telNp: phone.value,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
    this.handleClose();
  };

  filterContacts = (event) => {
    const { contacts } = this.state;
    const keyword = event.target.value;
    const result = contacts.filter((contact) => {
      return contact.playerName.includes(keyword);
    });
    this.setState({ displayedContacts: result });
  };

  async componentDidMount() {
    const apiKey = localStorage.getItem("@dag_apiKey");
    // const profile = await new ReallifeRPG().getProfile(apiKey);
    const contacts = await new Contact().getAll();
    this.setState({
      profile: null /*profile.data[0]*/,
      contacts: contacts,
      displayedContacts: contacts,
      loading: false,
    });
  }

  render() {
    const { loading, profile, displayedContacts, insertModal } = this.state;
    return (
      <div className="contacts">
        <h1>Kontaktbuch</h1>
        <Row>
          <Col xs={12} md={12} lg={6} xl={4}>
            {loading ? (
              <Card className="border-top shadow-md p-5">
                <Loader />
              </Card>
            ) : (
              <Card className="border-top shadow-md">
                <Card.Header className="bg-white border-bottom-0 pb-0">
                  <InputGroup className="mb-3">
                    <FormControl
                      type="text"
                      placeholder="Kontakt suchen"
                      onChange={this.filterContacts}
                    />
                    <InputGroup.Append>
                      <Button variant="primary" className="px-3 rounded" onClick={this.handleOpen}>
                        Eintragen
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Card.Header>
                <Card.Body className="pb-0 pt-0">
                  {displayedContacts.length > 0 ? (
                    displayedContacts.map((contact, index) => {
                      return (
                        <div className="bg-light mb-3 rounded p-2" key={index}>
                          <Row>
                            <Col xs={12} md={12} lg={12} xl={12}>
                              <p className="text text-center font-weight-bold">
                                <img
                                  className="rounded-circle mr-2"
                                  src={contact.avatarUrl}
                                  alt="avatar"
                                  style={{ width: "2.1rem", height: "auto" }}
                                />
                                {contact.playerName}
                              </p>
                            </Col>
                            <Col xs={12} md={12} lg={6} xl={6} className="border-right-2">
                              <p className="text text-center font-weight-bold mb-0 mb-2">
                                <FontAwesomeIcon icon={faPhone} className="icon mr-2" />
                                {contact.telNo}
                              </p>
                            </Col>
                            <Col xs={12} md={12} lg={6} xl={6}>
                              <p className="text text-center font-weight-bold mb-0">
                                <FontAwesomeIcon icon={faCreditCard} className="icon mr-2" />
                                Nicht verfügbar
                              </p>
                            </Col>
                          </Row>
                        </div>
                      );
                      // return profile.pid === contact.playerId ? (
                      //   <SwipeableListItem
                      //     key={index}
                      //     swipeLeft={{
                      //       content: (
                      //         <div
                      //           className="d-flex w-100 align-items-center justify-content-end px-3 mb-3 bg-danger text-white rounded"
                      //           style={{ height: "calc(100% - 1rem)" }}
                      //         >
                      //           <FontAwesomeIcon
                      //             icon={faTrashAlt}
                      //             className="icon"
                      //             style={{ fontSize: "2rem" }}
                      //           />
                      //         </div>
                      //       ),
                      //       action: () => {
                      //         this.removeContact(contact.id);
                      //       },
                      //     }}
                      //   >
                      //     <div className="bg-light mb-3 rounded p-2">
                      //       <Row>
                      //         <Col xs={12} md={12} lg={12} xl={12}>
                      //           <p className="text text-center font-weight-bold">
                      //             <img
                      //               className="rounded-circle mr-2"
                      //               src={contact.avatarUrl}
                      //               alt="avatar"
                      //               style={{ width: "2.1rem", height: "auto" }}
                      //             />
                      //             {contact.playerName}
                      //           </p>
                      //         </Col>
                      //         <Col xs={12} md={12} lg={6} xl={6} className="border-right-2">
                      //           <p className="text text-center font-weight-bold mb-0 mb-2">
                      //             <FontAwesomeIcon icon={faPhone} className="icon mr-2" />
                      //             {contact.telNo}
                      //           </p>
                      //         </Col>
                      //         <Col xs={12} md={12} lg={6} xl={6}>
                      //           <p className="text text-center font-weight-bold mb-0">
                      //             <FontAwesomeIcon icon={faCreditCard} className="icon mr-2" />
                      //             Nicht verfügbar
                      //           </p>
                      //         </Col>
                      //       </Row>
                      //     </div>
                      //   </SwipeableListItem>
                      // ) : (
                      //   <div className="bg-light mb-3 rounded p-2" key={index}>
                      //     <Row>
                      //       <Col xs={12} md={12} lg={12} xl={12}>
                      //         <p className="text text-center font-weight-bold">
                      //           <img
                      //             className="rounded-circle mr-2"
                      //             src={contact.avatarUrl}
                      //             alt="avatar"
                      //             style={{ width: "2.1rem", height: "auto" }}
                      //           />
                      //           {contact.playerName}
                      //         </p>
                      //       </Col>
                      //       <Col xs={12} md={12} lg={6} xl={6} className="border-right-2">
                      //         <p className="text text-center font-weight-bold mb-0 mb-2">
                      //           <FontAwesomeIcon icon={faPhone} className="icon mr-2" />
                      //           {contact.telNo}
                      //         </p>
                      //       </Col>
                      //       <Col xs={12} md={12} lg={6} xl={6}>
                      //         <p className="text text-center font-weight-bold mb-0">
                      //           <FontAwesomeIcon icon={faCreditCard} className="icon mr-2" />
                      //           Nicht verfügbar
                      //         </p>
                      //       </Col>
                      //     </Row>
                      //   </div>
                      // );
                    })
                  ) : (
                    <div className="bg-light rounded p-3 mb-3">
                      <p className="text text-center font-weight-bold mb-0">
                        Keinen Kontakt gefunden
                      </p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>

        {/* <Modal show={insertModal} onHide={this.handleClose} backdrop="static" size="md" centered>
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">Kontakt erstellen</Modal.Title>
          </Modal.Header>
          <Form onSubmit={this.submitForm}>
            <Modal.Body className="pb-0">
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Name
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    name="username"
                    value={profile !== undefined ? profile.name : "Unbekannt"}
                    disabled
                  />
                </Col>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label column sm={2}>
                  Telefon
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="number"
                    pattern="numeric"
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
                  <Form.Control
                    type="text"
                    name="iban"
                    value={profile !== undefined ? profile.bank_main[0].iban : "Unbekannt"}
                    disabled
                  />
                </Col>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="white" className="px-3" onClick={this.handleClose}>
                Abbrechen
              </Button>
              <Button variant="primary" className="px-3" type="submit">
                Speichern
              </Button>
            </Modal.Footer>
          </Form>
        </Modal> */}
      </div>
    );
  }
}
