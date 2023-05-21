import './App.css';
import { useState } from "react";

import CurrencyInfo from '../currencyInfo/CurrencyInfo';
import Trend from '../lineChart/LineChart';

function App() {
  const[selectedChart,setChart]=useState(null);

  const onChartSelected=(id)=>{
    console.log('App.onChartSelected',id);
    setChart(id);
  }

  return (
    <div className="app">
      <main>
        <div className='chart__content'>
          <CurrencyInfo symbol={'IBM'} onChartSelected={onChartSelected}/>
        </div>
        <div className='chart__content'>
          <Trend interval={'1min'} chartId={selectedChart}/>
        </div>
      </main>
    </div>
  );
}

export default App;
