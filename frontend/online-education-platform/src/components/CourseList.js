// src/components/CourseList.js

import React from 'react';
import styled from 'styled-components';
import CourseEnroll from './CourseEnroll';

const CourseListContainer = styled.div`
    margin: 0vh 0;
    padding: 0.2vh 0.2vw;
    border: 1px solid #ddd;
    border-radius: 1vw;
    background-color: #ffffff;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CourseItem = styled.div`
    border-radius: 1vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5vh 1vw;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    background-color: ${(props) => (props.selected ? '#e6e6e6' : '#ffffff')};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: ${(props) => (props.selected ? '#dcdcdc' : '#f5f5f5')};
    }

    &:last-child {
        border-bottom: none;
    }

    span {
        flex: 1;
        font-size: 1rem;
        color: #333;
        font-weight: 700;
    }

    button {
        margin-left: 1vw;
    }
`;
const CourseList = ({ courses, onCourseClick, role, onEnrollSuccess, enrolledCourses = [], selectedCourse }) => {
    const handleClick = (courseId, isButton = false) => {
        if (!isButton) {
            onCourseClick(courseId, false);
        }
    };

    return (
        <CourseListContainer>
            {courses.map((course) => (
                <CourseItem
                    key={course.id}
                    onClick={() => handleClick(course.id)}
                    selected={selectedCourse === course.id}
                >
                    <span>{course.title}</span>
                    {role === 'student' &&
                        (enrolledCourses.includes(course.id) ? (
                            <CourseEnroll courseId={course.id} enrolled onEnrollSuccess={onEnrollSuccess} />
                        ) : (
                            <CourseEnroll courseId={course.id} onEnrollSuccess={onEnrollSuccess} />
                        ))}
                </CourseItem>
            ))}
        </CourseListContainer>
    );
};

export default CourseList;
