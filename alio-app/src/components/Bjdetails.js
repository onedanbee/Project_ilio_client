import Chart from "react-google-charts";
import React, { Component } from "react";

class Bjdetails extends Component {
  render(props) {
    console.log(this.props.match.params.id);
    let userName = this.props.match.params.id;
    return (
      <Chart
        width={"1000px"}
        height={"600px"}
        chartType="Line"
        loader={<div>Loading Chart</div>}
        data={[
          [
            "Subscribe",
            "Guardians of the Galaxy",
            "The Avengers",
            "Transformers: Age of Extinction"
          ],
          [1, 37.8, 80.8, 41.8],
          [2, 30.9, 69.5, 32.4],
          [3, 25.4, 57, 25.7],
          [4, 11.7, 18.8, 10.5],
          [5, 11.9, 17.6, 10.4],
          [6, 8.8, 13.6, 7.7],
          [7, 7.6, 12.3, 9.6]
        ]}
        options={{
          chart: {
            title: userName + "Subscribe",
            subtitle: "아직"
          }
        }}
        rootProps={{ "data-testid": "1" }}
      />
    );
  }
}

export default Bjdetails;
