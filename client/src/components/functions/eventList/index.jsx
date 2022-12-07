import { useContext } from "react";
import bluarr from "../../imgs/bluearr.png";
import { DefaultContext } from "../../../Context";
import React, { useEffect, useState } from 'react';
import { getAllEvents } from "../../../actions/event";

const types = ["Cleaning day", "Tree planting", "Shelter visiting"];

export const EventList = () => {

    const [search, setSearch] = useState('');
    const [type, setType] = useState(types[0]);
    const [events, setEvents] = useState();
    const arraySF = events;


    const getEvents = async () => {
        await getAllEvents().then(res => setEvents(res));
    }

    useEffect(() => {
        getEvents();
    }, [])

    return (
        <div className='reg block'>
            <h1>List of events</h1>
            <div className="eventinfo">
                <div className="search">
                    <input
                        type="text"
                        placeholder="Event number"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Event name"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Event coordinator"
                        onChange={(event) => setSearch(event.target.value)}
                    />
                    <select
                        onChange={(event) => setType(event.target.value)}
                    >
                        {types.map((item, index) =>
                            <option
                                key={index}
                                value={item}
                            >{item}</option>
                        )}
                    </select>
                    <select
                        onChange={(event) => {
                        }}
                    >
                        {arraySF 
                            ? arraySF.map((item, index) => 
                                <option
                                    key={index}
                                    value={index}
                                >{item.location}</option>)
                            : <></>}
                    </select>
                </div>
                {arraySF?.map((item, index) => 
                    <div className='eventinfo' key={index}>
                        <p>{item.number}</p>
                        <p>{item.title}</p>
                        <p>{item.city}</p>
                        <p>{item.location}</p>
                        <p>{item.date}</p>
                        <p>{item.status}</p>
                        <a
                            className='link'
                        >
                            Edit <img
                                src={bluarr}
                                alt="blue arrow"
                                className="arr"
                            />
                        </a>
                        <a
                            className='link'
                        >
                            See details <img
                                src={bluarr}
                                alt="blue arrow"
                                className="arr"
                            />
                        </a>
                        <a
                            className='link'
                        >
                            See report <img
                                src={bluarr}
                                alt="blue arrow"
                                className="arr"
                            />
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}
