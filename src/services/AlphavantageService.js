import {useHttp} from "../hooks/http.hook";

const useAplhavantageService = () => {
  const {loading, request, error, clearError} = useHttp();
  const _apiBase = process.env.NODE_ENV === 'development'
  ? `http://localhost:3010/api`
  : `https://www.alphavantage.co/query`;
  
  const _apiKey = "apikey=F69SODF06R3FE934";
  const _intraDAY = "?function=TIME_SERIES_INTRADAY";

  const getTimeSeriesIntraDay = async (symbol='IBM', interval='1min') =>{
    const response =await request(
      (process.env.NODE_ENV === 'development') ? 
      `${_apiBase}` :
      `${_apiBase}${_intraDAY}&symbol=${symbol}&interval=${interval}&outputsize=compact&datatype=json&${_apiKey}`
    );
    console.log(response);
    return response;
  }

  const getSymbolMetaData = async (symbol='IBM', interval='1min') =>{
    const response =await request(
      (process.env.NODE_ENV === 'development') ? 
      `${_apiBase}` :
      `${_apiBase}${_intraDAY}&symbol=${symbol}&interval=${interval}&outputsize=compact&datatype=json&${_apiKey}`
    );
    console.log(response);
    return response;
  }

  const _transformTimeSeries = (timerSeries) =>{
    return {
      open: timerSeries.open,
      high: timerSeries.high,
      low: timerSeries.low,
      close: timerSeries.close
    };
  }

  return {loading, error, clearError, getTimeSeriesIntraDay, getSymbolMetaData};
}
export default useAplhavantageService;