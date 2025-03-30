import React from 'react';
import './App.css'; 
import Simulator from './components/Simulator';
function App() {
    return (
        <div className="App">
            <div className="banner">Bienvenido a la Simulación Financiera</div>
            <Simulator />
        </div>
    );
}
export default App;