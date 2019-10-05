import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SiderForm from "../components/SiderForm";
import Main from "../pages/Main";
import { Layout } from "antd";
import Bjdetails from "../components/Bjdetails";
import Platform from "./Platform";
import { getData } from "../util/getData";

class Page extends React.Component {
  state = {
    platform: "",
    PlatformInClick: ""
  };

  componentDidMount() {
    getData("main/", data => {
      console.log(data);
    });
  }

  PlatformClick = event => {
    console.log("platform click 눌렀어용");
    this.setState({
      platform: event.item.props.platformName,
      PlatformInClick: event.item.props.soMenu
    });
    console.log(this.state);
    console.log("이벤트", event);
  };

  render() {
    console.log(this.props);
    console.log(this.state);
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
                height: "100%"
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
