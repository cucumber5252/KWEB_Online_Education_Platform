// src/components/CourseDetail.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import {
    fetchPostsByCourse,
    fetchStudentsByCourse,
    removeStudentFromCourse,
    createPost,
    deletePost,
} from '../services/api';
import PartialLoading from './PartialLoading';

const CourseDetailContainer = styled.div`
    margin: 2vh 0;
    padding: 2vh 2vw;
    background-color: #f8f9fa;
    border-radius: 1vw;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 2vh;
`;

const PostContainer = styled.div`
    padding: 1.5vh 2vw;
    background-color: #ffffff;
    border-radius: 0.5vw;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    margin-bottom: 1vh;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f1f1f1;
    }

    h3 {
        width: 80%;
        font-size: 1.2rem;
        color: #333;
        display: flex;
        align-items: center;
    }

    button {
        width: 10%;
        height: 5vh;
        margin-top: 1vh;
        padding: 0.5vh 1vw;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 0.5vw;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #c82333;
        }
    }
`;

const InputContainer = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1.5vh;
    background-color: #ffffff;
    padding: 2vh;
    border-radius: 0.5vw;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    margin-bottom: 2vh;

    .ql-container {
        height: 200px;
        border-radius: 0.5vw;
    }

    .ql-editor {
        font-size: 1rem;
        line-height: 1.6;
        width: 70vw;
    }
    input {
        width: 70vw;
    }

    button {
        align-self: flex-end;
        padding: 1vh 2vw;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0.5vw;
        cursor: pointer;
        transition: background-color 0.3s ease;
        width: 100px;

        &:hover {
            background-color: #0056b3;
        }
    }
`;

const NoDataMessage = styled.div`
    text-align: center;
    font-size: 1.1rem;
    color: #777;
    padding: 2vh 0;
`;

const StudentListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5vh;
    background-color: #ffffff;
    padding: 1.5vh 2vw;
    border-radius: 1vw;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    border: 1px solid #ddd;
`;

const StudentItem = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr 1fr;
    align-items: center;
    padding: 1vh 0;
    border-bottom: 1px solid #ddd;

    &:last-child {
        border-bottom: none;
    }

    span {
        font-size: 1rem;
        color: #333;
        text-align: center;
    }

    button {
        height: 5vh;
        padding: 0.5vh 1vw;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 0.5vw;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
            background-color: #c82333;
        }
    }
`;

const Title = styled.h3`
    font-size: 1.3rem;
`;

const CourseDetail = ({ courseId }) => {
    const [posts, setPosts] = useState([]);
    const [students, setStudents] = useState([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadCourseData = async () => {
            setLoading(true);
            const postsResponse = await fetchPostsByCourse(courseId);
            setPosts(postsResponse.data);
            const studentsResponse = await fetchStudentsByCourse(courseId);
            setStudents(studentsResponse.data);
            setLoading(false);
        };
        loadCourseData();
    }, [courseId]);

    const handleRemoveStudent = async (studentId) => {
        try {
            await removeStudentFromCourse(courseId, studentId);
            const studentsResponse = await fetchStudentsByCourse(courseId);
            setStudents(studentsResponse.data);
            alert('수강 취소가 완료되었습니다.');
        } catch (error) {
            console.error('Error removing student from course:', error);
            alert('수강 취소 중 오류가 발생했습니다.');
        }
    };

    const handleCreatePost = async () => {
        if (!newPostTitle.trim() || !newPostContent.trim()) {
            alert('게시물 제목과 내용을 입력해주세요.');
            return;
        }

        await createPost(courseId, { title: newPostTitle, content: newPostContent });
        const response = await fetchPostsByCourse(courseId);
        setPosts(response.data);
        setNewPostTitle('');
        setNewPostContent('');
    };

    const handleDeletePost = async (postId) => {
        await deletePost(postId);
        const response = await fetchPostsByCourse(courseId);
        setPosts(response.data);
    };

    const handlePostClick = (post) => {
        navigate('/post-detail', {
            state: { title: post.title, content: post.content, courseTitle: post.courseTitle },
        });
    };

    return (
        <CourseDetailContainer>
            <Title>게시물 목록</Title>
            {loading ? (
                <PartialLoading />
            ) : posts.length === 0 ? (
                <NoDataMessage>게시물이 없습니다.</NoDataMessage>
            ) : (
                posts.map((post) => (
                    <PostContainer key={post.id} onClick={() => handlePostClick(post)}>
                        <h3>{post.title}</h3>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeletePost(post.id);
                            }}
                        >
                            삭제
                        </button>
                    </PostContainer>
                ))
            )}
            <Title>게시물 추가</Title>
            <InputContainer>
                <input
                    type="text"
                    placeholder="게시물 제목"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                />
                <ReactQuill
                    value={newPostContent}
                    onChange={setNewPostContent}
                    placeholder="게시물 내용을 입력하세요..."
                />
                <button onClick={handleCreatePost}>추가</button>
            </InputContainer>
            <Title>수강생 목록</Title>
            {loading ? (
                <PartialLoading />
            ) : students.length === 0 ? (
                <NoDataMessage>수강생이 없습니다.</NoDataMessage>
            ) : (
                <StudentListContainer>
                    {students.map((student) => (
                        <StudentItem key={student.id}>
                            <span>{student.name}</span>
                            <span>{student.studentId}</span>
                            <button onClick={() => handleRemoveStudent(student.id)}>수강 취소</button>
                        </StudentItem>
                    ))}
                </StudentListContainer>
            )}
        </CourseDetailContainer>
    );
};

export default CourseDetail;
