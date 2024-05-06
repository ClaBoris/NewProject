import React, {useState, createContext} from "react";

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([]); //chiamata iniziale con array vuoto
    const [selectedProduct, setSelectedProduct] = useState([]);

    const addProducts = (newProduct) => {
        setProducts([...products, newProduct])
    };

    return (
        <ProductsContext.Provider 
        value={{
            products, 
            setProducts, 
            addProducts,
            selectedProduct,
            setSelectedProduct
        }}
        >
            {props.children}
        </ProductsContext.Provider>
    )
};
  