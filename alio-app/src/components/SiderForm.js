import React, { Component } from "react";
//import { Link } from "react-router-dom";
// import { Layout } from "antd";
// import SiderContents from './SiderContents';
import { Menu, Layout, Button } from "antd";
const { Sider } = Layout;

const { SubMenu } = Menu;

class SiderForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div style={{ height: "100%" }}>
        <Sider width={200} style={{ background: "#black", height: "100%" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            theme="dark"
            style={{ height: "100%" }}
          >
            <Menu.Item>
              <span>BJ</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <span>PlatForm</span>
                </span>
              }
            >
              <Menu.Item>Youtube</Menu.Item>
              <Menu.Item>Afreeca</Menu.Item>
              <Menu.Item>Twitch</Menu.Item>
            </SubMenu>
            <Menu.Item>
              <span>Videos</span>
            </Menu.Item>
            <Button
              type="primary"
              size={"small"}
              style={{
                background: "#A7AAAE",
                color: "#051527",
                border: "0px",
                marginLeft: "20px"
              }}
            >
              Logout
            </Button>
          </Menu>
        </Sider>
      </div>
    );
  }
}

export default SiderForm;
