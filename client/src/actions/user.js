import axios from 'axios';

const link = `https://frozen-thicket-00434.herokuapp.com/api/user`;
const link1 = `http://localhost:1500/api/user`;

export const profile = async (email, token) => {
    const response = await axios.post(`${link}/profile`, {email, token});
    localStorage.setItem(`user`, response.data);
    return response.data;
};

export const login = async (email, password, handleSetIsAuth) => {
    const response = await axios.post(`${link}/login`, {email, password});
    if (!response.data.message) {
        handleSetIsAuth();
        localStorage.setItem(`token`, response.data);
    }
    return response;
};

export const registration = async (item) => {
    await axios.post(`${link}/registration`, {item});
};

export const editProfile = async (item) => {
    await axios.post(`${link}/edit`, {item});
};

export const profilePhoto = async (email, file) => {
    await axios.post(`${link}/profilePhoto`, {email, file});
}

export const getCertificate = async (firstName, secondName, city, code, year, email, country, volunteeringHours) => {
    const response = await axios.post(`${link}/certificate`, {firstName, secondName, city, code, year, email, country, volunteeringHours});
    return response.data;
}

export const getUsers = async () => {
    const response = await axios.post(`${link}/users`);
    return response.data;
};

export const getCoordinators = async () => {
    const response = await axios.post(`${link}/coordinators`);
    return response.data;
};

export const checkEmail = async (email) => {
    const response = await axios.post(`${link}/checkEmail`, {email});
    return response.data;
};

export const certCode = async (code, email) => {
    await axios.put(`${link}/code`, {code, email});
};

export const status = async (users) => {
    const response = await axios.put(`${link}/status`, {users});
    return response.data.message;
};

export const check = async (code) => {
    const response = await axios.post(`${link}/check`, {code});
    return response.data;
};