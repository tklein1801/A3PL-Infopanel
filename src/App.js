import React, { Component, createRef } from "react";
// Routes
import Dashboard from "./routes/Dashboard";
import Profile from "./routes/Profile";
import Market from "./routes/Market";
import Contacts from "./routes/Contacts";
import Shops from "./routes/Shops";
import CBS from "./routes/CBS";
import Streams from "./routes/Streams";
import Changelogs from "./routes/Changelogs";
import Settings from "./routes/Settings";
// Components
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import { Banned as BannedAlert, Jail as JailAlert } from "./components/Alerts";
import Sidebar from "./components/Sidebar";
import { SetKeyModal } from "./components/Modals";
// Stylesheets
import "./style/app.scss";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      showKeyModal: false,
    };
    this.setKeyModalRef = createRef();
  }

  componentDidMount() {
    const apiKey = localStorage.getItem("@dag_apiKey");
    apiKey === null || apiKey === "" || apiKey === undefined
      ? this.setState({ showKeyModal: true, apiKey: apiKey, loading: false })
      : this.setState({ loading: false });
  }

  render() {
    const { loading, showKeyModal } = this.state;

    if (loading) {
      return <Loader />;
    } else {
      return (
        <div className="wrapper">
          <Router>
            <Sidebar />
            <div className="main-container">
              <Navbar toggleFunc={this.toggleSidebar} />
              <div
                className="content"
                onClick={() => {
                  // If the sidebar is active it will close if we click on the screen the sidebar will close
                  const sidebar = document.querySelector(".main-sidebar");
                  if (sidebar.querySelector(".nav-menu").classList.contains("active")) {
                    sidebar.querySelector(".nav-menu").classList.remove("active");
                  }
                }}
              >
                <div className="alert-container">
                  <BannedAlert />
                  <JailAlert />
                </div>
                <div className="page-content">
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/Dashboard/" exact component={Dashboard} />
                    <Route path="/Profil/" component={Profile} />
                    <Route path="/Markt/" component={Market} />
                    <Route path="/Kontaktbuch/" component={Contacts} />
                    <Route path="/CBS/" component={CBS} />
                    {/* <Route path="/Shops/" component={Shops} /> */}
                    <Route path="/Streams/" component={Streams} />
                    <Route path="/Changelogs/" component={Changelogs} />
                    <Route path="/Einstellungen/" component={Settings} />
                  </Switch>
                </div>
              </div>
            </div>
          </Router>
          <SetKeyModal shown={showKeyModal} />
        </div>
      );
    }
  }
}

export default App;
