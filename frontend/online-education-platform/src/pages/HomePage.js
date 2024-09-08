// src/pages/HomePage.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
    background-color: #f4f4f4;
`;

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5vh 2vw;
    background-color: #ffffff;
    border-radius: 1vw;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    height: 90vh;

    @media (max-width: 768px) {
        padding: 4vh 2vw;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2vh;
    gap: 1vw;
`;

const StyledButton = styled.button`
    width: auto;
    padding: 1.5vh 2vw;
    font-size: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.5vw;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }

    &:active {
        background-color: #003d80;
        transform: translateY(0);
    }
`;

const HomePage = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        alert('로그아웃 되었습니다.');
        navigate('/login');
    };

    return (
        <HomeBackground>
            <HomeContainer>
                <h1>KWEBOARD</h1>
                <ButtonContainer>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/register">
                                <StyledButton>회원 가입</StyledButton>
                            </Link>
                            <Link to="/login">
                                <StyledButton>로그인</StyledButton>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/dashboard">
                                <StyledButton>대시보드</StyledButton>
                            </Link>
                            <StyledButton onClick={handleLogout}>로그아웃</StyledButton>
                        </>
                    )}
                </ButtonContainer>
            </HomeContainer>
        </HomeBackground>
    );
};

export default HomePage;
