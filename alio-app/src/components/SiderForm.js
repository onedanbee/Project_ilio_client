import React, { Component } from "react";
import { Link } from "react-router-dom";
// import { Layout } from "antd";
// import SiderContents from './SiderContents';
import { Menu, Layout, Button } from "antd";
const { Sider } = Layout;

const { SubMenu } = Menu;

class SiderForm extends Component {
  constructor(props) {
    super(props);
  }
  /*여기서 api를 받아온다 . 그러면 
  {
    twitch: {
      sub:
      like:
      comment:
    },
    afreeca: {
      sub:
      like:
      comment:
    },
    youtube: {
      sub:
      like:
      comment:
    }
  }
  */

  render() {
    console.log("sideform의 아이들", this.props);
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
              <Link to="/pages">
                <span>BJ</span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <Link to="/pages/platfrom">
                  <span>
                    <span>PlatForm</span>
                  </span>
                </Link>
              }
            >
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <span>Youtube</span>
                  </span>
                }
              >
                <Menu.Item
                  platformName={"youtube"}
                  soMenu={"sub"}
                  onClick={this.props.PlatformClick}
                >
                  구독자 수
                </Menu.Item>
                <Menu.Item
                  platformName={"youtube"}
                  soMenu={"like"}
                  onClick={this.props.PlatformClick}
                >
                  좋아요
                </Menu.Item>
                <Menu.Item
                  platformName={"youtube"}
                  soMenu={"view"}
                  onClick={this.props.PlatformClick}
                >
                  조회수
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <span>Twitch</span>
                  </span>
                }
              >
                <Menu.Item>구독자 수</Menu.Item>
                <Menu.Item>좋아요</Menu.Item>
                <Menu.Item>댓글수</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <span>Afreeca</span>
                  </span>
                }
              >
                <Menu.Item>구독자 수</Menu.Item>
                <Menu.Item>댓글수</Menu.Item>
              </SubMenu>
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
              onClick={this.props.handle_logout}
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
