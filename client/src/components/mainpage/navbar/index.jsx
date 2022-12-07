import './navbar.css';
import { useContext } from "react";
import { DefaultContext } from "../../../Context";
import { Link, useNavigate } from 'react-router-dom';
import menu from "../../imgs/menu.png"
import { useState } from 'react';
import exit from "../../imgs/exit.png";

export const Navbar = () => {
    
    const navigate = useNavigate();
    const {isAuth, handleSetIsAuth, setUser, setToken, width, reboot} = useContext(DefaultContext);

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const handleLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken('');
        handleSetIsAuth();
        setUser([]);
        navigate('/');
        reboot();
    }

    return (
        (width > 720)
            ? <div className="navbar">
            <a
                className="logo"
                onClick={() => navigate("/")}
            >NEW WAVE</a>
            <div className="links">
                <a onClick={() => navigate("/")} href="#about">ABOUT US</a>
                <a onClick={() => navigate("/")} href="#takeaction">TAKE ACTION!</a>
                <a onClick={() => navigate("/")} href="#community">COMMUNITY</a>
                <a
                    onClick={() => navigate("/")}
                    style={{
                        color: "#0013BC",
                }}>OUR PROJECTS</a>
            </div>
            <div className="links">
                {isAuth
                    ? <><a onClick={() => navigate("/profile")}>PROFILE</a>
                    <a onClick={() => handleLogOut()}>LOG OUT</a></>
                    : <><a onClick={() => {
                        navigate("/signin")
                        reboot()
                    }}>SIGN IN</a>
                    <a onClick={() => {
                        navigate("/reg")
                        reboot()
                    }}>SIGN UP</a></>
                }
                <a
                    className="button"
                    onClick={() => navigate("/")}
                >DONATE</a>
            </div>
        </div>
        : <><div className='navbar'>
            <a
                className="logo"
                onClick={() => navigate("/")}
                style={{
                    padding: "15px"
                }}
            >NEW WAVE</a>
            <Link to="#" className='menu-bars'>
                <img
                    src={menu}
                    style={{
                        height: "30px",
                        padding: "15px",
                    }}
                    onClick={() => showSidebar()}
                    />
            </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    {isAuth
                        ? <>
                            <li>
                                <a onClick={() => {
                                    navigate("/signin")
                                    showSidebar()
                                    }}>SIGN IN</a>
                            </li>
                            <li>
                                <a onClick={() => {
                                    navigate("/reg")
                                    showSidebar()
                                    }}>SIGN UP</a>
                            </li>
                        </>
                        : <>
                            <li>
                                <a onClick={() => {
                                    navigate("/profile")
                                    showSidebar()
                                    }}>PROFILE</a>
                            </li>
                            <li>
                                <a onClick={() => {
                                    handleLogOut()
                                    showSidebar()
                                    }}>LOG OUT</a>
                            </li>
                        </>
                    }
                    <li>
                        <a onClick={() => {
                            navigate("/")
                            showSidebar()
                        }} href="#about">ABOUT US</a>
                    </li>
                    <li>
                        <a onClick={() => {
                            navigate("/")
                            showSidebar()
                            }} href="#takeaction">TAKE ACTION!</a>
                    </li>
                    <li>
                        <a onClick={() => {
                            navigate("/")
                            showSidebar()
                            }} href="#community">COMMUNITY</a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                navigate("/")
                                showSidebar()
                            }}
                            style={{
                                color: "#0013BC"
                        }}>OUR PROJECTS</a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                navigate("/")
                                showSidebar()
                            }}
                        >DONATE</a>
                    </li>
                </ul>
                <Link to="#" className='menu-bars'>
                    <img
                        src={exit}
                        style={{
                            height: "30px",
                            padding: "15px"
                        }}
                        onClick={() => showSidebar()}
                    />
                </Link>
            </nav>
        </>
        );
};