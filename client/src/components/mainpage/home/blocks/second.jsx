import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";

export const Second = () => {
    const stats = [
        {
            number: '1,000',
            subtext: <span>Volunteers against<br/>environmental issues</span>,
            text: 'Together we clean forests, mountains, ravines, rivers, lakes, reservoirs, canyons and many other nature landmarks  to save the genuine beauty of the Earth.'
        },
        {
            number: '10,000',
            subtext: <span>Planted trees, that absorbe<br/>about 120 kg of CO2.</span>,
            text: 'Together we plant trees to restore the lungs of our Planet. We save forests to let them save the biodiversity, control the water level and climate, protect us from drought and winds.'
        },
        {
            number: '100,000+',
            subtext: <span>Liters of trash was collected<br/>by our volunteers</span>,
            text: 'Each volunteer made a significant contribution for the sustainable future - they have showed how the small steps can solve a global problem.'
        }
    ];

    const titles = ["planet.", "nature.", "future."];

    return (
        <div className='second block' id="about">
            <div style={{display: "flex", gap: "5px", alignItems: "center", justifyContent: "center"}}>
                <h1 style={{marginBottom: "0px"}}>We save the</h1>
                <Swiper
                    initialSlide={1}
                    slidesPerView={3}
                    centeredSlides={true}
                    loop
                    direction={"vertical"}
                    style={{
                        margin: "0px",
                        height: "16vh",
                        zIndex: "-1"
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                >
                    {titles.map((item, index) => 
                        <SwiperSlide key={index}>
                            {({ isActive }) => (
                            <h1 style={{marginBottom: "0px", lineHeight: "45px"}}><font style={{color: isActive ? "#0013BC" : "#D0D5FF"}}>{item}</font></h1>)}
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
                <h1 style={{marginTop: "-50px",}}>Together.</h1>
            <h2>How do we tackle with environmental issues?</h2>
            <div className='stats'>
                {stats.map((item, index) =>
                    <div
                        key={index}
                        className="statblock"
                        style={{
                            justifyContent: index % 2 === 0
                                ? 'flex-end'
                                : 'flex-start'
                        }}>
                        <p className='parag' style = {{
                            marginBottom: '20px'
                        }}>{item.text}</p>
                        <p className='number'>{item.number}</p>
                        <p
                            className='subparag'
                            style={{
                                fontWeight: '600'
                            }}>{item.subtext}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
