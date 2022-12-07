import "./verification.css";
import { useState } from "react";
import { useContext } from "react";
import { check } from "../../../actions/user";
import { DefaultContext } from "../../../Context";

export const Verificator = () => {

    const [data, setData] = useState();
    const [code, setCode] = useState();
    const [year, setYear] = useState();
    const [message, setMessage] = useState();
    const {width} = useContext(DefaultContext);

    const handleCheck = () => {
        if (code) {
            setMessage("");
            check(code).then(response => {
                setData(response.user);
                setYear(code.split('-')[1]);
            });
        } else {
            setMessage("Enter the code first!");
        }
    }

    return (
        <div className="reg block">
            <h1>Verify certificates</h1>
            <div className="data code" style={{justifyContent: "space-evenly"}}>
                <div className="inf" style={{gap: width > 400 ? "30px" : "20px", justifyContent: "center"}}>
                    <p>Code on your certificate</p>
                    <div className="field">
                        <input
                            type="text"
                            value={code}
                            placeholder="CRTF-2022-KZ-VOL-0001-NEW"
                            onChange={(event) => setCode(event.target.value)}
                            style={{width: width > 400 ? "400px" : "auto", textAlign: "left", margin: "0px"}}
                        />
                        <span className="warn">{message}</span>
                    </div>
                    <a className="cert btn" onClick={() => handleCheck()}>CHECK THE CODE</a>
                </div>
                <div className="user">
                    <h3>Recepient</h3>
                    <div className="data">
                        <div className="inf">
                            <div className="data">
                                <p>Name:</p>
                                <p>{data?.name}</p>
                            </div>
                            <div className="data">
                                <p>Year:</p>
                                <p>{data ? year : ""}</p>
                            </div>
                            <div className="data">
                                <p>Country:</p>
                                <p>{data?.country}</p>
                            </div>
                            <div className="data">
                                <p>Volunteering hours:</p>
                                <p>{data?.volunteeringHours}</p>
                            </div>
                            <div className="data">
                                <p>Type of certification:</p>
                                <p>{data?.type}</p>
                            </div>
                        </div>
                        {!data && <div className="inf">
                                <p className="text" style={{textAlign: "center", marginBottom: "0px"}}>There is no certificate<br/>with such code.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};