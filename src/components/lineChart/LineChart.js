import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Spinner from "../spinner/Spinner";
import Skeleton from "../skeleton/Skeleton";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useAplhavantageService from "../../services/AlphavantageService";
import {
  ArgumentAxis,
  ValueAxis,
  Chart,
  LineSeries,
} from '@devexpress/dx-react-chart-bootstrap4';
import '@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css';

class TimeSeries {
  timestamp;
  open;
  close;
  high;
  low;
  volume;

  constructor(timestamp, open, close, high, low, volume) {
    this.timestamp = timestamp;
    this.open = open;
    this.close = close;
    this.high = high;
    this.low = low;
    this.volume = volume;
  }
}

const data = [
  { argument: 1, value: 10 },
  { argument: 2, value: 20 },
  { argument: 3, value: 30 },
];

function setTS(timeSeries) {
  const ts = [];
  for (const [key, value] of Object.entries(timeSeries)) {
    let item = new TimeSeries(new Date(key));
    item.open = Number(value["1. open"]);
    item.high = Number(value["2. high"]);
    item.low = Number(value["3. low"]);
    item.close = Number(value["4. close"]);
    item.volume = Number(value["5. volume"]);
    ts.push(item);
  }
  return ts;
}

const Trend = (props)=>{
  const [interval,setInterval] = useState(null);
  const [chart,setChart] = useState(null);

  const { loading, error, getTimeSeriesIntraDay, clearError } =
    useAplhavantageService();

  useEffect(() => {
    console.log("LineChart.useEffect:", chart);
    // onRequest();
  }, [props.chartId]);

  const updateChart = () => {
    const { chartId } = props;
    console.log('LineChart.onRequest',chartId);
    if (!chartId) {
      return;
    }
    clearError();
    getTimeSeriesIntraDay()
      .then(onLoadTimeSeries);
  };

  const onLoadTimeSeries = (recordSet) => {
    console.log("onLoadTimeSeries:", recordSet);
    setChart(recordSet);
  };

  const onRequest = () => {
    const { interval } = props;
    console.log('LineChart.onRequest',interval);
    if (!interval) {
      return;
    }
    clearError();
    getTimeSeriesIntraDay()
      .then(onLoadTimeSeries);
  };

  const skeleton = chart || loading || error ? null : <Skeleton />;
  const errMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !chart) ? (
    <View timeSeries={chart} />
  ) : null;

  return (
    <div className="currency__info">
      {errMessage}
      {spinner}
      {content}
      {skeleton}
    </div>
  );
};

const View = ({ timeSeries }) => {
  const timeseries = setTS(timeSeries["Time Series (1min)"]);
  console.log('LineChart.View',timeseries);
  return (
    <>
      <div className="currency__trend">
        <h1>График</h1>
        <Chart data={data}>
          <ArgumentAxis/>
          <ValueAxis/>
          <LineSeries valueField="value" argumentField="argument"/>
        </Chart>
      </div>
    </>
  )
};
  

export default Trend;
