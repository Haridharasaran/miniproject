
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Register from './Component/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Component/Login'
import Dashboard from './Component/Dashboard'
import Home from './Component/Home';
import { useState } from 'react';
import About from './Component/About';
import Menu from './Component/Menu';
// import Product from './Component/Product';

function App() {

  const [bool, setBool] = useState(null)

  const [carts,setCarts] = useState('')
  return (


    <BrowserRouter>

      

      <Routes>

        <Route path = "/" element={<Home boo ={{bool}} />}/>
        <Route path="/register" element={<Register  boo= {{bool,setBool}}/>} />
       
        <Route path="/Login"
          element={<Login boo= {{bool,setBool}}  />} />

        <Route path="/Dash">
        <Route index element={<Dashboard boo = {{bool,setBool,carts,setCarts}}/>} />
        <Route path='/Dash/about' element={<About/>} />
        <Route path='/Dash/menu' element={<Menu carts = {{setCarts}} />} />
       </Route>
       
      </Routes>

    </BrowserRouter>

  );
}

export default App;
