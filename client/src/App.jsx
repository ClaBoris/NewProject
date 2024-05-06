import React from "react";
import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./routes/Home";
import UpdatePage from "./routes/UpdatePage";
import ProductDetailPAge from './routes/ProductDetailPAge';
import { ProductsContextProvider } from "./context/ProductsContext";

function App (){
    return (
    <ProductsContextProvider >
         <div className="container">
       <Router>
            <Routes>
            <Route exact path="/" element={<Home />}/>
            <Route exact path="/products/:id/update" element={<UpdatePage />}/>
            <Route exact path="/products/:id" element={<ProductDetailPAge />}/>
            </Routes>
       </Router> 
    </div>
    </ProductsContextProvider>
    )
};

export default App;