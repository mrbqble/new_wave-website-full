import './fullform.css';
import { Input } from './Input';
import { useState } from 'react';
import { Select } from './Select';
import { useEffect } from 'react';
import { useContext } from "react";
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
import { useNavigate } from 'react-router-dom';
import { DefaultContext } from "../../../Context";
import { editProfile } from '../../../actions/user';
import countryList from 'react-select-country-list';
import { profile, registration } from '../../../actions/user';
import { addEducation, addUniversity, getEducation } from '../../../actions/add';

const courses = [1, 2, 3, 4];
const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const degrees = ["Associate", "Bachelour's", "Magister's", "Doctoral"];
const affiliations = ["School", "Work", "College", "University", "Unemployed"];

export const Fullform = () => {
    
    const navigate = useNavigate();
    const { edu, edit, user, email, width, password, setEdu, setEdit, setUser, setText, setEmail, setTitle, setAlert, setButton, setPassword } = useContext(DefaultContext);
    const [cities, setCities] = useState()
    const [schools, setSchools] = useState()
    const [colleges, setColleges] = useState()
    const [countries, setCountries] = useState()
    const [universities, setUniversities] = useState()
    const [item, setItem] = useState(edit ? user : {
        firstName: "",
        secondName: "",
        gender: "Male",
        city: "",
        email: email,
        grade: "1",
        degree: "Associate",
        school: "",
        country: "Kazakhstan",
        password: password,
        telegram: "@",
        instagram: "@",
        dateOfBirth: "2022-02-22",
        affiliation: "School",
        phoneNumber: "",
        volunteeringHours: 0
    })

    function capittalize(s) {
        return s.toLowerCase().replace(
            /(?<!\p{Lowercase})\p{Lowercase}/gu,
            ch => ch.toUpperCase()
        );
    }

    function whiteSpace(s) {
        return s.replace(" ", '');
    }

    useEffect(() => {
        setCountries(edu?.countries)
        setUniversities(edu?.universities)
        setCities(edu?.countries?.find(country => country.name === item.country)?.cities)
        setColleges(edu?.countries?.find(country => country.name === item.country)?.colleges)
        setSchools(edu?.countries?.find(country => country.name === item.country)?.cities?.find(city => city.name === item.city)?.schools)
        setItem({...item, school: cities?.filter(city => city.name === item.city).length
            ? item.affiliation === "School"
                ? edit && cities?.find(city => city.name === item.city)?.schools?.find(item => item === user?.school) ? user?.school : cities?.find(city => city.name === item.city)?.schools[0]
                : item.affiliation === "College"
                    ? edit && countries?.find(country => country.name === item.country)?.colleges?.find(item => item === user?.school) ? user?.school : countries?.find(country => country.name === item.country)?.colleges[0]
                    : edit && universities?.find(item => item.name === user?.school) ? user?.school : universities
                        ? universities[0].name
                        : ""
            : ""})
    }, [edu, item.country, item.city, item.affiliation])

    useEffect(() => {
        setItem({...item, city: edit && cities?.find(item => item.name === user?.city) ? user?.city : cities ? cities[0].name : ""})
    }, [cities])

    useEffect(() => {
        if(edit) {
            setEmail(user.email)
        }
    }, [])

    const handleOnClick = () => {
        setItem({...item, phoneNumber: item.phoneNumber[0] === "+" ? item.phoneNumber : "+" + item.phoneNumber})
        if (item.firstName && item.secondName && item.phoneNumber.length >= 11 && item.telegram.length !== 1 && item.instagram.length !== 1 && item.school && item.city) {
            if(edit) {
                editProfile(item).then((res) => {
                    profile(email).then(response => setUser(response));
                    setEdit(false);
                    navigate('/profile')
                }).catch((error) => console.log(error))
            } else {
                if (!universities?.filter(university => university.name === item.school).length && item.affiliation === "University") {
                    addUniversity(item.school).then((res) => getEducation().then((response) => setEdu(response)))
                }
                addEducation(
                    item.country,
                    item.city,
                    item.affiliation === "School" ? item.school : "",
                    item.affiliation === "College" ? item.school : ""
                ).then((res) => getEducation().then((response) => setEdu(response)))
                registration(item).then((res) => {
                    setEmail('');
                    setPassword('');
                    setButton("Hurrah!");
                    setTitle("Congratulations!")
                    setText("Now you are a volunteer of New Wave Club! Go check your inbox! You will get an email with a link to our chat where we communicate and work.")
                    setAlert(true);
                    navigate('/signin');
                });
            }
        } else {
            setButton("OK");
            setTitle("Oops!")
            setText("Fill all the fields correctly!")
            setAlert(true);
        }
    };

    return (
        <div className="full reg block">
            <h1>Fill the form below</h1>
            <p style={{
                textAlign: 'center',
                marginBottom: '20px'
            }}>
                Please, make sure that the data is accurate.
                {width > 400 && <br/>}
                It is important for the issuance of your certificate.
            </p>
            <form action="post">
                <div className='form'>
                    <Input
                        title="First name"
                        placeholder="Enter your first name"
                        value={item.firstName}
                        onChange={(event) => setItem({...item, firstName: whiteSpace(capittalize(event.target.value.replace(/[^a-zA-Z\s]/g, "")))})}
                    />
                    <Input
                        title="Second name"
                        placeholder="Enter your second name"
                        value={item.secondName}
                        onChange={(event) => setItem({...item, secondName: whiteSpace(capittalize(event.target.value.replace(/[^a-zA-Z\s]/g, "")))})}
                    />
                    <Input
                        title="Date of birth"
                        type="date"
                        placeholder="DD/MM/YYYY"
                        style={{padding: "14px 20px"}}
                        defaultMessage=""
                        value={item.dateOfBirth}
                        onChange={(event) => setItem({...item, dateOfBirth: event.target.value})}
                    />
                    <div className="field">
                        <p>Phone number <font className="warn">*</font></p>
                        <PhoneInput
                            style={{
                                marginTop: "15px",
                                marginBottom: "5px"
                            }}
                            country={'kz'}
                            onChange={phone => setItem({...item, phoneNumber: phone})}
                            value={item.phoneNumber}
                            className="containerPhone"
                            inputStyle={{
                                height: "55px",
                                fontSize: "20px",
                                width: width > 400 ? "444px" : "91vw",
                                borderRadius: "0px"
                            }}
                        />
                    </div>
                    <Select
                        title="Country"
                        value={item.country}
                        onChange={(event) => setItem({...item, country: event.target.value})}
                        options={countryList().getData().map((item) => {
                            return item.label;
                        })}
                    />
                    <Select
                        title="City"
                        value={item.city}
                        onChange={(event) => setItem({...item, city: event.target.value.replace(/[^a-zA-Z\s]/g, "")})}
                        options={cities?.map((item) => {return item.name})}
                        notListed={true}
                    />
                    <Select
                        title="Gender"
                        value={item.gender}
                        onChange={(event) => setItem({...item, gender: event.target.value})}
                        options={["Male", "Female"]}
                    />
                    <Select
                        title="Affiliation"
                        value={item.affiliation}
                        onChange={(event) => setItem({...item, affiliation: event.target.value})}
                        options={affiliations}
                    />
                    {item.affiliation !== 'Work' && item.affiliation !== "Unemployed" && <>
                        <Select
                            title={item.affiliation}
                            value={item.school}
                            onChange={(event) => setItem({...item, school: event.target.value})}
                            options={item.affiliation === "School" ? schools : item.affiliation === "College" ? colleges : universities?.map((item) => {return item.name})}
                            notListed={true}
                        />
                        <Select
                            title={item.affiliation === "School" ? "Grade" : "Course"}
                            value={item.grade}
                            options={item.affiliation === "School" ? grades : courses}
                            onChange={(event) => setItem({...item, grade: event.target.value})}
                        />
                    </>}
                    {item.affiliation === "University" && 
                        <Select
                            title="Degree"
                            value={item.degree}
                            options={degrees}
                            onChange={(event) => setItem({...item, degree: event.target.value})}
                        />}
                    <Input
                        title="Instagram account"
                        value={item.instagram}
                        minLength={5}
                        maxLength={30}
                        onChange={(event) => setItem({...item, instagram: "@" + whiteSpace(event.target.value.replace(/[^a-zA-Z0-9._\s]/g, ""))})}
                    />
                    <Input
                        title="Telegram username"
                        value={item.telegram}
                        maxLength={32}
                        onChange={(event) => setItem({...item, telegram: "@" + whiteSpace(event.target.value.replace(/[^a-zA-Z0-9_\s]/g, ""))})}
                    />
                    {edit && 
                        <Input
                            title="E-mail"
                            value={email}
                            placeholder="Enter your email"
                            onChange={(event) => setEmail(event.target.value)}
                        />}
                </div>
                <a
                    className='button'
                    onClick={() => handleOnClick()}
                >SAVE</a>
            </form>
        </div>
    );
};