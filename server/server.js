const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = 'o0z8y85rjdx28iqef32f4mrl6e56b71742437588342';
const CRYPTO_TOKEN = '0xe9e7cea3dedca5984780bafc599bd69add087d56'; 

app.post('/api/create-payment', async (req, res) => {
    try {
        const { fundsGoal } = req.body;
        const response = await axios.post(
            'https://my.disruptivepayments.io/api/payments/single',
            {
                network: 'BSC',
                fundsGoal: fundsGoal,
                smartContractAddress: CRYPTO_TOKEN,
            },
            {
                headers: {
                    'client-api-key': API_KEY,
                    'content-type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Failed to create payment' });
    }
});

app.get('/api/payment-status', async (req, res) => {
    try {
        const { address } = req.query;
        const response = await axios.get(
            `https://my.disruptivepayments.io/api/payments/status?network=BSC&address=${address}`,
            {
                headers: {
                    'client-api-key': API_KEY,
                    'content-type': 'application/json',
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('Error checking payment status:', error);
        res.status(500).json({ error: 'Failed to check payment status' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});