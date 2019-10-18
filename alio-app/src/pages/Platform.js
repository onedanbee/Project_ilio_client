import React, { Component } from "react";
import { Button, Table } from "antd";
const { Column, ColumnGroup } = Table;

class Platform extends Component {
  render(props) {
    console.log("data 알려조~", this.props);

    const data = [
      {
        key: "1",
        preIncrease: 459,
        currentIncrease: 1495,
        Rank: 1,
        BJName: "견자희",
        SubIncrease: 1036
      },
      {
        key: "2",
        preIncrease: 600,
        currentIncrease: 930,
        Rank: 2,
        BJName: "공대생 감자",
        SubIncrease: 330
      },
      {
        key: "3",
        preIncrease: 6045,
        currentIncrease: 6094,
        Rank: 3,
        BJName: "의정부 불곰",
        SubIncrease: "49"
      }
    ];
    return (
      <div style={{ width: "1000px", height: "1000px" }}>
        <div style={{ padding: "30px 0 30px 20px" }}>
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
              <Column
                title="증가 전"
                dataIndex="preIncrease"
                key="preIncrease"
              />
              <Column
                title="증가 후(현재)"
                dataIndex="currentIncrease"
                key="currentIncrease"
              />
            </ColumnGroup>
          </Table>
        </div>
      </div>
    );
  }
}

export default Platform;
