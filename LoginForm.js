import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginForm = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
    };
    {
        const [inputId, setInputId] = useState('')
        const [inputPw, setInputPw] = useState('')
     
        const handleInputId = (e) => {
            setInputId(e.target.value)
        }
     
        const handleInputPw = (e) => {
            setInputPw(e.target.value)
        }
     
        const onClickLogin = () => {
            console.log('click login')
        }
     
        useEffect(() => {
            axios.get('/user_inform/login')
            .then(res => console.log(res))
            .catch()
        },
        [])
        return (
            <div style={{ 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                width: '100%', height: '100vh'
                }}>
                <form style={{ display: 'flex', flexDirection: 'column'}}
                >
                    <label>id</label>
                    <input type='text' name='input_id' value={inputId} onChange={handleInputId} />
                    <label>Password</label>
                    <input type='password' name='input_pw' value={inputPw} onChange={handleInputPw} />
                    <br />
                    <button formAction=''>
                        로그인
                    </button>
                    <button formAction='?/RegisterForm'>
                        회원가입
                    </button>
                </form>
            </div>
        )
    }
    
};

export default LoginForm;
