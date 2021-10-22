import React, {useState, useEffect} from "react";
import './App.css';
import EventList from "./EventList";
import EventFavorite from "./EventFavorite";

const App = () => {
    const [events, setEvents] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [cities, setCities] = useState(["Amsterdam"]);
    const [months] = useState([
        { id: 1, name: "January" },
        { id: 2, name: "February" },
        { id: 3, name: "March" },
        { id: 4, name: "April" },
        { id: 5, name: "May" },
        { id: 6, name: "June" },
        { id: 7, name: "July" },
        { id: 8, name: "August" },
        { id: 9, name: "September" },
        { id: 10, name: "October" },
        { id: 11, name: "November" },
        { id: 12, name: "December" },
    ]);
    const [user, setUser] = useState({
        city: 'undefined',
        month: 0
    });

    const getEventsList = async() => {
        const url = 'https://raw.githubusercontent.com/xsolla/xsolla-frontend-school-2021/main/events.json';

        const response = await fetch(url);
        const responseJson = await response.json();

        let cities = [];
        responseJson.forEach(res => {
            if(cities.indexOf(res.city) === -1)
                cities.push(res.city);
        });

        setCities(cities);
        setEvents(responseJson);
    }

    useEffect(() => {
        getEventsList().then(() => {
            setUser({
                city: cities[0],
                month: months[0].id
            });
            let fav = localStorage.getItem('favoriteEvents') === null ? [] : JSON.parse(localStorage.getItem('favoriteEvents'));
            console.log(fav);
            setFavorites(fav)
        });
    }, []);

    const addFavorite = (event) => {
        let newFavorite;
        const eventId = Number(event.id);
        if (favorites.indexOf(eventId) === -1) {
            // Такого еще нет
            newFavorite = [...favorites, Number(event.id)];
        } else {
            newFavorite = favorites.filter(item => item !== eventId);
        }
        setFavorites(newFavorite);
        localStorage.setItem('favoriteEvents', JSON.stringify(newFavorite));
    };

    const selectCity = (result) => {
        setUser({
            ...user, city: result.target.value
        })
    };

    const selectMonth = (result) => {
        setUser({
            ...user, month: result.target.value
        })
    };

    return (
        <>
            <div className="App">
                <h1>Event Listing</h1>
                <div className="selector">
                    <span>City:</span>
                    <select name="citySelect" onChange={selectCity}>
                        {cities.map((city) => {
                            return <option value={city}>{city}</option>
                        })}
                    </select>
                    <span>Month:</span>
                    <select value={user.month} onChange={selectMonth}>
                        {months.map((month) => {
                            return <option value={month.id}>{month.name}</option>
                        })}
                    </select>
                </div>
                <EventList
                    user={user}
                    events={events}
                    favorites={favorites}
                    handleFavoriteClick={addFavorite}
                />
            </div>
            {favorites.length > 0 && <div className="App">
                <h1>Favorite</h1>
                <EventFavorite user={user}
                               events={events}
                               favorites={favorites}
                               handleFavoriteClick={addFavorite}/>
            </div>}
        </>
    );
}

export default App;
