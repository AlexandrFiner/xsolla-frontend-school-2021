import EventCard from "./EventCard";
import React from "react";
import './EventList.css';

const EventFavorite = (props) => {
    // props.favorites

    const getList = () => {
        return props.events.filter(function (event) {
            if(props.favorites.indexOf(Number(event.id)) === -1)
                return false; // skip

            return true;
        });
    }

    const printList = () => {
        let list = getList();
        if(list.length) {
            return list.map((event) => {
                return <EventCard event={event} handleFavoriteClick={props.handleFavoriteClick} isFav={props.favorites.indexOf(Number(event.id)) !== -1}/>
            })
        } else {
            return <span className={"EventNotFound"}>Nothing was found</span>
        }
    }

    return (
        <div className="eventList">
            {printList()}
        </div>
    )
};

export default EventFavorite;