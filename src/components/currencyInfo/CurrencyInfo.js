import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import useAplhavantageService from "../../services/AlphavantageService";
import "./currencyInfo.scss";


class MetaData {
  info;
  currentSymbol;
  lastRefreshed;
  interval;
  tz;
  constructor(info, currentSymbol, lastRefreshed, interval, tz) {
    this.info = info;
    this.currentSymbol = currentSymbol;
    this.lastRefreshed = new Date(lastRefreshed);
    this.interval = Number(interval.replace(/\D/g, "") * 60);
    this.tz = tz;
  }
}
const CurrencyInfo = (props) => {
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

  const skeleton = symbol || loading || error ? null : <Skeleton />;
  const errMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !symbol) ? (
    <View symbol={symbol} />
  ) : null;

  return (
    <div className="currency__info">
      {skeleton}
      {errMessage}
      {spinner}
      {content}
    </div>
  );
};

function formatDate(date) {
  return `
    ${date.getDate()}/${date.getMonth()}/${date.getFullYear()}
    ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
  `;
}

function getMetaData(metaData) {
  let info, currentSymbol, lastRefreshed, interval, tz;

  for (const [key, value] of Object.entries(metaData)) {
    if (key.match("Information")) info = value;
    if (key.match("Symbol")) currentSymbol = value;
    if (key.match("Refreshed")) lastRefreshed = value;
    if (key.match("Interval")) interval = value;
    if (key.match("Time")) tz = value;
  }
  return new MetaData(info,currentSymbol,lastRefreshed,interval,tz);
}

const View = ({ symbol }) => {
  const { info, currentSymbol, lastRefreshed, interval, tz } = getMetaData(
    symbol["Meta Data"]
  );
  // console.log('CurrencyInfo.View:',ts);
  // console.log('CurrencyInfo.View:',meta);

  return (
    <>
      <div className="char__basics">
        <h1>Текущий торговый инструмент: {currentSymbol}</h1>
        <p>Информация о торговом инструменте: {info}</p>
        <ol>
          <li>{formatDate(lastRefreshed)}</li>
          <li>Интервал {interval} сек.</li>
          <li>Временная зона в тренде {tz}</li>
        </ol>
      </div>
    </>
  );
};


CurrencyInfo.propTypes = {
  charId: PropTypes.number,
};

export default CurrencyInfo;
