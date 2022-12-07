import axios from 'axios';

const link = `https://frozen-thicket-00434.herokuapp.com/api/add`;
const link1 = `http://localhost:1500/api/add`;

export const getReports = async () => {
    const response = await axios.post(`${link}/reports`);
    return response.data;
};

export const report = async (bags, type, eventID, addInfo, attended, distance) => {
    const response = await axios.post(`${link}/report`, {bags, type, eventID, addInfo, attended, distance});
    alert(response.data.message)
}

export const getEducation = async () => {
    const response = await axios.post(`${link}/education`);
    return response.data;
}

export const addUniversity = async (university) => {
    const response = await axios.post(`${link}/university`, {name: university});
    return response.data;
}

export const addEducation = async (name, city, school, college) => {
    const response = await axios.post(`${link}/addEdu`, {name, city, school, college});
    return response.data;
}