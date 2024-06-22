import axios from 'axios';

const apiUrl = import.meta.env.BASEURL1;


const headers = (token) => ({
    Authorization: `JWT ${token}`
});

export const fetchProgram = (programData, token) => {
    return axios.get(`/api/siteSettings/secondPage/ouronlineprograms/getRecord/`, programData, {
        headers: headers(token),
    });
};

export const addProgram = (proData, token) => {
    return axios.post(`${apiUrl}/programs/`, proData, {
        headers: headers(token),
    });
};

export const updateprogram = (programId, token) => {
    return axios.put(`${apiUrl}/programs/${programId}`, programId, {
        headers: headers(token),
    });
}

export const deleteProgram = (programId, token) => {
    return axios.delete(`${apiUrl}/programs/${programId}`, {
        headers: headers(token),
    });
};
