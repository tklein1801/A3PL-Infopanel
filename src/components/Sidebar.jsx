import { Component } from "react";
import { version } from "../../package.json";
// Components
import DAG_Logo from "../img/dag-logo.png";
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
  faArrowLeft,
  faIndustry,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// Stylesheet
import "../style/sidebar.scss";

class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
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
        {
          name: "Warenankauf",
          path: "/Companies/",
          icon: <FontAwesomeIcon icon={faIndustry} className="icon" />,
        },
        {
          name: "Shops",
          path: "/Shops/",
          icon: <FontAwesomeIcon icon={faShoppingBag} className="icon" />,
        },
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

  close = () => {
    if (document.querySelector(".sidebar").classList.contains("shown")) {
      document.querySelector(".sidebar").classList.remove("shown");
    }
  };

  componentDidMount() {
    const { history } = this.props;
    const location = history.location;
    const curRoute = location.pathname.split("/")[1];
    this.setState({ route: curRoute !== "" ? curRoute : "Dashboard", loading: false });
    history.listen((location) => {
      const newRoute = location.pathname.split("/")[1];
      this.setState({ route: newRoute !== "" ? newRoute : "Dashboard" });
    });
  }

  render() {
    const { links } = this.state;

    const SidebarLink = (props) => {
      const { route } = this.state;
      const { name, icon, path } = props;
      return (
        <li>
          <Link
            to={path}
            onClick={this.close}
            className={path.includes(route) ? "sidebar-link active" : "sidebar-link"}
          >
            {icon}
            <span>{name}</span>
          </Link>
        </li>
      );
    };

    return (
      <aside className="sidebar sticky-top">
        <div className="sidebar-header">
          <img className="brand-logo" src={DAG_Logo} alt="DulliAG Logo" />
          <button
            className="sidebar-toggler"
            onClick={() => {
              document.querySelector(".sidebar").classList.remove("shown");
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} className="icon" />
          </button>
        </div>
        <div className="sidebar-body">
          <nav>
            <ul>
              {links.map((link, index) => {
                return (
                  <SidebarLink key={index} name={link.name} icon={link.icon} path={link.path} />
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="sidebar-footer">
          <p>Version {version}</p>
        </div>
      </aside>
    );
  }
}

export default withRouter(Sidebar);
