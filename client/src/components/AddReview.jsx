import React, { useState, useEffect } from "react";
import ProductFinder from "../apis/ProductFinder";
import { useLocation, useNavigate, useParams } from "react-router-dom";

    const AddReview = () => {
        const {id} = useParams();
        const location = useLocation();
        console.log(location);
        let navigate = useNavigate();
        console.log(id);

        const [name,setName] = useState("");
        const [reviewText, setReviewText] = useState("");
        const [rating, setRating] = useState("Rating");

/*******************************************************/
const [events, setEvents] = useState([]);

useEffect(() => {
    // Effetto per inviare gli eventi al server quando cambiano
    sendEventsToServer(events);
}, [events]);

const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
};

const handleChangeName = (e) => {
    addEvent(`Name changed: ${e.target.value}`);
    setName(e.target.value);
};

const handleChangeRating = (e) => {
    addEvent(`Rating changed: ${e.target.value}`);
    setRating(e.target.value);
};

const handleChangeReviewText = (e) => {
    addEvent(`Review text changed: ${e.target.value}`);
    setReviewText(e.target.value);
};

const handleClick = () => {
    try {
        console.log("User clicked the 'Submit' button");
        sendEventsToServer([{ event: "Button clicked" }]);
    } catch (error) {
        console.error("Error handling click:", error);
    }
};

const sendEventsToServer = (events) => {
    try {
        console.log("Events sent to server:", events);
        fetch("http://localhost:3001/api/v1/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ events }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to send events to server");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Response from server:", data);
            })
            .catch((error) => {
                console.error("Error sending events to server:", error);
            });
    } catch (error) {
        console.error("Error sending events to server:", error);
    }
};
/*******************************************************/

        const handleSubmitReview = async (e) => {
            e.preventDefault();
            try{
                const response = await ProductFinder.post(`/${id}/addReview`, {
                    name,
                    review: reviewText,
                    rating,
                });
                navigate(`/`);
            }catch(err){}
        };

        return (
           <div className="mb-2">
                <form action="">
                    <div className="form-row">
                        <div className="form-group col-8">
                            <label htmlFor="name"> Name </label>
                            <input 
                               value={name}
                               onChange={handleChangeName}
                               id="name" 
                               placeholder="name" 
                               type="text" 
                               className="form-control"
                            />
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="rating"> Rating </label>
                            <select 
                               value={rating}
                               onChange={handleChangeRating}
                               id="rating" 
                               className="custom-select"
                            >
                                <option disabled> Rating </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Review"> Review </label>
                        <textarea 
                           value={reviewText}
                           onChange={handleChangeReviewText}
                           id="Review" 
                           className="form-control"
                        ></textarea>
                    </div>
                    <button 
                    type="submit" 
                    onClick={(e) => {
                        handleClick();
                        handleSubmitReview(e);
                    }}  
                    className="btn btn-success"
                    >
                        Submit
                    </button>
                </form>
           </div>
        );
    };

    export default AddReview;