import "./event.css";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { EffectCreative } from "swiper";
import { SwiperButtonNext } from './next';
import { SwiperButtonPrev } from './prev';
import bluearr from "../../imgs/bluearr.png";
import { DefaultContext } from "../../../Context";
import { Swiper, SwiperSlide } from 'swiper/react';
import { getEvents, attend, leave } from "../../../actions/event";

export const Event = () => {

    let date;
    const [isAttended, setIsAttended] = useState(false);
    const {user, events, current, setCurrent, months, setAlert, setTitle, setText, setButton} = useContext(DefaultContext);

    const handleAttend = () => {
        if (user.email && !isAttended) {
            attend(user.email, events[current]._id).then(() => {
                setIsAttended(true);
            }
            );
        } else {
            setTitle("Oops!");
            setText("You should sign in to your account to attend our events. Please, try again after sign in.");
            setButton("OK");
            setAlert(true);
        }
    }

    const handleLeave = () => {
        leave(user.email, events[current]._id).then(() => {
            setIsAttended(false);
        });
    }

    useEffect(() => {
        setIsAttended(events ? events[current].attended.find(item => item.email === user.email) ? true : false : false);
    }, [current, events])

    const handleSlideChange = (slide) => {
        setCurrent(slide.activeIndex ? (slide.activeIndex - 1) % events.length : events.length - 1);
    }

    return (
        <div className="reg">
            <Swiper
                initialSlide={current}
                slidesPerView={1}
                loop
                effect={"creative"}
                creativeEffect={{
                prev: {
                    shadow: true,
                    translate: [0, 0, -400],
                },
                next: {
                    translate: ["100%", 0, 0],
                },
                }}
                modules={[EffectCreative]}
                onSlideChange={handleSlideChange}
                style={{
                    zIndex: "1"
                }}
            >
                {events?.length
                    ? events.map((item, index) => 
                    <>{date = item.date.split('-')}
                    <SwiperSlide style={{backgroundColor: "white"}} key={index}>
                        <div className="container event block" style={{justifyContent: "space-between", alignItems: "normal", marginLeft: "0px", padding: "50px 0px"}}>
                            <div style={{height: "90vh"}} className="inf">
                                <SwiperButtonPrev index={index ? (index - 1) % events.length : events.length - 1}>
                                    <img
                                        src={bluearr}
                                        alt="blue arr"
                                        className='arr'
                                        style={{
                                            transform: "rotate(180deg)"
                                    }}/>
                                </SwiperButtonPrev>
                            </div>
                            <div className="eventinfo" style={{gap: "40px"}}>
                                <h1>
                                    <font>{item.title.split(' ')[0]}</font><br/>
                                    {item.title.slice(item.title.split(' ')[0].length)}
                                </h1>
                                <div>
                                    <p className='text'>{item.text.split('\n')[0]}</p>
                                    <p>{item.text.split('\n')[1]}</p>
                                </div>
                                <div>
                                    <p className="text">City: <font>{item.city}</font></p>
                                    <p className="text">Date: <font>{months[parseInt(date[1]) - 1] + " " + date[2] + ", " + date[0]}</font></p>
                                    <p className="text" style={{marginBottom: "0px"}}>Volunteering hours: <font>{item.duration.split(".")[0]}</font></p>
                                </div>
                                <div>
                                    <p className="text">Volunteers needed: <font>{item.places}</font></p>
                                    <p className="text" style={{marginBottom: "0px"}}>Available places: <font>{item.places - item.attended.length}</font></p>
                                </div>
                                {isAttended
                                    ? <a className='join btn' onClick={() => handleLeave()}>LEAVE EVENT</a>
                                    : <a className='cert btn' onClick={() => handleAttend()}>ATTEND EVENT</a>
                                }
                            </div>
                            <div className="eventinfo">
                                <img src={item.image} alt="event" style={{height: '770px', width: "770px"}}/>
                            </div>
                            <div style={{height: "90vh"}} className="inf">
                                <SwiperButtonNext index={(index + 1) % events.length}>
                                    <img src={bluearr} className="arr" alt="blue arr"/>
                                </SwiperButtonNext>
                            </div>
                        </div>
                    </SwiperSlide></>
                    )
                    : <h2>There are no upcoming events at the moment.</h2>
                }
            </Swiper>
        </div>
    );
};