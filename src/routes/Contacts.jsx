import React, { Component } from "react";
import Loader from "../components/Loader";
import { Card, Row, Col } from "react-bootstrap";
export default class Contacts extends Component {
  render() {
    return (
      <div className="contacts">
        <h1>Kontaktbuch</h1>
        <Row>
          <Col xs={12} md={12} lg={6} xl={4}>
            <Card className="border-top shadow-md p-5">
              <Loader />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
