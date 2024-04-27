import React from 'react'
import{BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./routes/Home"
import ProductDetailPage from "./routes/ProductDetailPage"
import UpdatePage from "./routes/UpdatePage"
const App = () => {
    return <div>
       <Router>
            <Routes>
            <Route exact path="/" component={Home}/>
            <Route exact path="/products/:id/update" component={UpdatePage}/>
            <Route exact path="/products/:id" component={ProductDetailPage}/>
            </Routes>
       </Router> 
    </div>
};

export default App;