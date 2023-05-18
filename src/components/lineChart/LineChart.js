import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Spinner from "../spinner/Spinner";
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
  const [symbol, setSymbol] = useState(null);

  const { loading, error, getTimeSeriesIntraDay, clearError } =
    useAplhavantageService();

  useEffect(() => {
    updateCurrency();
  }, [props.symbol]);

  const onCurrencyLoaded = (symbol) => {
    console.log("onCurrencyLoaded:", symbol);
    setSymbol(symbol);
  };

  const updateCurrency = () => {
    const { symbol } = props;
    if (!symbol) {
      return;
    }
    clearError();
    getTimeSeriesIntraDay(symbol).then(onCurrencyLoaded);
  };

  const errMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !symbol) ? (
    <View symbol={symbol} />
  ) : null;

  return (
    <div className="currency__info">
      {errMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ symbol }) => {

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
