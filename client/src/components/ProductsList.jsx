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




         /* const trackEvent = (eventName, eventData) => {
            //creo l'oggetto che rappresenza l'evento:
            const eventObject = {
              name: eventName,
              data: eventData
            };

            //invio l'evento al backend
            fetch(`/api/v1/products/trackEventDelete`, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(eventObject)
            })
            .then(response => {
              if (response.ok) {
                console.log('Evento tracciato con successo');
              } else {
                console.error('Errore durante il tracciamento dell\'evento:', response.status);
              }
            })
            .catch(error => {
              console.error('Errore durante il tracciamento dell\'evento:', error);
            });
            


            // Logica per tracciare l'evento
            console.log(`Evento tracciato: ${eventName}`, eventData);
            // Qui dovresti inserire la logica per inviare l'evento al tuo backend
          }
          useEffect(() => {
            fetchData(); // Esegui il fetch dei prodotti al montaggio del componente
          }, []);*/
           



          const handleDelete = async (e, id) => {
            e.stopPropagation();
            try{
             const response = await ProductFinder.delete(`/${id}`); //con questi apici la delite async funziona
             setProducts(products.filter((product) => {
              return product.id !== id;
             }));
              // Traccia l'evento di eliminazione del prodotto
             // trackEvent('prodotto_eliminato', { product_id: id }); 
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