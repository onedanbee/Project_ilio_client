import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SiderForm from "../components/SiderForm";
import Main from "../pages/Main";
import { Layout } from "antd";
import Bjdetails from "../components/Bjdetails";
import Platform from "./Platform";

class Page extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <Router>
          <Layout style={{ height: "100%", backgroundColor: "white" }}>
            <div style={{ width: "200px", float: "left" }}>
              <SiderForm
                style={{ overflow: "hidden" }}
                propsdata={this.props}
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
                <Route exact path="/pages/platfrom" component={Platform} />
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
