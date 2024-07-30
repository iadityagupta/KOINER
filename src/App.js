import './App.css';
import { Routes, Route } from "react-router-dom"
import Exchanges from './Pages/Exchanges';
import Coins from './Pages/Coins';
import CoinDetails from './Pages/CoinDetail';
import News from './Pages/News';
import Wishlist from './Pages/Wishlist';

function App() {
  return (
    <div className='APP'>
    <Routes>
      <Route path='/' element={<Exchanges/>}  /> 
      <Route path='/Coins' element={<Coins/>}/>
      <Route path='/Coins/:id' element={<CoinDetails/>} />
      <Route path='/News' element={<News/>}/>
      <Route path='/Wishlist' element={<Wishlist/>}/>
      
    </Routes>
   
   
  </div>
    
  );
}

export default App;
