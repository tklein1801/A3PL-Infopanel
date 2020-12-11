import { Component } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReallifeRPG from "../ReallifeRPG";
import "../style/alert.scss";

class Alert extends Component {
  constructor() {
    super();
    this.state = {
      shown: true,
    };
  }

  unshow = () => {
    this.setState({ shown: false });
  };

  render() {
    const { shown } = this.state;
    const { message } = this.props;

    if (!shown) {
      return null;
    } else {
      return (
        <div className="alert">
          <div>
            <p className="mb-0">{message}</p>
          </div>
          <div>
            <FontAwesomeIcon icon={faTimes} className="icon" onClick={this.unshow} />
          </div>
        </div>
      );
    }
  }
}

class Banned extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  unshow = () => {
    this.setState({ shown: false });
  };

  async componentDidMount() {
    let banned = false;
    const apiKey = localStorage.getItem("@dag_apiKey");
    if (apiKey !== undefined && apiKey !== null) {
      const player = await new ReallifeRPG().getProfile(apiKey);
      if (player.data !== undefined) {
        banned = player.data[0].suspended === 1 ? true : false;
      }
    }
    this.setState({ banned: banned, shown: banned, loading: false });
  }

  render() {
    const { loading, shown, banned } = this.state;
    if ((loading && !banned) || !shown) {
      return null;
    } else {
      return (
        <div className="alert">
          <div>
            <p className="mb-0">
              Du wurdest leider aus der ReallifeRPG Community ausgeschlossen. Wende dich an den
              Support um entbannt zu werden.
            </p>
          </div>
          <div>
            <FontAwesomeIcon icon={faTimes} className="icon" onClick={this.unshow} />
          </div>
        </div>
      );
    }
  }
}

class Jail extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }

  unshow = () => {
    this.setState({ shown: false });
  };

  async componentDidMount() {
    let imprisoned = false,
      timeLeft = 0;
    const apiKey = localStorage.getItem("@dag_apiKey");
    if (apiKey !== undefined && apiKey !== null) {
      const player = await new ReallifeRPG().getProfile(apiKey);
      if (player.data !== undefined) {
        imprisoned = player.data[0].jail_time >= 1 ? true : false;
        timeLeft = player.data[0].jail_time;
      }
    }
    this.setState({
      imprisoned: imprisoned,
      timeLeft: timeLeft,
      shown: imprisoned,
      loading: false,
    });
  }

  render() {
    const { loading, shown, imprisoned, timeLeft } = this.state;

    if ((loading && !imprisoned) || !shown) {
      return null;
    } else {
      return (
        <div className="alert">
          <div>
            <p className="mb-0">
              Du sitzt derzeit leider im Bundesgefängnis eine Haftstrafe ab. Du wirst in{" "}
              {timeLeft / 2} Monaten entlassen.
            </p>
          </div>
          <div>
            <FontAwesomeIcon icon={faTimes} className="icon" onClick={this.unshow} />
          </div>
        </div>
      );
    }
  }
}

export { Alert, Banned, Jail };
