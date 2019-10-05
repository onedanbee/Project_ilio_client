import React, { Component } from "react";
import { fakeData } from "../sub_data";
import { Button, Table } from "antd";
const { Column, ColumnGroup } = Table;

class Platform extends Component {
  render(props) {
    console.log(fakeData);
    // var resultarr = [];
    // for (let i = 0; i < fakeData.length; i++) {
    //   if (fakeData[i]["user_name"])
    //     resultarr.push({
    //       view: fakeData[i]["view_count"]
    //     });
    // }
    console.log("data 알려조~", this.props);

    const data = [
      {
        key: "1",
        firstName: "John",
        lastName: "Brown",
        Rank: 1,
        BJName: "New York No. 1 Lake Park",
        SubIncrease: "30"
      },
      {
        key: "2",
        firstName: "Jim",
        lastName: "Green",
        Rank: 2,
        BJName: "London No. 1 Lake Park",
        SubIncrease: "40"
      },
      {
        key: "3",
        firstName: "Joe",
        lastName: "Black",
        Rank: 3,
        BJName: "Sidney No. 1 Lake Park",
        SubIncrease: "95"
      }
    ];
    return (
      <div
        style={{ width: "1000px", height: "1000px", border: "1px solid red" }}
      >
        <div style={{ border: "1px solid blue", padding: "30px 0 30px 20px" }}>
          <span style={{ marginRight: "20px", width: "150px" }}>
            <Button>일 간</Button>
          </span>
          <span style={{ marginRight: "20px" }}>
            <Button>주 간</Button>
          </span>
          <span style={{ marginRight: "20px" }}>
            <Button>월 간</Button>
          </span>
        </div>

        <div>
          <Table dataSource={data}>
            <Column title="Rank" dataIndex="Rank" key="Rank" />
            <Column title="BJ Name" dataIndex="BJName" key="BJName" />
            <Column
              title="구독자 증가"
              dataIndex="SubIncrease"
              key="SubIncrease"
            />
            <ColumnGroup title="구독자 수">
              <Column title="증가 전" dataIndex="firstName" key="firstName" />
              <Column
                title="증가 후(현재)"
                dataIndex="lastName"
                key="lastName"
              />
            </ColumnGroup>
          </Table>
        </div>
      </div>
    );
  }
}

export default Platform;
