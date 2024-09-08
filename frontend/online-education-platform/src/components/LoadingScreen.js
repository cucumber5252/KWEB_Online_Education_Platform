// src/components/LoadingScreen.js

import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90vh;
    background-color: #ffffff;
`;

const LoadingSpinner = styled.div`
    border: 5px solid #f3f3f3;
    border-top: 5px solid #007bff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const LoadingScreen = () => (
    <LoadingContainer>
        <LoadingSpinner />
    </LoadingContainer>
);

export default LoadingScreen;
