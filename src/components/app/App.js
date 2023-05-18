import './App.css';
import CurrencyInfo from '../currencyInfo/CurrencyInfo';

function App() {
  return (
    <div className="app">
      <main>
        <div className='currency__content'>
          <CurrencyInfo symbol={'IBM'}/>
        </div>
      </main>
    </div>
  );
}

export default App;
