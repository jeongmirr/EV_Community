import React from 'react';
import { Button } from 'antd';
import './css/TwoButtons.css';

const Subsidy = () => {
    const handleButtonClick = (e) => {
        console.log('Button clicked:', e.target.innerText);
    };

    return (
        <div className="button-container">
            <Button type="default" onClick={handleButtonClick} className="centered-button">
                시도별 보조금
            </Button>
            <Button type="default" onClick={handleButtonClick} className="centered-button">
                차종별 보조금
            </Button>
        </div>
    );
};

export default Subsidy;
