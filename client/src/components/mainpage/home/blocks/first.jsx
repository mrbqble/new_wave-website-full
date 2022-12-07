import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useContext } from "react";
import { DefaultContext } from "../../../../Context";

export const First = () => {
    const navigate = useNavigate();
    const {setPassword, setEdit} = useContext(DefaultContext);

    return (
        <div className='first'>
            <div className='head'>
                <p className='header'>
                    THINK ECO
                    <br/>
                    LOGICALLY
                </p>
                <a
                    className='button'
                    onClick={() => {
                        navigate('/reg');
                        setEdit(false);
                        setPassword("")
                    }}
                >JOIN OUR COMMUNITY</a>
            </div>
            <div className='subtext'>
                <p>Take a small step to save our Planet with us.</p>
            </div>
        </div>
    )
}
