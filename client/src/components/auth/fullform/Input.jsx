import React from 'react';
import { useState } from 'react';

export const Input = ({type="text", title, placeholder, value, onChange, minLenght, maxLength, style, defaultMessage="Latin letters only"}) => {
    const [message, setMessage] = useState("");

    return (
        <div className='field'>
            <p>{title} <font className="warn">*</font></p>
            <input
                type={type}
                value={value}
                style={style}
                onChange={onChange}
                minLength={minLenght}
                maxLength={maxLength}
                placeholder={placeholder}
                onKeyDown={(event) => {
                    if (/[а-яё]/i.test(event.key)) {
                        setMessage(defaultMessage)
                        event.preventDefault();
                    }
                }}
                onBlur={() => setMessage(value ? "" : "Mandatory field!")}
            />
            <span className="warn">{message}</span>
        </div>
    )
}
