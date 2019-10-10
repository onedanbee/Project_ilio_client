import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import WrappedLogin from "./pages/Login";
import Header from "./components/Header";
import Page from "./pages/Page";
import "../src/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: localStorage.getItem("token") ? true : false,
      username: ""
    };
  }

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ username: "", login: false });
  };

  handleClick = () => {
    this.setState({ login: localStorage.token !== undefined, username: "" });
  };

  render() {
    return (
      <div>
        <Header />
        <Router>
          {this.state.login ? (
            <Route
              path="/pages"
              render={props => (
                <Page value={this.state} handle_logout={this.handle_logout} />
              )}
            />
          ) : (
            <Redirect to="/" />
          )}
          <Route
            exact
            path="/"
            render={props => (
              <WrappedLogin handleClick={this.handleClick} value={this.state} />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
