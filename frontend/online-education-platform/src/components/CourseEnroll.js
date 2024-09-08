// src/components/CourseEnroll.js

import React from 'react';
import styled from 'styled-components';
import { enrollCourse } from '../services/api';

const EnrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const EnrollButton = styled.button`
    background-color: ${(props) => (props.enrolled ? '#6c757d' : '#007bff')};
    color: white;
    border: none;
    border-radius: 0.5vw;
    padding: 1vh 2vw;
    cursor: ${(props) => (props.enrolled ? 'default' : 'pointer')};
    font-size: 0.9rem;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.enrolled ? '#6c757d' : '#0056b3')};
    }
`;

const CourseEnroll = ({ courseId, onEnrollSuccess, enrolled }) => {
    const handleEnroll = async () => {
        if (enrolled) {
            alert('이미 수강 신청된 강의입니다.');
            return;
        } else {
            try {
                console.log('courseId: ', courseId);
                await enrollCourse(courseId);
                onEnrollSuccess(); // 수강 신청이 성공한 경우에만 호출
            } catch (error) {
                alert('수강 신청에 실패했습니다.');
            }
        }
    };

    return (
        <EnrollContainer>
            <EnrollButton onClick={handleEnroll} enrolled={enrolled}>
                {enrolled ? '수강 중' : '수강 신청'}
            </EnrollButton>
        </EnrollContainer>
    );
};

export default CourseEnroll;
