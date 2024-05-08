        import React, {useContext,useState, useEffect} from 'react'
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


          
/*******************************************************/
      //creo lo stato per gli eventi: 
    const[events,setEvents] = useState([]);

    //funzione per aggiungere un evento:
    const addEvent = (event) => {
        setEvents(prevEvents => [...prevEvents, event]);
    };

    //Effetto per inviare gli eventi al server quando cambiano
    useEffect(() => {
        if (events.length > 0) {
            sendEventsToServer(events);
        }
    }, [events]);

    const sendEventsToServer = (events) => {
        try {
            // Stampiamo gli eventi nella console del browser
            console.log("Events sent to server:", events);

            // Inviamo gli eventi al server
            fetch("http://localhost:3001/api/v1/events", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ events })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send events to server');
                }
                return response.json();
            })
            .then(data => {
                console.log("Response from server:", data);
            })
            .catch(error => {
                console.error("Error sending events to server:", error);
            });
        } catch (error) {
            console.error("Error sending events to server:", error);
        }
    };

/*******************************************************/

          const handleDelete = async (e, id) => {
            e.stopPropagation();
            try{
              // Elimina tutte le recensioni associate al prodotto
              await ProductFinder.delete(`/${id}/deleteReviews`);

              // Aggiungiamo un evento per la cancellazione di un prodotto
              sendEventsToServer([{ event: `Product deleted: ${id}` }]);

             const response = await ProductFinder.delete(`/${id}`); //con questi apici la delite async funziona
             console.log("Response from delete product API:", response);

             setProducts(products.filter((product) => {
              return product.id !== id;
             }));
            }catch(err){
              console.log(err);
            }
          };

          const handleUpdate = async (e, id) => {
            try{

               // Aggiungiamo un evento per l'aggiornamento di un prodotto
              sendEventsToServer([{ event: `Product updated: ${id}` }]);

              e.stopPropagation();
              navigate(`/products/${id}/update`);

            }catch(err){
              console.log(err);
            }
             
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
                            Delete<i className="fa fa-trash mr-1"></i>
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