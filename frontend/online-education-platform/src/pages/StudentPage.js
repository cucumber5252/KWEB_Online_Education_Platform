// src/pages/StudentPage.js

import React, { useState, useEffect } from 'react';
import { fetchEnrolledCourses, fetchCourses, fetchPostsByCourse } from '../services/api';
import CourseList from '../components/CourseList';
import PartialLoading from '../components/PartialLoading';
import LoadingScreen from '../components/LoadingScreen';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StudentContainer = styled.div`
    margin: 0vh auto;
    padding: 4vh 3vw;
    width: 90vw;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 0vh;
    background-color: #ffffff;
    border-radius: 1vw;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 90vh;
    overflow-y: auto;

    @media (max-width: 768px) {
        padding: 4vh 5vw;
    }
`;

const CourseContent = styled.div`
    margin-top: 5vh;
    padding: 2vh 2vw;
    background-color: #f8f9fa;
    border-radius: 1vw;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    width: 100%;
`;

const PostContainer = styled.div`
    margin: 1.5vh 0;
    padding: 1.5vh 2vw;
    background-color: #ffffff;
    border-radius: 0.5vw;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f1f1f1;
    }

    h4 {
        margin-bottom: 0.5vh;
        font-size: 1.4rem;
        color: #333;
    }

    p {
        font-size: 1rem;
        color: #555;
        line-height: 1.6;
    }

    @media (max-width: 768px) {
        padding: 1.5vh 4vw;
        h4 {
            font-size: 1.2rem;
        }
        p {
            font-size: 0.9rem;
        }
    }
`;

const MessageContainer = styled.div`
    font-size: 1.1rem;
    text-align: center;
    margin-top: 2vh;
    min-height: 5vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StudentPage = () => {
    const [allCourses, setAllCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourses = async () => {
            try {
                setLoading(true);
                const allResponse = await fetchCourses();
                setAllCourses(allResponse && allResponse.data ? allResponse.data : []);

                const enrolledResponse = await fetchEnrolledCourses();
                setEnrolledCourses(
                    enrolledResponse && enrolledResponse.data ? enrolledResponse.data.map((course) => course.id) : []
                );
            } catch (error) {
                console.error('Error loading courses:', error);
                alert('강의를 불러오는 중 오류가 발생했습니다.');
            } finally {
                setLoading(false);
            }
        };
        loadCourses();
    }, []);

    const handleCourseClick = async (courseId) => {
        if (selectedCourse === courseId) {
            setSelectedCourse(null);
            setPosts([]);
            return;
        }

        if (!enrolledCourses.includes(courseId)) {
            return;
        }

        setSelectedCourse(courseId);
        setLoadingPosts(true);
        try {
            const response = await fetchPostsByCourse(courseId);
            setPosts(response && response.data ? response.data : []);
        } catch (error) {
            console.error('Error fetching posts:', error);
            alert('게시물을 불러오는 중 오류가 발생했습니다.');
        } finally {
            setLoadingPosts(false);
        }
    };

    const handlePostClick = (post) => {
        navigate('/post-detail', {
            state: { title: post.title, content: post.content, courseTitle: post.courseTitle },
        });
    };

    const handleEnrollSuccess = async () => {
        try {
            const response = await fetchEnrolledCourses();
            setEnrolledCourses(response.data.map((course) => course.id));
            alert('수강 신청이 완료되었습니다.');
        } catch (error) {
            console.error('Error enrolling in course:', error);
            alert('수강 신청 중 오류가 발생했습니다.');
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <StudentContainer>
            <h1>학생 페이지</h1>
            <h2 style={{ margin: '3vh 0 2vh 1vh' }}>모든 강의 목록</h2>
            <CourseList
                courses={allCourses}
                onCourseClick={handleCourseClick}
                role="student"
                onEnrollSuccess={handleEnrollSuccess}
                enrolledCourses={enrolledCourses}
                selectedCourse={selectedCourse}
            />

            <h2 style={{ margin: '3vh 0 2vh 1vh' }}>수강 중인 강의 목록</h2>
            {enrolledCourses.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>아직 수강신청한 강의가 없습니다.</p>
            ) : (
                <CourseList
                    courses={allCourses.filter((course) => enrolledCourses.includes(course.id))}
                    onCourseClick={handleCourseClick}
                    role="enrolled"
                    selectedCourse={selectedCourse}
                />
            )}

            <CourseContent>
                <h2 style={{ fontSize: '1.3rem' }}>강의 게시물</h2>
                {loadingPosts ? (
                    <PartialLoading />
                ) : !selectedCourse ? (
                    <MessageContainer>수강 중인 강의 목록에서 강의를 클릭하세요.</MessageContainer>
                ) : posts.length === 0 ? (
                    <MessageContainer>아직 등록된 게시물이 없습니다.</MessageContainer>
                ) : (
                    posts.map((post) => (
                        <PostContainer key={post.id} onClick={() => handlePostClick(post)}>
                            <h3>{post.title}</h3>
                        </PostContainer>
                    ))
                )}
            </CourseContent>
        </StudentContainer>
    );
};

export default StudentPage;
