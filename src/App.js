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
import { Banned as BannedAlert, Jail as JailAlert } from "./components/Alerts";
import Navbar from "./components/Navbar";
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
    if (apiKey === null || apiKey === "" || apiKey === undefined) {
      this.setState({ loading: false, showKeyModal: true, apiKey: apiKey });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading, showKeyModal } = this.state;

    if (loading) {
      return null;
    } else {
      return (
        <div className="wrapper">
          <Router>
            <Sidebar />
            <div className="main-container">
              <Navbar />
              <BannedAlert />
              <JailAlert />
              <div className="page-content">
                <div className="content-container">
                  <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/Dashboard/" exact component={Dashboard} />
                    <Route path="/Profil/" component={Profile} />
                    <Route path="/Markt/" component={Market} />
                    <Route path="/Kontaktbuch/" component={Contacts} />
                    <Route path="/CBS/" component={CBS} />
                    <Route path="/Shops/" component={Shops} />
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
