import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";
import { getData } from "../util/getData";

class Main extends Component {
  state = {
    searchText: "",
    bjinfo: [],
    bjFilterInfo: []
  };

  async componentDidMount() {
    await getData("main/", bjdata => this.setState({ bjinfo: bjdata }));
    this.bjDataFilter();
  }
  bjDataFilter() {
    let bjinfo = this.state.bjinfo;
    let bjInfoArr = [];
    let bjInfoObj = {};
    for (let k = 0; k < bjinfo.length; k++) {
      let existenceUserkey = false;
      let platformName = bjinfo[k]["P_name"];
      let platformName_sub = platformName + "_sub";
      for (let i = 0; i < bjInfoArr.length; i++) {
        if (bjInfoArr[i]["id"] === bjinfo[k]["P_userkey"]) {
          existenceUserkey = true;
          bjInfoObj[platformName_sub] = bjinfo[k]["Sub"][0]["S_count"];
        }
      }
      if (existenceUserkey === false) {
        bjInfoObj = {
          id: bjinfo[k]["P_userkey"],
          user_name: bjinfo[k]["User"][0]["U_name"]
        };
        bjInfoObj[platformName_sub] = bjinfo[k]["Sub"][0]["S_count"];
        bjInfoArr.push(bjInfoObj);
      }
    }
    this.setState({
      bjFilterInfo: bjInfoArr
    });
  }

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };
  render() {
    const columns = [
      {
        title: "BJ Name",
        dataIndex: "user_name",
        key: "user_name",
        width: "20%",
        ...this.getColumnSearchProps("user_name"),
        render: (text, record) => (
          <Link
            to={"pages/" + record.id}
            bjFilterInfo={this.state.bjFilterInfo}
          >
            {text}
          </Link>
        )
      },
      {
        title: "Subscribe (YOUTUBE)",
        dataIndex: "afreeca_sub",
        key: "afreeca_sub",
        width: "24%"
      },
      {
        title: "Subscribe (TWITCH)",
        dataIndex: "twitch_sub",
        key: "twitch_sub",
        width: "23%"
      },
      {
        title: "Subscribe (AFREECA)",
        dataIndex: "youtube_sub",
        key: "youtube_sub",
        width: "23%"
      },
      {
        title: "User Number",
        dataIndex: "id",
        key: "id",
        width: "23%"
      }
    ];

    return (
      <div
        style={{
          float: "left",
          width: "1000px",
          height: "1900px",
          margin: "40px 0 0 30px"
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>BJ의 Subscribe</h2>
        <Table
          columns={columns}
          dataSource={this.state.bjFilterInfo}
          pagination={{ pageSize: 30 }}
        />
      </div>
    );
  }
}

export default Main;
