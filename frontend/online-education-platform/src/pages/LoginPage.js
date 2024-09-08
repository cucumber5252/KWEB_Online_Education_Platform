// src/pages/LoginPage.js

import React, { useState } from 'react';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 90vh;
    padding: 5vh 2vw;
    background-color: #ffffff;
    border: 1px solid #ddd;
    border-radius: 1vw;
    max-width: 400px;
    margin: 0 auto;

    @media (max-width: 768px) {
        padding: 2vh 2vw;
    }
`;

const LoginTitle = styled.h2`
    margin-bottom: 3vh;
    color: #333;
    font-size: 2rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const LoginPage = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(credentials);
            const { accessToken, role } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('role', role);
            alert('로그인이 완료되었습니다.');
            navigate('/dashboard');
        } catch (error) {
            alert('로그인에 실패했습니다.');
        }
    };

    return (
        <LoginContainer>
            <LoginTitle>로그인</LoginTitle>
            <Form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} placeholder="아이디" required />
                <input type="password" name="password" onChange={handleChange} placeholder="비밀번호" required />
                <button type="submit" style={{ marginTop: '5vh' }}>
                    로그인
                </button>
            </Form>
        </LoginContainer>
    );
};

export default LoginPage;
