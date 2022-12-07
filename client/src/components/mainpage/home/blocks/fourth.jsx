import React from 'react';
import { useContext } from "react";
import beach from "../../../imgs/2.png";
import {useNavigate} from 'react-router-dom';
import plasticInSea from "../../../imgs/plastic_in_sea.png";
import plasticbottles from "../../../imgs/plastic_bottles.png";
import { DefaultContext } from "../../../../Context";

export const Fourth = () => {
    const navigate = useNavigate();
    const {width} = useContext(DefaultContext);

    const cards = [
        {
            img: plasticInSea,
            title: 'It takes from 100 to 200 years for Plastic to decompose.',
            text: 'Once the plastic is in the ground it breaks down into small particles and emits chemicals into the environment like Bisphenol A. These chemicals are spread by groundwater or other  water sources nearby, harming those who drink it.'
        },
        {
            img: plasticbottles,
            title: 'In the United States, Bisphenol A is found in 95% of adults in urine. ',
            text: 'Microplastic from the water spreads in our body by the blood. Plasticizers are associated with loss of fertility, disorders of puberty, reproduction and other health problems.'
        },
        {
            img: beach,
            button: 'DONATE NOW',
            title: 'Every $1 donated to our community would clean up 2400 liters of plastic trash'
        },
    ];

    return (
        <div className='fourth block' id="takeaction">
            <h1>Why ecology <font>matters?</font></h1>
            <h2>
                You probably are concerned about your health.
                {width > 400 ? <br/> : <></> }
                We are concerned about it too.
            </h2>
            <h3 >According to the World Wildlife Fund (WWF), from 5 to 12 million tons of plastic ends up in the oceans annually.</h3>
            <div className='facts'>
                {cards.map((item, index) => 
                    <div
                        key={index}
                        className='card'
                    >
                        {width > 400 ? 
                            index % 2 === 0
                            ? <>
                                <img
                                    alt="card"
                                    src={item.img}
                                    style={{
                                        marginRight: width > 400 ? '40px' : ""
                                }}/>
                                <div>
                                    <h3>{item.title}</h3>
                                    {item.button
                                        ? <><a
                                                onClick={() => navigate('/')}
                                                className='button'
                                            >{item.button}</a></>
                                        : <><p>{item.text}</p></>}
                                </div>
                            </>
                            : <>
                                <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                                <img
                                    alt="card"
                                    src={item.img}
                                    style={{
                                        marginLeft: width > 400 ? '40px' : ""
                                }}/>
                            </>
                        : <>
                            <img
                                alt="card"
                                src={item.img}
                                style={{
                                    marginRight: width > 400 ? '40px' : ""
                            }}/>
                            <div>
                                <h3>{item.title}</h3>
                                {item.button
                                    ? <><a
                                            onClick={() => navigate('/')}
                                            className='button'
                                        >{item.button}</a></>
                                    : <><p>{item.text}</p></>}
                            </div>
                        </>
                        }    
                    </div>
                )}
            </div>
        </div>
    )
}
