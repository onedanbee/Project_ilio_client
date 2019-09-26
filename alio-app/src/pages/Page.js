import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

class Page extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />
        </div>
      </Router>
    );
  }
}

export default Page;
