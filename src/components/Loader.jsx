import React, { Component } from "react";
import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style/loader.scss";

export default class Loader extends Component {
  render() {
    return (
      <div className="loader-container">
        <Spinner className="loader" animation="border" />
      </div>
    );
  }
}
