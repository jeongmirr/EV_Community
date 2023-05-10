import React, { useState } from 'react';
import { Button, Table, Select } from 'antd';
import './css/TwoButtons.css';
import board1Data from '../data/subsidy_city.json';
import board2Data from '../data/subsidy_car.json';
const { Option } = Select;

const Subsidy = () => {
    const [visibleBoard, setVisibleBoard] = useState('');
    const [selectedType, setSelectedType] = useState('');

    // 차 종류 (type)값 가져오기
    const getUniqueTypes = () => {
        const types = board2Data.map((item) => item.type);
        return [...new Set(types)];
    };

    const uniqueTypes = getUniqueTypes();

    const handleButtonClick = (e) => {
        console.log('Button clicked:', e.target.innerText);
        setVisibleBoard(e.target.id === 'board1-button' ? 'board1' : 'board2');
    };

    const columnsBoard1 = [
        { title: '시도', dataIndex: 'city', key: 'city', align: 'center' },
        { title: '전기자동차', dataIndex: 'elec', key: 'elec', align: 'center' },
        { title: '수소자동차', dataIndex: 'hydro', key: 'hydro', align: 'center' },
    ];

    const columnsBoard2 = [
        { title: '구분', dataIndex: 'type', key: 'type', align: 'center' },
        { title: '제조/수입사', dataIndex: 'company', key: 'company', align: 'center' },
        { title: '모델명', dataIndex: 'car', key: 'car', align: 'center' },
        { title: '국비 보조금(만원)', dataIndex: 'subsidy', key: 'subsidy', align: 'center' },
    ];

    return (
        <>
        <div className="button-container">
            <Button
                type="default"
                onClick={handleButtonClick}
                className="centered-button"
                id="board1-button"
            >
                시도별 보조금
            </Button>
            <Button
                type="default"
                onClick={handleButtonClick}
                className="centered-button"
                id="board2-button"
            >
                차종별 보조금
            </Button>
        </div>
            {visibleBoard === 'board2' && (
                <div style={{textAlign: 'center'}}>
                    <Select
                        value={selectedType}
                        onChange={(value) => {setSelectedType(value);}}
                        style={{ width: 200, marginBottom: 16 }}
                    >
                        <Option value="">차량 종류</Option>
                        {uniqueTypes.map((type) => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </Select>
                </div>
            )}
            <br></br>
            <div className="table-container">
                {visibleBoard === 'board1' && (
                    <Table
                        dataSource={board1Data}
                        columns={columnsBoard1}
                        rowKey="city"
                        className="centered-table"
                        style={{ textAlign: 'center' }}
                        pagination={false}
                    />
                )}
                {visibleBoard === 'board2' && (
                    <Table
                        dataSource={board2Data.filter((item) => !selectedType || item.type === selectedType)}
                        columns={columnsBoard2}
                        rowKey="car"
                        className="centered-table"
                        style={{ textAlign: 'center' }}
                        pagination={false}
                    />
                )}
            </div>
        </>
    );
};

export default Subsidy;
