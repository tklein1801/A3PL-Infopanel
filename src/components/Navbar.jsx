import { Component } from "react";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/navbar.scss";

export default class Navbar extends Component {
  toggle() {
    document.querySelector("#root > div > aside > nav").classList.toggle("active");
    document.querySelector("#root > div > div > div.content").classList.toggle("full");
  }

  render() {
    return (
      <div className="main-navbar">
        <FontAwesomeIcon icon={faBars} className="hamburger icon" onClick={() => this.toggle()} />
      </div>
    );
  }
}
