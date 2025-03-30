import React, { useState } from 'react';
import { calculateSimpleInterest, calculateCompoundInterest, calculateFee } from '../utils/calculations';
import { createPayment, getPaymentStatus } from '../services/api';
import QRCode from 'qrcode.react';
import PaymentModal from './PaymentModal';
import { CSVLink } from "react-csv";

const Simulator = () => {
    const [capital, setCapital] = useState(0);
    const [months, setMonths] = useState(3);
    const [interestType, setInterestType] = useState('simple');
    const [results, setResults] = useState([]);
    const [paymentAddress, setPaymentAddress] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [paymentReceived, setPaymentReceived] = useState(false);
    const [csvData, setCsvData] = useState([]);
    const [csvFilename, setCsvFilename] = useState("simulator_results.csv");

    const rates = { 3: 1, 6: 2, 9: 3, 12: 4 };

    const handleSimulate = async () => {
        const rate = rates[months];
        const calculation = interestType === 'simple' ? calculateSimpleInterest : calculateCompoundInterest;
        const calculatedResults = calculation(capital, rate, months);
        const fee = calculateFee(capital);
        const feeAmount = fee * capital;
        const finalResults = calculatedResults.map(item => ({
            ...item,
            total: item.total - (item.month === months ? feeAmount : 0),
        }));

        setResults(finalResults);
        setCsvData(finalResults.map(item => ({
            Month: item.month,
            Profit: item.profit,
            Total: item.total
        })));
        setCsvFilename(`simulator_results_${capital}_${months}_${interestType}.csv`);
    };

    const handleDeposit = async () => {
        try {
            const payment = await createPayment(capital);
            setPaymentAddress(payment.data.address);
        } catch (error) {
            console.error('Error creating payment:', error);
        }
    };

    const handleCheckPayment = async () => {
        if (paymentAddress) {
            try {
                const status = await getPaymentStatus(paymentAddress);
                console.log("Payment Status:", status.data); 
                setPaymentStatus(status.data); 
                setModalOpen(true);
                setPaymentReceived(status.data?.amountCaptured > 0);
            } catch (error) {
                console.error('Error checking payment status:', error);
            }
        }
    };

    const handleReset = () => {
        setCapital(0);
        setMonths(3);
        setInterestType('simple');
        setResults([]);
        setPaymentAddress(null);
        setPaymentStatus(null);
        setModalOpen(false);
        setPaymentReceived(false);
        setCsvData([]);
    };

    return (
        <div className="simulator-container">
            <div>
                <label>Capital Semilla:</label>
                <input type="number" value={capital} onChange={(e) => setCapital(Number(e.target.value))} />
            </div>
            <div>
                <label>Meses:</label>
                <select value={months} onChange={(e) => setMonths(Number(e.target.value))}>
                    <option value={3}>3 meses</option>
                    <option value={6}>6 meses</option>
                    <option value={9}>9 meses</option>
                    <option value={12}>12 meses</option>
                </select>
            </div>
            <div>
                <label>Tipo de Interés:</label>
                <select value={interestType} onChange={(e) => setInterestType(e.target.value)}>
                    <option value="simple">Simple</option>
                    <option value="compound">Compuesto</option>
                </select>
            </div>
            <button onClick={handleSimulate}>Simular</button>
            {results.length > 0 && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Mes</th>
                                <th>Beneficio</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.month}</td>
                                    <td>{result.profit.toFixed(2)}</td>
                                    <td>{result.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <CSVLink data={csvData} filename={csvFilename}>Exportar CSV</CSVLink>
                </div>
            )}
            <button className='button2' onClick={handleDeposit}>Depositar Ahora</button>
            {paymentAddress && <QRCode value={paymentAddress} />}
            {paymentAddress && <button className='button3' onClick={handleCheckPayment}>Revisar Pago</button>}
            <PaymentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} paymentStatus={paymentStatus} paymentReceived={paymentReceived} />
            <button className='button4' onClick={handleReset}>RESET/NEW</button>
        </div>
    );
};

export default Simulator;