import axios from "axios";

const BASE_URL = "http://localhost:9092";


export const addParticipant = async (data) => {
    const response = await axios.post(`${BASE_URL}/addParticipant`, data);
    
    return response.data;
}

export const deleteParticipant = async (id) => {
    const response = await axios.get(`${BASE_URL}/deleteParticipant?id=${id}`);
    
    return response.data;
}

export const editParticipant = async (id, name) => {
    const response = await axios.post(`${BASE_URL}/editParticipant?id=${id}&name=${name}`);
    
    return response.data;
}

export const getParticipants = async () => {
    const response = await axios.get(`${BASE_URL}/getAllParticipants`);
    
    return response.data.data;
}

export const shuffleParticipants = async () => {
    const response = await axios.get(`${BASE_URL}/suffleParticipant`);
    
    return response.data.data;
}