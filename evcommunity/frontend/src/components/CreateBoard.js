import React, { useState } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';

const CreateBoard = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFinish = (values) => {
        setLoading(true);
        console.log('Received values of form: ', values);
        // 여기에서 서버로 전송하거나 추가 작업을 수행할 수 있습니다.
        setLoading(false);
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            style={{ marginTop: '16px', width: '1200px', margin: '16px auto' }}
        >
            <Row>
                <Col span={4}>작성자</Col>
                <Col span={20}>
                    <Form.Item
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: '작성자를 입력해주세요',
                            },
                        ]}
                    >
                        <Input placeholder="작성자" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={4}>제목</Col>
                <Col span={20}>
                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: '제목을 입력해주세요',
                            },
                        ]}
                    >
                        <Input placeholder="제목" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={4}>내용</Col>
                <Col span={20}>
                    <Form.Item
                        name="content"
                        rules={[
                            {
                                required: true,
                                message: '내용을 입력해주세요',
                            },
                        ]}
                    >
                        <Input.TextArea rows={4} placeholder="내용" />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{textAlign: 'center'}}>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} style={{ marginTop: '16px' }}>
                            등록하기
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default CreateBoard;
