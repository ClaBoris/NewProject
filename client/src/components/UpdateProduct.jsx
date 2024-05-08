import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ProductsContext } from '../context/ProductsContext';
import ProductFinder from '../apis/ProductFinder';
import { useNavigate } from 'react-router-dom';

const UpdateProduct = (props) => {
const {id} = useParams();
let navigate= useNavigate();
const {products} = useContext(ProductsContext);
const [name, setName] = useState("");
const [price, setPrice] = useState(""); 

useEffect(() => {
    const fetchData = async () => {
        const response = await ProductFinder.get(`/${id}`);
        console.log(response.data.data);
        setName(response.data.data.product.name);
        setPrice(response.data.data.product.price);
    };
    fetchData();
},[]);

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


    const handleChangeName = (e) => {
        // Aggiungiamo un evento per ogni cambiamento nell'input del nome del prodotto
        sendEventsToServer([{ event: `Product name changed: ${e.target.value}` }]);
        setName(e.target.value);
    };

    const handleChangePrice = (e) => {
        // Aggiungiamo un evento per ogni cambiamento nell'input del prezzo del prodotto
        sendEventsToServer([{ event: `Product price changed: ${e.target.value}` }]);
        setPrice(e.target.value);
    };

    const handleClick = () => {
        try {
            console.log("User clicked the 'Add' button");
            sendEventsToServer([{ event: "Button clicked" }]);
        } catch (error) {
            console.error("Error handling click:", error);
        }
    };

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

const handleSubmit = async (e) => {
    e.preventDefault();
    const updateProduct = await ProductFinder.put(`/${id}`, {
        name, 
        price: price
    });
    navigate(`/`);
}; 

    return (
    <div>
        <form action="">
            <div className="form-group">
                <label htmlFor="name" >Name</label>
                <input 
                value={name} 
                onChange={handleChangeName}  
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
                onChange={handleChangePrice}
                id='price' 
                className='form-control' 
                type="number" 
                style={{width: '500px'}} 
                />
            </div>
            <div 
             onClick={(e) => {
                handleClick();
                handleSubmit(e);
            }}  
            type="submit"  
            className="btn btn-success"
            >
                Submit
            </div>
        </form>
    </div>
    );
};

export default UpdateProduct;