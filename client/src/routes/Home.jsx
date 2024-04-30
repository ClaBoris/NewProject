import React from 'react'
import Header from '../components/Header';
import App from '../App';
import AddProduct from '../components/AddProducts';
import ProductsList from '../components/ProductsList';

const Home = () => {
    return (
    <div style={{backgroundColor: 'mediumseagreen'}}>
        <Header />
        <AddProduct />
        <ProductsList />
    </div>
    )
}

export default Home;