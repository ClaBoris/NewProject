import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';

const UpdateProduct = (props) => {
const {id} = useParams();
const {products} = useContext(ProductsContext);
const [name, setName] = useState("");
const [price, setPrice] = useState(""); 
    return (
    <div>
        <h1></h1>
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
            <div type="submit"  className="btn btn-success">Submit</div>
        </form>
    </div>
    );
};

export default UpdateProduct;