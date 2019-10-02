import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WrappedLogin from "./pages/Login";
import Header from "./components/Header";
import Page from "./pages/Page";

class App extends React.Component {
  state = {
    login: false,
    //logged_in: localStorage.getItem("token") ? true : false,
    logged_in: localStorage.token !== "undefined" ? true : false,
    username: ""
  };

  handle_logout = () => {
    localStorage.removeItem("token");
    this.setState({ logged_in: false, username: "" });
  };
  render() {
    console.log("app state login", this.state.login);
    return (
      <div>
        <Header />
        <Router>
          <Route
            exact
            path="/"
            render={props => <WrappedLogin value={this.state} />}
            // component={WrappedLogin}
            // logged_in={this.state.logged_in}
            // login={this.state.login}
            // username={this.state.username}
          />
          <Route path="/pages" render={props => <Page value={this.state} />} />
        </Router>
      </div>
    );
  }
}

export default App;
