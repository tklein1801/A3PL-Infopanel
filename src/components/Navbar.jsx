import { Component } from "react";
// Components
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Stylesheet
import "../style/navbar.scss";

class Navbar extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <nav className="navbar sticky-top">
        <button
          className="sidebar-toggler"
          onClick={() => {
            document.querySelector(".sidebar").classList.add("shown");
          }}
        >
          <FontAwesomeIcon icon={faBars} className="icon" />
        </button>
      </nav>
    );
  }
}

export default Navbar;
