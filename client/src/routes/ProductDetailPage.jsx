import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import ProductFinder from '../apis/ProductFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const ProductDetailPAge = () => {
    const {id} = useParams();
    const {selectedProduct, setSelectedProduct} = useContext(ProductsContext);


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await ProductFinder.get(`/${id}`);
                
                setSelectedProduct(response.data.data);
            }catch(err){
                console.log(err);
            }
        };

        fetchData();
    }, []);


    return <div>{selectedProduct && (
        <>
            <div className="mt-3">
                <Reviews reviews={selectedProduct.reviews}/>
            </div>
                <AddReview />
        </> 
    )}</div>
};

export default ProductDetailPAge;