// src/components/PartialLoading.js

import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2vh 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: black;
`;

const PartialLoading = () => {
    return <LoadingContainer>로딩 중...</LoadingContainer>;
};

export default PartialLoading;
