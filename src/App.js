import './App.css';
import { Routes, Route } from "react-router-dom"
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetail';
import News from './components/News';

function App() {
  return (
    <div className='APP'>
    <Routes>
      <Route path='/' element={<Exchanges/>}  /> 
      <Route path='/Coins' element={<Coins/>}/>
      <Route path='/Coins/:id' element={<CoinDetails/>} />
      <Route path='/News' element={<News/>}/>
      
    </Routes>
   
   
  </div>
    
  );
}

export default App;
