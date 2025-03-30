import React from 'react';

const PaymentModal = ({ isOpen, onClose, paymentStatus, paymentReceived }) => {
    if (!isOpen) return null;

    return (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', border: '1px solid black' }}>
            <h2>Payment Status</h2>
            {paymentReceived && <p>Payment Received!</p>}
            {paymentStatus && (
                <div>
                    <p>Address: {paymentStatus.address || 'N/A'}</p>
                    <p>Amount Captured: {paymentStatus.amountCaptured || 'N/A'}</p>
                    <p>Status: {paymentStatus.status || 'N/A'}</p>
                    <p>Fund Status: {paymentStatus.fundStatus || 'N/A'}</p>
                    <p>Funds Goal: {paymentStatus.fundsGoal || 'N/A'}</p>
                </div>
            )}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default PaymentModal;