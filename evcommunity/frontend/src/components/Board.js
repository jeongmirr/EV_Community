import React, { useState } from 'react';
import { Table, Pagination, Button } from 'antd';

const Board = () => {
    const today = new Date();
    const currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    const columns = [
        {
            title: '번호',
            dataIndex: 'title',
        },
        {
            title: '내용',
            dataIndex: 'content',
        },
        {
            title: '글쓴이',
            dataIndex: 'author',
        },
        {
            title: '작성일',
            dataIndex: 'date',
        },
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i,
            title: `Post ${i + 1}`,
            content: `Content of Post ${i + 1}`,
            author: `Author ${i + 1}`,
            date: currentDate,
        });
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const handleButtonClick = () => {
        window.location.href = '/CreateBoard';
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                pagination={false}
                rowKey="key"
            />
            <div style={{ marginTop: '16px', textAlign: 'center' }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={data.length}
                    onChange={onPageChange}
                />
                <Button
                    onClick={handleButtonClick}
                    type="default"
                    style={{ marginTop: '16px'}}
                >
                    글쓰기
                </Button>
            </div>
        </div>
    );
};

export default Board;
