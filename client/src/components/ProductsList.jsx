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
           

          const handleDelete = async (e, id) => {
            e.stopPropagation();
            try{
             const response = await ProductFinder.delete(`/${id}`); //con questi apici la delite async funziona
             setProducts(products.filter((product) => {
              return product.id !== id;
             }));
            }catch(err){
              console.log(err);
            }
          };

          const handleUpdate = async (e, id) => {
             e.stopPropagation();
             navigate(`/products/${id}/update`);
          };

          const handleProductSelect = async (id) => {
            navigate(`/products/${id}`);
          };

          return (
            <div className="list-group">
            <table className="table table-hover table-secondary">
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
                        onClick={() => handleProductSelect(product.id)} 
                        key={product.id}
                      >
                        <td>{product.name}</td>
                        <td>{"$".repeat(product.price)}</td>
                        <td>Rating</td>
                        <td>
                          <button
                            onClick={(e) => handleUpdate(e, product.id)}
                            className="btn btn-warning"
                          >
                            Update
                          </button>
                        </td>
                        <td>
                          <button
                            onClick={(e) => handleDelete(e, product.id)}
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