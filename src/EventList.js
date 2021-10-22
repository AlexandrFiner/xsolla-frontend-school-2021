import EventCard from "./EventCard";
import React from "react";
import './EventList.css';

const EventList = (props) => {
    // props.favorites

    const getList = () => {
        return props.events.filter(function (event) {
            if(
                Number(props.user.month) !== Number(event.date.split('.')[1]) ||
                props.user.city !== event.city
            )
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

export default EventList;