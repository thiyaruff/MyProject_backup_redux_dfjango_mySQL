import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Products from './features/adminProducts/Products';
import Shop from './features/shop/Shop';
import MyNav from './features/MyNav';
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <div className="App">
 
    <MyNav/>
    <p>welcome to my shop</p>
    <Outlet/>
    </div>
  );
}

export default App;
