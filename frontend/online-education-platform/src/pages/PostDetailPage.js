// src/pages/PostDetail.js

import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';

const PostDetailContainer = styled.div`
    margin: 5vh auto;
    padding: 4vh 3vw;
    width: 90vw;
    max-width: 800px;
    background-color: #ffffff;
    border-radius: 1vw;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 2vh;
`;

const BackButton = styled.button`
    align-self: flex-start;
    padding: 1vh 2vw;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 0.5vw;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;

const PostTitle = styled.h2`
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 0.5vh;
`;

const CourseTitle = styled.h3`
    font-size: 1.2rem;
    color: #666;
    margin: 0 0 1vh 0.3vw;
`;

const PostContent = styled.div`
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
    white-space: pre-wrap;
    background-color: #f8f9fa;
    padding: 2vh 2vw;
    border-radius: 1vw;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const PostDetailPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, content, courseTitle } = location.state;

    return (
        <PostDetailContainer>
            <PostTitle>{title}</PostTitle>
            <CourseTitle>{courseTitle}</CourseTitle>
            <PostContent dangerouslySetInnerHTML={{ __html: content }} />
            <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        </PostDetailContainer>
    );
};

export default PostDetailPage;
