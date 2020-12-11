import { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import {
  faAddressBook,
  faChartArea,
  faCog,
  faDesktop,
  faHistory,
  faPencilRuler,
  faShoppingBag,
  faTv,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sidebar } from "../config.json";
import "../style/sidebar.scss";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      loading: true, // equals the key of the active menu link
      links: [
        {
          name: "Dashboard",
          path: "/Dashboard/",
          icon: <FontAwesomeIcon icon={faDesktop} className="icon" />,
        },
        {
          name: "Profil",
          path: "/Profil/",
          icon: <FontAwesomeIcon icon={faUserCircle} className="icon" />,
        },
        {
          name: "Markt",
          path: "/Markt/",
          icon: <FontAwesomeIcon icon={faChartArea} className="icon" />,
        },
        {
          name: "Kontaktbuch",
          path: "/Kontaktbuch/",
          icon: <FontAwesomeIcon icon={faAddressBook} className="icon" />,
        },
        // {
        //   name: "Shops",
        //   path: "/Shops/",
        //   icon: <FontAwesomeIcon icon={faShoppingBag} className="icon" />,
        // },
        {
          name: "CBS",
          path: "/CBS/",
          icon: <FontAwesomeIcon icon={faPencilRuler} className="icon" />,
        },
        {
          name: "Streams",
          path: "/Streams/",
          icon: <FontAwesomeIcon icon={faTv} className="icon" />,
        },
        {
          name: "Changelogs",
          path: "/Changelogs/",
          icon: <FontAwesomeIcon icon={faHistory} className="icon" />,
        },
        {
          name: "Einstellungen",
          path: "/Einstellungen/",
          icon: <FontAwesomeIcon icon={faCog} className="icon" />,
        },
      ],
    };
  }

  componentDidMount() {
    const { history } = this.props,
      location = history.location,
      curRoute = location.pathname.split("/")[1];
    this.setState({ route: curRoute !== "" ? curRoute : "Dashboard", loading: false });
    // We're gonna check if the route is equal to "" because if were on the landingpage of the
    // application the indexroute will be "/" which equals "" after we splitted the pathname
    // Listen for route changes
    history.listen((location) => {
      const newRoute = location.pathname.split("/")[1];
      this.setState({ route: newRoute !== "" ? newRoute : "Dashboard" });
    });
  }

  render() {
    const { loading, links, route } = this.state;

    if (loading) {
      return null;
    } else {
      return (
        <aside className="main-sidebar shadow-lg">
          <nav className="nav-menu">
            <div className="header">
              <img className="logo" src={sidebar.logo} alt="ReallifeRPG Logo" />
            </div>
            <ul className="nav-menu-items">
              {links.map((link, index) => {
                return (
                  <li key={index} className={"nav-text"}>
                    <Link
                      to={link.path}
                      className={link.path.includes(route) ? "active" : null}
                      onClick={() =>
                        document.querySelector(".main-sidebar .nav-menu").classList.remove("active")
                      }
                    >
                      {link.icon}
                      <span>{link.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      );
    }
  }
}

export default withRouter(Sidebar);
