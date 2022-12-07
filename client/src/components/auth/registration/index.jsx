import './registration.css';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultContext } from "../../../Context";
import showp from '../../imgs/show.png';
import hide from '../../imgs/hide.png';
import { checkEmail } from '../../../actions/user';

export const Registration = () => {
    
    const { password, setEmail, setPassword, email, isValidEmail } = useContext(DefaultContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [valid, setValid] = useState(false);
    const [message, setMessage] = useState("");
    const [pmessage, setPmessage] = useState("");
    const [check, setCheck] = useState();

    function doesContainNumber() {
        return /(?=.*[0-9])/.test(password);
    }

    function doesContainCharacter() {
        return /(?=.*[^\w\s])/.test(password);
    }

    function doesContainLowerLetter() {
        return /(?=.*[a-z])/.test(password);
    }

    function doesContainUpperLetter() {
        return /(?=.*[A-Z])/.test(password);
    }

    function checkLength() {
        return /[0-9a-zA-Z^\w\s].{8,}/.test(password);
    }

    function checkPassword() {
        return doesContainNumber(password)
            && doesContainCharacter(password)
            && doesContainLowerLetter(password)
            && doesContainUpperLetter(password)
            && checkLength(password);
    }

    const handleOnClick = async () => {
        await checkEmail(email).then(res => setCheck(res));
        if (check === false) {
            if (isValidEmail() && checkPassword()) {
                navigate('/fullform');
            }
        } else {
            setMessage("This email is already taken!")
        }
    };

    useEffect(() => {
        if (password) {
            setPassword("");
        }
    }, [])

    return (
        <div className="reg">
            <h1>Sign up</h1>
            <form action="post">
                <div>
                    <div className='field'>
                        <p>E-mail</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value.replace(/[^a-zA-Z0-9@._\s]/g, ""))}
                            onBlur={async () => {
                                await checkEmail(email).then(res => setCheck(res));
                                setMessage(email
                                ? isValidEmail()
                                    ? check
                                        ? `This email is already taken!`
                                        : ""
                                    : "Enter a valid email, please!"
                                : "Enter your email!")}}
                            placeholder='example@mail.com'
                            onKeyDown={(event) => {
                                if (/[а-яё]/i.test(event.key)) {
                                    setMessage("Latin letters only.")
                                    event.preventDefault()
                                } else if (event.key === " ") {
                                    event.preventDefault()
                                }
                            }}
                        />
                        <span className='warn'>{message}</span>
                    </div>
                    <div className='field'>
                        <p>Password</p>
                        <div className="password" style={{marginBottom: "5px"}}>
                            <input
                                type={show ? "text" : "password"}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder='New password'
                                onSelect={() => setValid(true)}
                                onBlur={() => setPmessage(password
                                    ? checkPassword() 
                                        ? ""
                                        : "Enter a valid password!"
                                    : "Enter your password!")}
                                onKeyDown={(event) => {
                                    if (/[а-яё]+/i.test(event.key)) {
                                        setPmessage("Latin letters only.")
                                        event.preventDefault()
                                    }
                                }}
                            />
                            <img onClick={() => setShow(!show)} src={show ? hide : showp}/>
                        </div>
                        <span className='warn'>{pmessage}</span>
                    </div>
                    {valid &&
                    <div className='req'>
                        <span style={{color: doesContainNumber() ? 'green' : "red"}}>1 number</span>
                        <span style={{color: doesContainUpperLetter() ? 'green' : "red"}}>1 big letter</span>
                        <span style={{color: doesContainLowerLetter() ? 'green' : "red"}}>1 small letter</span>
                        <span style={{color: doesContainCharacter() ? 'green' : "red"}}>1 special character (example: !@.,#$%^&*"')</span>
                        <span style={{color: checkLength() ? 'green' : "red"}}>Minimum 8 characters</span>
                    </div>}
                </div>
                <a
                    className='button'
                    onClick={() => handleOnClick()}
                >SIGN UP</a>
                <a onClick={() => navigate("/signin")} className="forgot dont">Already have an account? <u><b>Sign in</b></u></a>
            </form>
        </div>
    );
};