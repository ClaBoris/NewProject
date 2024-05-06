import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import ProductFinder from '../apis/ProductFinder';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = (props) => {
const {id} = useParams();
let navigate= useNavigate();
const {products} = useContext(ProductsContext);
const [name, setName] = useState("");
const [price, setPrice] = useState(""); 

useEffect(() => {
    const fetchData = async () => {
        const response = await ProductFinder.get(`/${id}`);
        console.log(response.data.data);
        setName(response.data.data.product.name);
        setPrice(response.data.data.product.price);
    };
    fetchData();
},[]);


const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProduct = await ProductFinder.put(`/${id}`, {
        name, 
        price: price
    });
    navigate(`/`);
}; 

    return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="name" >Name</label>
                <input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                id='name' 
                className='form-control' 
                type="text" 
                style={{width: '500px'}}
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">Price</label>
                <input 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                id='price' 
                className='form-control' 
                type="number" 
                style={{width: '500px'}} 
                />
            </div>
            <div onClick={handleSubmit} type="submit"  className="btn btn-success">Submit</div>
        </form>
    </div>
    );
};

export default UpdateProduct;