import React, { useContext, useState, useEffect } from 'react'
import ProductFinder from '../apis/ProductFinder';
import { ProductsContext } from '../context/ProductsContext';
import axios from 'axios';

const AddProduct = () => {
    const { addProducts } = useContext(ProductsContext);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("Price");

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
                    onChange={handleChangeName}  
                    type='text' 
                    className='form-control' 
                    placeholder='name' 
                    style={{width: '500px'}}
                    />
                </div>
                <div className='col'>
                    <select 
                     value={price} 
                     onChange={handleChangePrice}
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
                onClick={(e) => {
                    handleClick();
                    handleSubmit(e);
                }}  
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