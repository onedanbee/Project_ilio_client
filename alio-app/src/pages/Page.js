import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SiderForm from "../components/SiderForm";
import Main from "../pages/Main";
import { Layout } from "antd";
import Bjdetails from "../components/Bjdetails";
import Platform from "./Platform";

class Page extends React.Component {
  state = {
    platform: "",
    PlatformInClick: ""
  };

  PlatformClick = event => {
    this.setState({
      platform: event.item.props.platformName,
      PlatformInClick: event.item.props.soMenu
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Layout style={{ height: "100%", backgroundColor: "white" }}>
            <div style={{ width: "200px", float: "left" }}>
              <SiderForm
                style={{ overflow: "hidden" }}
                propsdata={this.props.value}
                handle_logout={this.props.handle_logout}
                clickData={this.state}
                PlatformClick={this.PlatformClick}
              />
            </div>
            <div
              style={{
                float: "left",
                position: "relative",
                left: "0px",
                height: "100%",
                width: "100%"
              }}
            >
              <Switch>
                <Route exact path="/pages" component={Main} />
                <Route
                  exact
                  path="/pages/platfrom"
                  render={() => <Platform clickData={this.state} />}
                />
                <Route path="/pages/:id" component={Bjdetails} />
              </Switch>
            </div>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default Page;
