// src/pages/DashboardPage.js

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';
import { fetchEnrolledCourses, fetchPostsByCourse } from '../services/api';
import styled from 'styled-components';

const DashboardBackground = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90vh;
    background-color: #f4f4f4;
`;

const DashboardContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5vh 2vw;
    background-color: #ffffff;
    border-radius: 1vw;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 600px;
    width: 100%;
    margin: 0 auto;
    height: 90vh;

    h2 {
        margin-bottom: 3vh;
        font-size: 2rem;
    }

    a {
        margin-bottom: 2vh;
        width: 40vw;
        max-width: 300px;
        text-align: center;
    }

    button {
        width: 100%;
        padding: 1.5vh 0;
        font-size: 1.2rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0.5vw;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #0056b3;
    }

    @media (max-width: 768px) {
        h2 {
            font-size: 1.8rem;
        }

        a {
            width: 60vw;
        }
    }
`;

const UpdatesContainer = styled.div`
    margin: 2vh;
    padding: 2vh 2vw;
    border: 1px solid #ddd;
    border-radius: 1vw;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 30vw;
    max-height: 50vh;
    overflow-y: auto;
`;

const UpdateItem = styled.div`
    padding: 1.5vh 1vw;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f0f8ff;
    }

    &:last-child {
        border-bottom: none;
    }

    .update-title {
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 0.5vh;
    }

    .course-title {
        font-size: 0.9rem;
        color: #555;
        margin-bottom: 0.5vh;
    }

    .update-date {
        font-size: 0.8rem;
        color: #888;
    }
`;

const NoUpdatesMessage = styled.div`
    text-align: center;
    font-size: 1rem;
    color: #777;
    margin-top: 2vh;
    padding: 1vh 2vw;
    border: 1px solid #ddd;
    border-radius: 0.5vw;
    background-color: #fafafa;
`;

const DashboardPage = ({ userId, role = 'student' }) => {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const storedRole = localStorage.getItem('role');

    useEffect(() => {
        const loadRecentUpdates = async () => {
            if (role === 'student') {
                try {
                    const enrolledCoursesResponse = await fetchEnrolledCourses();
                    const enrolledCourses = enrolledCoursesResponse.data || [];

                    if (enrolledCourses.length === 0) {
                        setUpdates([]);
                        setLoading(false);
                        return;
                    }

                    const allPosts = [];
                    for (const course of enrolledCourses) {
                        const postsResponse = await fetchPostsByCourse(course.id);
                        const postsWithCourseTitle = postsResponse.data.map((post) => ({
                            ...post,
                            courseTitle: course.title,
                        }));
                        allPosts.push(...postsWithCourseTitle);
                    }

                    allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setUpdates(allPosts);
                } catch (error) {
                    console.error('Failed to fetch recent updates:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        loadRecentUpdates();
    }, [userId, role]);

    const handleNavigation = (e, targetPage) => {
        e.preventDefault();
        if (storedRole === 'professor' && targetPage === '/student') {
            alert('교수자는 학생 페이지로 접근할 수 없습니다.');
        } else if (storedRole === 'student' && targetPage === '/professor') {
            alert('학생은 교수자 페이지로 접근할 수 없습니다.');
        } else {
            navigate(targetPage);
        }
    };

    if (loading) return <LoadingScreen />;

    return (
        <DashboardBackground>
            <DashboardContainer>
                <h2>대시보드</h2>
                <Link to="/professor" onClick={(e) => handleNavigation(e, '/professor')}>
                    <button>교수자 페이지</button>
                </Link>
                <Link to="/student" onClick={(e) => handleNavigation(e, '/student')}>
                    <button>학생 페이지</button>
                </Link>

                {role === 'student' && (
                    <UpdatesContainer>
                        <h3 style={{ marginBottom: '1vh' }}>최근 업데이트</h3>
                        {updates.length === 0 ? (
                            <NoUpdatesMessage>새로운 소식이 없습니다.</NoUpdatesMessage>
                        ) : (
                            updates.map((update) => (
                                <UpdateItem
                                    key={update.id}
                                    onClick={() =>
                                        navigate('/post-detail', {
                                            state: {
                                                title: update.title,
                                                content: update.content,
                                                courseTitle: update.courseTitle,
                                            },
                                        })
                                    }
                                >
                                    <div className="update-title">{update.title}</div>
                                    <div className="course-title">{update.courseTitle}</div>
                                    <div className="update-date">{new Date(update.createdAt).toLocaleString()}</div>
                                </UpdateItem>
                            ))
                        )}
                    </UpdatesContainer>
                )}
            </DashboardContainer>
        </DashboardBackground>
    );
};

export default DashboardPage;
