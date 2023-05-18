import { useState, useEffect} from "react";
import { PropTypes } from "prop-types";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import useAplhavantageService from "../../../services/AlphavantageService";
import "./currencyInfo.scss";

const CurrencyInfo=(props)=>{
  const [symbol, setSymbol]=useState(null);

  const {loading, error, getTimeSeriesIntraDay, clearError} = useAplhavantageService();

  useEffect(()=>{
    updateCurrency();
  },[props.symbol]);

  const onCurrencyLoaded = (symbol) => {
    console.log('onCurrencyLoaded:',symbol);
    setSymbol(symbol);
  };

  const updateCurrency = () => {
    const { symbol } = props;
    if (!symbol) {
      return;
    }
    clearError();
    getTimeSeriesIntraDay(symbol)
      .then(onCurrencyLoaded)
  };

  const skeleton = symbol || loading || error ? null : <Skeleton />;
  const errMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !symbol) ? <View symbol={symbol} /> : null;

  return (<div className="currency__info">
    {skeleton}
    {errMessage}
    {spinner}
    {content}
  </div>
  );
}
const View = ({ symbol }) => {
    console.log('CurrencyInfo.View:',symbol);
//   const { name, description, thumbnail, homepage, wiki, comics } = symbol;
  return (
    <>
      <div className="char__basics">
        <h1>Current symbol:</h1>
    </div>
    </>
  );
};

CurrencyInfo.propTypes={
  charId:PropTypes.number,
  
}

export default CurrencyInfo;
