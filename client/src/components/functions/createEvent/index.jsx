import "./createEvent.css";
import { DefaultContext } from "../../../Context";
import { Input } from "../../auth/fullform/Input";
import { Select } from "../../auth/fullform/Select";
import { createEvent } from '../../../actions/event';
import { getCoordinators } from '../../../actions/user';
import React, { useState, useEffect, useContext } from "react";
import { storage } from "./../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const formats = ["Offline", "Online"];
const types = ["Cleaning day", "Tree planting", "Shelter visiting"];

export const CreateEvent = () => {
    
    const [hours, setHours] = useState(0);
    const [search, setSearch] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [partner, setPartner] = useState("");
    const { edu } = useContext(DefaultContext);
    const [organizator, setOrganizator] = useState();
    const [image, setImage] = useState();
    const [item, setItem] = useState({
        title: "",
        text: "",
        image: "",
        type: types[0],
        format: formats[0],
        city: edu?.countries ? edu?.countries[0]?.cities ? edu?.countries[0]?.cities[0]?.name : "" : "",
        location: "",
        mapLink: "",
        places: 0,
        date: "2022-02-22",
        startTime: "",
        endTime: "",
        duration: "",
        addInfo: "",
        partners: [],
        organizators: []
    });

    const arraySF = organizator?.filter(item => (item.firstName + "" + item.secondName).substring(0, search.length).toLowerCase() === search.toLowerCase());

    const handleNumbers = (value) => {
        return value ? parseInt(value.replace(/[^0-9\s]/g, "")) : 0;
    };

    const uploadImage = async (file) => {
        if (item.image === null) return;
        const imageRef = ref(storage, `events/${file.name + v4()}`);
        await uploadBytes(imageRef, file).then(async (res) => {
            await getDownloadURL(res.ref).then(async (url) => {
                setItem({...item, image: url});
            });
        })
        createEvent(item);
    }

    useEffect(() => {
        getCoordinators().then((response) => setOrganizator(response))
    }, [])

    useEffect(() => {
        var h = parseInt(item.endTime.split(":")[0]) - parseInt(item.startTime.split(":")[0]);
        var m = parseInt(item.endTime.split(":")[1]) - parseInt(item.startTime.split(":")[1]);
        if (m < 0) {
            h -= 1;
            m += 60;
        }
        setHours(h);
        setMinutes(m);
        setItem({...item, duration: `${h}.${m}`})
    }, [item.startTime, item.endTime])

    return (
        <div className="full reg block">
            <h1>Make an event</h1>
            <form action="post">
                <div className="form">
                    <Input
                        title="Title:"
                        value={item.title}
                        placeholder="Enter the title"
                        onChange={(e) => setItem({ ...item, title: e.target.value })}
                    />
                    <div className="field">
                        <Input
                            title="Image:"
                            type="file"
                            onChange={(e) => setImage(e.target.files[0])}
                        />
                        <div className='frame'>
                            {item.image && <img src={item?.image} alt="Event image"/>}
                        </div>
                    </div>
                    <div className="field">
                        <p>Text: <font className="warn">*</font></p>
                        <textarea
                            rows={10}
                            value={item.text}
                            placeholder="Enter the text"
                            onChange={(e) => setItem({ ...item, text: e.target.value })}
                        />
                    </div>
                    <div className="field">
                        <p>Additional information:</p>
                        <textarea
                            rows={10}
                            value={item.addInfo}
                            placeholder="Enter additional information"
                            onChange={(e) => setItem({ ...item, addInfo: e.target.value })}
                        />
                    </div>
                    <Select
                        title="Type:"
                        value={item.type}
                        onChange={(e) => setItem({...item, type: e.target.value})}
                        options={types}
                    />
                    <Select
                        title="Format:"
                        value={item.format}
                        onChange={(e) => setItem({...item, format: e.target.value})}
                        options={formats}
                    />
                    <Select
                        title="City:"
                        value={item.city}
                        onChange={(e) => setItem({...item, city: e.target.value})}
                        options={edu.countries ? edu?.countries[0]?.cities?.map((item) => {return item.name}) : []}
                    />
                    <Input
                        title="Location:"
                        value={item.location}
                        placeholder="Enter the location"
                        onChange={(e) => setItem({ ...item, location: e.target.value })}
                    />
                    <Input
                        title="Link:"
                        value={item.mapLink}
                        placeholder="Enter link for map"
                        onChange={(e) => setItem({ ...item, mapLink: e.target.value })}
                    />
                    <Input
                        title="Volunteers needed:"
                        value={item.places}
                        onChange={(e) => setItem({ ...item, places: handleNumbers(e.target.value) })}
                    />
                    <Input
                        title="Date:"
                        type="date"
                        value={item.date}
                        onChange={(e) => setItem({ ...item, date: e.target.value })}
                    />
                    <Input
                        title="Time to start:"
                        type="time"
                        value={item.startTime}
                        onChange={(e) => setItem({ ...item, startTime: e.target.value })}
                    />
                    <Input
                        title="Time to end:"
                        type="time"
                        value={item.endTime}
                        onChange={(e) => setItem({ ...item, endTime: e.target.value })}
                    />
                    <div className="field">
                        <p>Duration:</p>
                        <p className="duration">{hours ? hours : 0} hours {minutes ? minutes : 0} minutes</p>
                    </div>
                    <div className='field'>
                        <Input
                            title="Partners:"
                            value={partner}
                            placeholder="Enter the partner name"
                            onChange={(e) => setPartner(e.target.value)}
                        />
                        <a
                            className='cert btn'
                            onClick={() => {
                                setItem({...item, partners: [...item.partners, partner]})
                                setPartner("")
                            }}
                        >Add partner</a>
                        {item.partners.length
                            ? <table>
                                {item.partners?.map((thing, index) => 
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{thing.length > 15 ? thing.slice(0, 15) + "..." : thing}</td>
                                        <td>
                                            <a
                                                className='btn'
                                                onClick={() => setItem({...item, partners: item.partners.filter(part => part !== item.partners[index])})}
                                            >delete</a>
                                        </td>
                                    </tr>)}
                            </table>
                            : <span style={{marginTop: "15px"}}>No partners</span>
                        }
                    </div>
                    <div className='field'>
                        <p>Organizators: <font className="warn">*</font></p>
                        {item.organizators.length
                            ? <table>
                                {item.organizators?.filter(item => (item.firstName + "" + item.secondName).substring(0, search.length).toLowerCase() === search.toLowerCase())?.map((thing, index) => 
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{thing.firstName + " " + thing.secondName}</td>
                                        <td>
                                            <a
                                                className='btn'
                                                onClick={() => {
                                                    setItem({...item, organizators: item.organizators.filter(part => part.email !== item.organizators[index].email)})
                                                    setOrganizator([...organizator, thing])
                                                }}
                                            >delete</a>
                                        </td>
                                    </tr>)}
                            </table>
                            : <span style={{marginTop: "15px"}}>No organizators</span>
                        }
                        <input
                            className="search"
                            value={search}
                            placeholder="Search for the coordinator"
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        {arraySF?.length
                            ? <table>
                                {arraySF?.map((user, index) => 
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{(user.firstName + " " + user.secondName).slice(0, 15)}</td>
                                        <td>
                                            <a
                                                className='btn'
                                                onClick={() => {
                                                    setItem({...item, organizators: [...item.organizators, user]})
                                                    setOrganizator(organizator.filter(item => item.email !== organizator[index].email))
                                                }}
                                            >add</a>
                                        </td>
                                    </tr>)}
                            </table>
                            : <span style={{marginTop: "10px"}}>No coordinators</span>
                        }
                    </div>
                </div>
                <a className="cert btn" onClick={() => uploadImage(image)}>Submit</a>
            </form>
        </div>
    );
}
