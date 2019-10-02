import React, { Component } from "react";
import { fakeData } from "../sub_data";

class Platform extends Component {
  render() {
    console.log(fakeData);
    // var resultarr = [];
    // for (let i = 0; i < fakeData.length; i++) {
    //   if (fakeData[i]["user_name"])
    //     resultarr.push({
    //       view: fakeData[i]["view_count"]
    //     });
    // }
    return (
      <div
        style={{ width: "600px", height: "1000px", border: "1px solid red" }}
      ></div>
    );
  }
}

export default Platform;
