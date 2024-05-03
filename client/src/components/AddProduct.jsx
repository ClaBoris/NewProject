import React, { useContext, useState } from 'react'
import ProductFinder from '../apis/ProductFinder';
import { ProductsContext } from '../context/ProductsContext';

const AddProduct = () => {
    const { addProducts } = useContext(ProductsContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("Price");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const response = await ProductFinder.post("/", {
                name,
                price: price,
            });
            console.log(response.data.data);
            addProducts(response.data.data.product);
        }catch(err){
            console.log(err);
        }
    };

    return (
    <div className='mb-4' >
        <form action="">
            <div className='form-row'>
                <div className='col'>
                    <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type='text' 
                    className='form-control' 
                    placeholder='name' 
                    style={{width: '500px'}}
                    />
                </div>
                <div className='col'>
                    <select 
                     value={price} 
                     onChange={(e) => setPrice(e.target.value)}
                     className="custom-select my-1 mr-sm-2" 
                     
                     >
                        <option disabled>Price</option>
                        <option value={1}>$</option>
                        <option value={2}>$$</option>
                        <option value={3}>$$$</option>
                        <option value={4}>$$$$</option>
                        <option value={5}>$$$$$</option>
                    </select>
                </div>
                <button 
                type="submit" 
                onClick={handleSubmit} 
                className='btn btn-success' 
                >
                    Add
                </button>
            </div>
        </form>
    </div>
    )
};

export default AddProduct;