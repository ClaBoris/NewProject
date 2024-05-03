        import React, {useContext, useEffect} from 'react'
        import ProductFinder from '../apis/ProductFinder'
        import { ProductsContext } from '../context/ProductsContext'
        import { useNavigate } from 'react-router-dom';

        const ProductsList = (props) => {
          const { products, setProducts } = useContext(ProductsContext);
          let navigate= useNavigate()
          const fetchData = async () => {
            try{
              const response = await ProductFinder.get("/");
              console.log(response.data.data);
              setProducts(response.data.data.product); //singolo prodotto
          }catch(err){}
          };
          useEffect(() => {
            
            fetchData();
            console.log(products);
          }, []); 
           

          const handleDelete = async (id) => {
            try{
             const response = await ProductFinder.delete(`/${id}`); //con questi apici la delite async funziona
             setProducts(products.filter((product) => {
              return product.id !== id;
             }));
            }catch(err){
              console.log(err);
            }
          };

          const handleUpdate = async (id) => {
             navigate(`/products/${id}/update`);
          };

          return (
            <div className="list-group">
            <table className="table table-bordered table-secondary">
              <thead>
                <tr className="bg-primary">
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Ratings</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody >
                {products &&
                  products.map((product) => {
                    return (
                      <tr
                        
                        key={product.id}
                      >
                        <td>{product.name}</td>
                        <td>{"$".repeat(product.price)}</td>
                        <td>Rating</td>
                        <td>
                          <button
                            onClick={() => handleUpdate(product.id)}
                            className="btn btn-warning"
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
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