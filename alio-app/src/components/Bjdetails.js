/* eslint-disable import/first */
import Chart from "react-google-charts";
import React, { Component } from "react";
import { Table, Button, Avatar, Icon } from "antd";
const { Column } = Table;
import { getData } from "../util/getData";

class Bjdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bjinfo: [],
      bjmain: [],
      gapsub: [],
      totalresult: [],
      bjFilterInfo: [
        {
          bjname: "",
          bjimg: "",
          signup: "",
          bjabout: ""
        },
        {
          bjname: "",
          bjimg: "",
          signup: "",
          bjabout: ""
        },
        {
          bjname: "",
          bjimg: "",
          signup: "",
          bjabout: ""
        }
      ]
    };
  }

  bjDataFilter() {
    let bjinfo = this.state.bjinfo;
    let bjmain = this.state.bjmain;
    let bjFilterarr = [];
    let bjFilterInfo = [];
    let bjFilterPlatform = {
      PlatfromName: "PlatfromName",
      twitch_id: "",
      youtube_id: "",
      afreeca_id: ""
    };

    let bjFilterLike = {
      PlatfromName: "Like",
      twitch_id: "",
      youtube_id: "",
      afreeca_id: ""
    };
    let bjFilterunLike = {
      PlatfromName: "unLike",
      twitch_id: "",
      youtube_id: "",
      afreeca_id: ""
    };
    let bjFilterView = {
      PlatfromName: "ViewCount",
      twitch_id: "",
      youtube_id: "",
      afreeca_id: ""
    };
    var gapsub = [["Subscribe"]];

    for (let j = 0; j < bjmain.length; j++) {
      if (bjmain[j]["P_userkey"] === this.props.match.params.id) {
        if (bjmain[j]["P_name"] === "twitch") {
          let fiveSub = bjmain[j]["Sub"].slice(0, 5);
          for (let m = 0; m < fiveSub.length; m++) {
            let tempArr = [fiveSub[m]["created_at"]];
            gapsub.push(tempArr);
          }
          gapsub[0].push(bjmain[j]["P_name"]);
          for (let n = 0; n < fiveSub.length; n++) {
            gapsub[n + 1].push(fiveSub[n]["S_count"]);
          }
        }

        if (bjmain[j]["P_name"] === "youtube") {
          let fiveSub = bjmain[j]["Sub"].slice(0, 5);
          gapsub[0].push(bjmain[j]["P_name"]);
          for (let n = 0; n < fiveSub.length; n++) {
            gapsub[n + 1].push(fiveSub[n]["S_count"]);
          }
        }

        if (bjmain[j]["P_name"] === "afreeca") {
          let fiveSub = bjmain[j]["Sub"].slice(0, 5);
          gapsub[0].push(bjmain[j]["P_name"]);
          for (let n = 0; n < fiveSub.length; n++) {
            gapsub[n + 1].push(fiveSub[n]["S_count"]);
          }
        }
      }
      this.setState({
        gapsub
      });
      var bjFilterSub = {
        PlatfromName: "Subscribe",
        twitch_id: this.state.gapsub[5][1],
        youtube_id: "",
        afreeca_id: this.state.gapsub[5][2]
      };
    }

    for (let i = 0; i < bjinfo.length; i++) {
      if (this.state.bjinfo[i]["P_userkey"] === this.props.match.params.id) {
        bjFilterarr.push(this.state.bjinfo[i]);
      }
    }
    for (let k = 0; k < bjFilterarr.length; k++) {
      let bjinfoObj = {
        bjname: bjFilterarr[k]["User"][0]["U_name"],
        bjimg: bjFilterarr[k]["User"][0]["U_img"],
        signup: bjFilterarr[k]["User"][0]["U_sudate"],
        bjabout: bjFilterarr[k]["User"][0]["U_info"]
      };
      bjFilterInfo.push(bjinfoObj);
      this.setState({
        bjFilterInfo
      });

      let total_len = bjFilterarr[k]["Total"].length - 1;
      if (bjFilterarr[k]["P_name"] === "twitch") {
        bjFilterPlatform["twitch_id"] = bjFilterarr[k]["User"][0]["U_name"];
        bjFilterLike["twitch_id"] =
          bjFilterarr[k]["Total"][total_len]["T_like_count"];
        bjFilterunLike["twitch_id"] =
          bjFilterarr[k]["Total"][total_len]["T_unlike_count"];
        bjFilterView["twitch_id"] =
          bjFilterarr[k]["Total"][total_len]["T_view_count"];
      } else if (bjFilterarr[k]["P_name"] === "youtube") {
        bjFilterPlatform["youtube_id"] = bjFilterarr[k]["User"][0]["U_name"];
        bjFilterLike["youtube_id"] =
          bjFilterarr[k]["Total"][total_len]["T_like_count"];
        bjFilterunLike["youtube_id"] =
          bjFilterarr[k]["Total"][total_len]["T_unlike_count"];
        bjFilterView["youtube_id"] =
          bjFilterarr[k]["Total"][total_len]["T_view_count"];
      } else if (bjFilterarr[k]["P_name"] === "afreeca") {
        bjFilterPlatform["afreeca_id"] = bjFilterarr[k]["User"][0]["U_name"];
        bjFilterLike["afreeca_id"] =
          bjFilterarr[k]["Total"][total_len]["T_like_count"];
        bjFilterunLike["afreeca_id"] =
          bjFilterarr[k]["Total"][total_len]["T_unlike_count"];
        bjFilterView["afreeca_id"] =
          bjFilterarr[k]["Total"][total_len]["T_view_count"];
      }
    }
    this.setState({
      totalresult: [
        bjFilterPlatform,
        bjFilterLike,
        bjFilterunLike,
        bjFilterView,
        bjFilterSub
      ]
    });
  }

  async componentDidMount() {
    await getData("BJ/", bjinfo => this.setState({ bjinfo }));
    await getData("main/", bjmain => this.setState({ bjmain }));
    this.bjDataFilter();
  }

  render() {
    let userName = this.props.match.params.id;
    var resultarr = [];

    const data = [
      {
        key: "1",
        PlatfromName: "PlatfromName",
        youtube_id: "견자희유튜브",
        afreeca_id: "견자희아프리카",
        twitch_id: "견자희트위치"
      },
      {
        key: "1",
        PlatfromName: "subscribe",
        youtube_id: "20",
        afreeca_id: "30",
        twitch_id: "40"
      }
    ];

    const excelDownload = () => {
      if (typeof XLSX == "undefined") var XLSX = require("xlsx");

      var ws = XLSX.utils.json_to_sheet(data);

      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "People");

      XLSX.writeFile(wb, "sheetjs.xlsx");
    };

    return (
      <div>
        <div
          style={{
            width: "400px",
            height: "320px",
            backgroundColor: "white",
            display: "block"
          }}
        >
          <span
            style={{
              width: "1000px",
              margin: "30px",
              padding: "20px",
              display: "block",
              backgroundColor: "aliceblue"
            }}
          >
            <Avatar
              size={150}
              icon="user"
              src={this.state.bjFilterInfo[0]["bjimg"]}
            />
            <p style={{ fontSize: "25px" }}>
              {"BJ " + this.state.bjFilterInfo[0]["bjname"] + "님"}
            </p>
            <p>
              <Icon type="history" />
              {" twitch 개설일" + this.state.bjFilterInfo[0]["signup"]}
            </p>
            <p>
              <Icon type="history" />
              {this.state.bjFilterInfo[1] !== undefined &&
                " afreeca 개설일" + this.state.bjFilterInfo[1]["signup"]}
            </p>
            <p>
              <Icon type="heart" /> {this.state.bjFilterInfo[0]["bjabout"]}
            </p>
            <p>
              <Icon type="heart" />{" "}
              {this.state.bjFilterInfo[1] !== undefined &&
                this.state.bjFilterInfo[1]["bjabout"]}
            </p>
          </span>
        </div>
        <Chart
          width={"90%"}
          height={"350px"}
          chartType="Line"
          loader={<div>Loading Chart</div>}
          data={this.state.gapsub}
          options={{
            chart: {
              title: this.state.bjFilterInfo[0]["bjname"] + "Subscribe"
            }
          }}
          rootProps={{ "data-testid": "1" }}
          style={{
            padding: "50px 0 50px 0",
            marginLeft: "20px",
            borderTop: "1px solide black"
          }}
        />
        <div style={{ marginTop: "50px" }}>
          <Table dataSource={this.state.totalresult}>
            <Column title="" dataIndex="PlatfromName" key="PlatfromName" />
            <Column title="Youtube" dataIndex="youtube_id" key="youtube_id" />
            <Column title="Afreeca" dataIndex="afreeca_id" key="afreeca_id" />
            <Column title="Twitch" dataIndex="twitch_id" key="twitch_id" />
          </Table>
        </div>

        <Button onClick={excelDownload}>
          <Icon type="file-excel" theme="twoTone" />
          Excel Download
        </Button>
      </div>
    );
  }
}

export default Bjdetails;
