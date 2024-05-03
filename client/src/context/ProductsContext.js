import React, {useState, createContext} from "react";

export const ProductsContext = createContext();

export const ProductsContextProvider = (props) => {
    const [products, setProducts] = useState([]); //chiamata iniziale con array vuoto

    const addProducts = (newProduct) => {
        setProducts([...products, newProduct])
    };

    return (
        <ProductsContext.Provider 
        value={{
            products, 
            setProducts, 
            addProducts
        }}
        >
            {props.children}
        </ProductsContext.Provider>
    )
};
  