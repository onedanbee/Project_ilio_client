import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import WrappedLogin from "./pages/Login";
import Header from "./components/Header";
import Page from "./pages/Page";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // login: false,
      // logged_in:
      login: localStorage.getItem("token") ? true : false, //(undefined면 / true 로그인이 안된상태)
      username: ""
    };
  }

  handle_logout = () => {
    localStorage.removeItem("token");
    this.state.login = false;
    this.setState({ username: "" });
  };

  handleClick = () => {
    this.setState({ login: localStorage.token !== undefined, username: "" });
  };

  render() {
    console.log(localStorage.token);
    return (
      <div>
        <Header />
        {console.log(this.state.login)}
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
            // component={WrappedLogin}
            // login={this.state.login}
            // login={this.state.login}
            // username={this.state.username}
          />
        </Router>
      </div>
    );
  }
}

export default App;
