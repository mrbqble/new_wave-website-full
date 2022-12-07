import React from 'react';
import story from "../../../imgs/1.png";
import bluarr from "../../../imgs/bluearr.png";

export const Third = () => {
    return (
        <div className='third block'>
            <div>
                <h1 style={{
                    textAlign: 'left',
                    maxWidth: "25vw"
                }}>
                    <font>"</font>A person who has collected a bag of other people's garbage will never throw out his own.<font>"</font>
                </h1>
                <a
                    className='link'
                >
                    WATCH OUR STORY <img
                        src={bluarr}
                        alt="blue arrow"
                        className='arr'
                    />
                </a>
            </div>
            <div className='founder'>
                <img
                    src={story}
                    alt="founder"
                />
                <p>...ecology starts from our mind.</p>
                <p>OUR FOUNDER: ZINAENUR ISLAM</p>
            </div>
        </div>
    )
}
