import './App.css';
import { Routes, Route } from "react-router-dom"
import Exchanges from './components/Exchanges';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetail';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Exchanges/>}  /> 
      <Route path='/Coins' element={<Coins/>}/>
      <Route path='/Coins/:id' element={<CoinDetails/>} />
    </Routes>
  );
}

export default App;