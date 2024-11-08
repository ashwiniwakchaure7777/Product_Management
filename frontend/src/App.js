import React from 'react';
import {BrowserRouter , Routes, Route} from "react-router-dom";
import AddNewProduct from "./components/AddNewProduct";
import GetProductDetails from "./components/GetProductDetails";
import InventoryDashboard from "./components/InventoryDashboard";


const App = () => {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<InventoryDashboard/>}/>
        <Route path='/addnewproduct' element={<AddNewProduct />}/>
        <Route path='/getproductdetails/:id' element={<GetProductDetails />}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App