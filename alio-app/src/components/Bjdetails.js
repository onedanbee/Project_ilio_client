/* eslint-disable import/first */
import Chart from "react-google-charts";
import React, { Component } from "react";
import { fakeData } from "../sub_data";
import { afreecaFakedata } from "../afreeca_moca";
import { Table, Button } from "antd";
const { Column } = Table;
//import * as XLSX from "xlsx";

class Bjdetails extends Component {
  render(props) {
    console.log(this.props.match.params.id);
    let userName = this.props.match.params.id;
    console.log("Hi Bjdetail", fakeData);
    var resultarr = [];
    for (let i = 0; i < fakeData.length; i++) {
      if (fakeData[i]["user_name"] === userName)
        resultarr.push({
          view: fakeData[i]["afreeca_sub"],
          image: fakeData[i]["image"]
        });
    }
    // for(let j = 0; j < afreecaFakedata.length; j++){
    //   if(afreecaFakedata[j][])
    // }

    const data = [
      {
        key: "1",
        PlatfromName: " PlatfromName",
        Rank: 1,
        BJName: "Lake Park",
        SubIncrease: "30"
      },
      {
        key: "1",
        PlatfromName: " 1233",
        Rank: 12,
        BJName: "Lake",
        SubIncrease: "30"
      }
    ];

    const excelDownload = () => {
      /* this line is only needed if you are not adding a script tag reference */

      if (typeof XLSX == "undefined") var XLSX = require("xlsx");
      console.log(typeof XLSX);
      console.log("XLSX를 통과!!!");

      /* make the worksheet */
      var ws = XLSX.utils.json_to_sheet(data);

      /* add to workbook */
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "People");

      /* generate an XLSX file */
      XLSX.writeFile(wb, "sheetjs.xlsx");
      console.log("엑셀 눌렸다");
    };

    console.log(resultarr);
    return (
      <div>
        <span>
          <img
            src={resultarr[0]["image"]}
            style={{ width: "150px", height: "150px" }}
          />
        </span>
        <Chart
          width={"400px"}
          height={"200px"}
          chartType="Line"
          loader={<div>Loading Chart</div>}
          data={[
            ["Subscribe", "afreeca", "twitch", "youtube"],
            ["1월28일", 80.8, 41.8, 20.1],
            ["1월29일", 69.5, 32.4, 32],
            ["1월30일", 57, 25.7, 23],
            ["1월31일", 18.8, 10.5, 45],
            ["2월01일", 17.6, 10.4, 65],
            ["2월02일", 17.6, 10.4, 28]
          ]}
          options={{
            chart: {
              title: userName + "Subscribe"
            }
          }}
          rootProps={{ "data-testid": "1" }}
        />
        <div>
          <Table dataSource={data}>
            <Column title="" dataIndex="PlatfromName" key="PlatfromName" />
            <Column title="Youtube" dataIndex="Rank" key="Rank" />
            <Column title="Afreeca" dataIndex="BJName" key="BJName" />
            <Column title="Twitch" dataIndex="SubIncrease" key="SubIncrease" />
          </Table>
        </div>
        <Button onClick={excelDownload}>Excel Download</Button>
      </div>
    );
  }
}

export default Bjdetails;
