import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createPayment = async (fundsGoal) => {
    try {
        const response = await axios.post(`${API_URL}/create-payment`, { fundsGoal });
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};

export const getPaymentStatus = async (address) => {
    try {
        const response = await axios.get(`${API_URL}/payment-status?address=${address}`);
        return response.data;
    } catch (error) {
        console.error('Error getting payment status:', error);
        throw error;
    }
};