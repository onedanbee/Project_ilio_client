import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WrappedLogin from "./pages/Login";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Route exact path="/" component={WrappedLogin} />
          <Route path="/page" component={Navbar} />
        </Router>
      </div>
    );
  }
}

export default App;
