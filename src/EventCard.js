import './EventCard.css';

const EventCard = (props) => {
    return (
        <div className={"EventCard"} style={{backgroundImage: 'url('+props.event.image+')'}}>
            <div className="EventGrey"/>
            <span className={"EventDate"}>{props.event.date.split('.')[0]}</span>
            <span className={"EventName"}>{props.event.name}</span>
            <span className={`EventFavorite ${props.isFav ? "active" : ""}`} onClick={() => props.handleFavoriteClick(props.event)}/>
        </div>
    );
};

export default EventCard;