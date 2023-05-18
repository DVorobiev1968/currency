import {useHttp} from "../hooks/http.hook";

const useAplhavantageService = () => {
  const {loading, request, error, clearError} = useHttp();
  const _apiBase = "https://www.alphavantage.co/query";
  const _apiKey = "apikey=demo";
  const _intraDAY = "?function=TIME_SERIES_INTRADAY";

  const getTimeSeriesIntraDay = async (symbol, interval='1min') =>{
    const response =await request(
      `${_apiBase}${_intraDAY}&symbol=${symbol}&interval=${interval}&outputsize=compact&datatype=json&${_apiKey}`
    );
    console(response);
    // return response.timerSeries.map(_transformTimeSeries);
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

  return {loading, error, clearError, getTimeSeriesIntraDay};
}
export default useAplhavantageService;