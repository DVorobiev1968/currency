import './App.css';
import CurrencyInfo from '../currencyInfo/CurrencyInfo';
import Trend from '../lineChart/LineChart';

function App() {
  return (
    <div className="app">
      <main>
        <div className='chart__content'>
          <CurrencyInfo symbol={'IBM'}/>
        </div>
        <div className='chart__content'>
          <Trend interval={'1min'}/>
        </div>
      </main>
    </div>
  );
}

export default App;
