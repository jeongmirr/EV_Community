import React, { useState } from 'react';
import { Table, Pagination } from 'antd';

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

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
                pagination={false}
                rowKey="key"
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data.length}
                onChange={onPageChange}
                style={{ marginTop: '16px', textAlign: 'center' }}
            />
        </div>
    );
};

export default Board;
