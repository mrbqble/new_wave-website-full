import './profile.css';
import { useContext } from "react";
import profile from "../../imgs/profile.png";
import { getCertificate } from '../../../actions/user';
import { useNavigate } from 'react-router-dom';
import { DefaultContext } from "../../../Context";
import { profilePhoto } from '../../../actions/user';
import { saveAs } from 'file-saver';
import { storage } from "./../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export const Profile = () => {

    const navigate = useNavigate();
    const year = new Date().getFullYear();
    const { user, setUser, setEdit, setAlert, setText, setTitle, setButton} = useContext(DefaultContext);

    if (!user) {
        setUser(localStorage.getItem('user'));
    }

    const handleCertificate = () => {
        if (user.volunteeringHours) {
            getCertificate(
                user.firstName,
                user.secondName,
                user.city,
                user.code,
                year,
                user.email,
                user.country,
                user.volunteeringHours
            ).then((response) => {
                const file = `data:application/pdf;base64,${response.doc}`
                saveAs(file, `${response.code}.pdf`)
            });
        } else {
            setTitle("Oops!");
            setText("You don't have enough volunteering hours to get a certificate. Earn more on our events!");
            setButton("OK");
            setAlert(true);
        }
    };

    const uploadImage = async (file) => {
        if (file === null) return;
        const imageRef = ref(storage, `users/${file.name + v4()}`);
        await uploadBytes(imageRef, file).then(async (res) => {
            if (user.photo) {
                const pictureRef = storage.refFromURL(user.photo);
                pictureRef.delete();
            }
            await getDownloadURL(res.ref).then(async (url) => {
                setUser({...user, photo: url});
                profilePhoto(user.email, url);
            });
        })
    }

    return (
        <div className="reg block">
            <h1>Profile</h1>
            <div className='inf one'>
                <div className='inf'>
                    <div className="data">
                        <span><font>Full name:</font></span>
                        <span>{user?.firstName + ' ' + user?.secondName}</span>
                    </div>
                    <div className="data">
                        <span><font>Date of birth:</font></span>
                        <span>{user?.dateOfBirth}</span>
                    </div>
                    <div className="data">
                        <span><font>Gender:</font></span>
                        <span>{user?.gender}</span>
                    </div>
                    <div className="data">
                        <span><font>Status:</font></span>
                        <span>{user?.type}</span>
                    </div>
                    <div className="data">
                        <span><font>Volounteering hours:</font></span>
                        <span>{user?.volunteeringHours}</span>
                    </div>
                    <div className="data">
                        <span><font>Country:</font></span>
                        <span>{user?.country}</span>
                    </div>
                    <div className="data">
                        <span><font>City:</font></span>
                        <span>{user?.city}</span>
                    </div>
                    <div className="data">
                        <span><font>Affiliation:</font></span>
                        <span>{user?.affiliation}</span>
                    </div>
                    {user.affiliation !== 'Work' && user.affiliation !== "Unemployed" && <>
                        <div className="data">
                            <span><font>{user?.affiliation}:</font></span>
                            <span>{user?.school}</span>
                        </div>
                        <div className="data">
                            <span><font>{user?.affiliation === "School" ? "Grade" : "Course"}:</font></span>
                            <span>{user?.grade}</span>
                        </div>
                    </>}
                    {user.affiliation === "University" && 
                        <div className="data">
                            <span><font>Degree:</font></span>
                            <span>{user?.degree}</span>
                        </div>}
                    <div className="data">
                        <span><font>E-mail:</font></span>
                        <span>{user?.email}</span>
                    </div>
                    <div className="data">
                        <span><font>Phone number:</font></span>
                        <span>{user?.phoneNumber}</span>
                    </div>
                    <div className="data">
                        <span><font>Instagram account:</font></span>
                        <span>{user?.instagram}</span>
                    </div>
                    <div className="data">
                        <span><font>Telegram username:</font></span>
                        <span>{user?.telegram}</span>
                    </div>
                </div>
                <div
                    className='data two'
                    style={{
                        gap: "10px",
                    }}>
                    <div className='data'>
                        <div className='frame'>
                            <img src={user?.photo ? user?.photo : profile} alt="User photo"/>
                        </div>
                        <input
                            type="file"
                            className='photo'
                            onChange={(event) => uploadImage(event.target.files[0])}
                        />
                    </div>
                    <a
                        className='cert btn'
                        onClick={() => handleCertificate()}
                    >GET MY CERTIFICATE</a>
                    <a
                        className='join btn'
                        onClick={() => navigate("/")}
                    >JOIN THE TELEGRAM GROUP</a>
                    <a
                        className='btn'
                        onClick={() => {
                            navigate("/fullform")
                            setEdit(true);
                        }}
                    >EDIT YOUR PROFILE</a>
                    {user.type === "Coordinator" ? <>
                        <a
                            className='btn'
                            onClick={() => navigate("/report")}
                        >REPORT THE EVENT</a>
                        <a
                            className='btn'
                            onClick={() => navigate("/createEvent")}
                        >ADD AN EVENT</a></>
                        : <></>
                    }
                </div>
            </div>
        </div>
    );
};