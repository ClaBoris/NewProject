import React from 'react'
import Header from '../components/Header';
import AddProduct from '../components/AddProduct';
import ProductsList from '../components/ProductsList';

const Home = () => {
    return (
    <div>
        <Header />
        <AddProduct />
        <ProductsList />
    </div>
    );
};

export default Home;