        import React, {useContext, useEffect}from 'react'
        import ProductFinder from '../apis/ProductFinder'
        import { ProductsContext } from '../context/ProductsContext'

        const ProductsList = (props) => {
          const {products, setProducts} = useContext(ProductsContext)
          useEffect(() => {
            const fetchData = async () => {
              try{
                const response = await ProductFinder.get("/");
                console.log(response.data.data);
                setProducts(response.data.data.products);
            }catch(err){}
            };

            fetchData();
          },[]); 
           
          return (
            <div className="list-group">
              <table className="table table-hover table-dark">
                <thead>
                  <tr className="bg-primary">
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Ratings</th>
                    <th scope="col">Edit</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => {
                      return (
                        <tr
                          key={product.id}
                        >
                          <td>{product.name}</td>
                          <td>{"$".repeat(product.price)}</td>
                          <td>
                              <button className="btn btn-warning">Update</button>
                          </td>
                          <td>
                              <button className="btn btn-danger">Delete</button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          );
        };
      
        export default ProductsList;