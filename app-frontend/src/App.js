import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
// import Inventory from './Components/Inventory';
// import ProductDetails from './Components/ProductDetails';
import Navbar from './Components/Navbar';
// import AddItem from './Components/AddItem';
// import UpdateItem from './Components/UpdateItem';
import Profile from './Components/Profile';
import UserInventory from './Components/UserInventory';
import VisitorInventory from './Components/VisitorInventory';

//////////////////////////////////////////////////

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Routes>
          <Route path={'/'} element={<Home/>}></Route>
          {/* <Route path={'/inventory'} element={<Inventory/>}></Route> */}
          {/* <Route path={'/details'} element={<ProductDetails/>}></Route> */}
          {/* <Route path={'/add-item'} element={<AddItem/>}></Route>
          <Route path={'/update-item'} element={<UpdateItem/>}></Route> */}
          <Route path={'/profile'} element={<Profile/>}></Route>
          <Route path={'/user'} element={<UserInventory/>}></Route>
          <Route path={'/visitor'} element={<VisitorInventory/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

//////////////////////////////////////////////////

export default App;

