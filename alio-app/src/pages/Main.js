import React, { Component } from "react";
import { fakeData } from "../sub_data";
import { Link } from "react-router-dom";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";

// fetch()
//   .then(res => res)
//   .then(data => {
//     console.log("data", data.json());
//   });
console.log(fakeData);
const data = [];
for (let i = 0; i < fakeData.length; i++) {
  var bjdata = {
    key: fakeData[i]["id"],
    name: fakeData[i]["user_name"],
    subafreeca: fakeData[i]["afreeca_fanclub"],
    subtwitch: fakeData[i]["twitch_sub"],
    subyoutube: fakeData[i]["youtube_sub"]
  };
  data.push(bjdata);
}

class Main extends Component {
  state = {
    searchText: ""
  };

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
      // <Link to="/:${this.state.bjname}">
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
      // </Link>
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
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name"),
        render: (text, record) => (
          <Link to={"pages/" + record.name}>{text}</Link>
          // <a href="1">{text}</a>
        )
      },
      {
        title: "Subscribe (YOUTUBE)",
        dataIndex: "subafreeca",
        key: "subafreeca",
        width: "24%"
      },
      {
        title: "Subscribe (TWITCH)",
        dataIndex: "subtwitch",
        key: "subtwitch",
        width: "23%"
      },
      {
        title: "Subscribe (AFREECA)",
        dataIndex: "subyoutube",
        key: "subafreeca",
        width: "23%"
      }
    ];

    return (
      <div
        style={{
          float: "left",
          width: "100%",
          height: "100%"
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 30 }}
        />
      </div>
    );
  }
}

export default Main;
