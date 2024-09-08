// src/pages/RegisterPage.js

import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const RegisterContainer = styled.div`
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 4vh 3vw;
    }
`;

const RegisterTitle = styled.h2`
    margin-bottom: 3vh;
    color: #333;
    font-size: 2.2rem;
    text-align: center;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2vh;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 0.9rem;
    text-align: center;
    margin-top: 1vh;
`;

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        studentId: '',
        role: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.role) {
            setError('학생 또는 교수자 중 하나를 선택해주세요.');
            return;
        }

        if (formData.role === 'student' && !formData.studentId) {
            setError('학생은 학번을 입력해주세요.');
            return;
        }

        if (!formData.username || !formData.password || !formData.name) {
            setError('모든 항목을 입력해주세요.');
            return;
        }

        try {
            const response = await registerUser(formData);
            const { accessToken, role } = response.data;
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('role', role);
            alert('회원가입이 완료되었습니다.');
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
            alert('회원가입에 실패했습니다.');
        }
    };

    return (
        <RegisterContainer>
            <RegisterTitle>회원 가입</RegisterTitle>
            <Form onSubmit={handleSubmit}>
                <input type="text" name="username" onChange={handleChange} placeholder="아이디" required />
                <input type="password" name="password" onChange={handleChange} placeholder="비밀번호" required />
                <input type="text" name="name" onChange={handleChange} placeholder="이름" required />
                <select name="role" onChange={handleChange} value={formData.role} required>
                    <option value="">학생/교수자</option>
                    <option value="student">학생</option>
                    <option value="professor">교수자</option>
                </select>
                {formData.role === 'student' && (
                    <input type="text" name="studentId" onChange={handleChange} placeholder="학번" required />
                )}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <button type="submit" style={{ marginTop: '3vh' }} disabled={!formData.role}>
                    회원 가입
                </button>
            </Form>
        </RegisterContainer>
    );
};

export default RegisterPage;
