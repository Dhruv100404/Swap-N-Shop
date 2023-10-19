import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import SignUp from './components/signUp'; 
import Profile from './components/Profile';
import About from './components/About'; 
import UserProducts from './components/userProducts';
import SellProduct from './components/SellProduct';
import Contact from './components/Contact';
import Offerpage from './components/offerpage';
import Bargain from './components/bargain';
import 'bootstrap/dist/css/bootstrap.css';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/About" element={<About />} />
      <Route path="/Sell" element={<SellProduct />} />
      <Route path="/userproduct" element={<UserProducts />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Offers/:productId" element={<Offerpage />} />
      <Route path="/Bargain/:productId" element={<Bargain />} />
    </Routes>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
