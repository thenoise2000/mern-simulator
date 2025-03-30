import { createPayment, getPaymentStatus } from './api';
import axios from 'axios';

jest.mock('axios');

describe('api', () => {
    it('should create a payment successfully', async () => {
        const mockResponse = { data: { address: 'testAddress' } };
        axios.post.mockResolvedValue(mockResponse);

        const result = await createPayment(100);
        expect(result).toEqual(mockResponse.data);
        expect(axios.post).toHaveBeenCalledWith('http://localhost:5000/api/create-payment', { fundsGoal: 100 });
    });

    it('should handle payment creation error', async () => {
        const mockError = new Error('Payment creation failed');
        axios.post.mockRejectedValue(mockError);

        await expect(createPayment(100)).rejects.toThrow('Payment creation failed');
    });

    it('should get payment status successfully', async () => {
        const mockResponse = { data: [{ status: 'completed' }] };
        axios.get.mockResolvedValue(mockResponse);

        const result = await getPaymentStatus('testAddress');
        expect(result).toEqual(mockResponse.data);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/payment-status?address=testAddress');
    });

    it('should handle payment status error', async () => {
        const mockError = new Error('Payment status check failed');
        axios.get.mockRejectedValue(mockError);

        await expect(getPaymentStatus('testAddress')).rejects.toThrow('Payment status check failed');
    });
});