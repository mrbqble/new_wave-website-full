import React from 'react';

export const Select = ({title, value, options, onChange, notListed}) => {
    return (
        <div>
            <p>{title} <font className="warn">*</font></p>
            <div>
                <select
                    onChange={onChange}
                    value={value}
                >
                    {options?.map((item, index) => 
                        <option
                            key={index}
                            value={item}
                        >{item.length > 40 ? item.toString().slice(0, 40) + "..." : item}</option>
                    )}
                    {notListed && <option value="">Not listed</option>}
                </select>
                {notListed && !options?.find(item => item === value) &&
                    <input
                        placeholder={`Enter your ${title.toLowerCase()}`}
                        className='notListed'
                        autoFocus
                        onChange={onChange}
                        value={value}
                    />}
            </div>
        </div>
    )
}
