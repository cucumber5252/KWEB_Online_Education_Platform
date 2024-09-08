// src/pages/ProfessorPage.js

import React, { useState, useEffect } from 'react';
import { fetchProfessorCourses, createCourse } from '../services/api';
import CourseList from '../components/CourseList';
import CourseDetail from '../components/CourseDetail';
import LoadingScreen from '../components/LoadingScreen';
import styled from 'styled-components';

const ProfessorContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2vh;
    width: 90vw;
    max-width: 1200px;
    margin: 0vh auto;
    padding: 3vh 2vw;
    background-color: #ffffff;
    border-radius: 1vw;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 90vh;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding: 3vh 4vw;
    }
`;

const CourseManagement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5vh;
    background-color: #f8f9fa;
    padding: 2vh 2vw;
    border-radius: 1vw;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const InputContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1vw;
    align-items: center;
    margin-top: 1vh;

    input {
        flex: 3;
        padding: 1.2vh 1vw;
        border-radius: 0.5vw;
        font-size: 1rem;
        min-width: 50%;
        border: none;
        &:focus {
            outline: 1px solid #007bff;
        }
    }

    button {
        flex: 1;
        padding: 1.2vh 2vw;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0.5vw;
        cursor: pointer;
        transition: background-color 0.3s ease;
        min-width: 30%;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

const ProfessorPage = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);
                const response = await fetchProfessorCourses();
                setCourses(response && response.data ? response.data : []);
            } catch (error) {
                console.error('Error fetching courses:', error);
                alert('강의를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    const handleCourseClick = (courseId) => {
        if (selectedCourse === courseId) {
            setSelectedCourse(null);
        } else {
            setSelectedCourse(courseId);
        }
    };

    const handleCreateCourse = async () => {
        if (!newCourseTitle.trim()) {
            alert('강의명을 입력해주세요.');
            return;
        }

        try {
            await createCourse({ title: newCourseTitle });
            const response = await fetchProfessorCourses();
            setCourses(response && response.data ? response.data : []);
            setNewCourseTitle('');
        } catch (error) {
            console.error('Error creating or fetching courses:', error);
            alert('강의를 추가하는 중 오류가 발생했습니다.');
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <ProfessorContainer>
            <h1>교수자 페이지</h1>
            <CourseManagement>
                <h2>강의 관리</h2>
                {courses.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#666' }}>아직 개설한 강의가 없습니다.</p>
                ) : (
                    <CourseList
                        courses={courses}
                        onCourseClick={handleCourseClick}
                        role="professor"
                        selectedCourse={selectedCourse}
                    />
                )}
                <InputContainer>
                    <input
                        type="text"
                        placeholder="새 강의명"
                        value={newCourseTitle}
                        onChange={(e) => setNewCourseTitle(e.target.value)}
                    />
                    <button onClick={handleCreateCourse}>강의 추가</button>
                </InputContainer>
            </CourseManagement>
            {selectedCourse && <CourseDetail courseId={selectedCourse} />}
        </ProfessorContainer>
    );
};

export default ProfessorPage;
