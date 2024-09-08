// src/components/PostEditor.js

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createPost } from '../services/api';
import styled from 'styled-components';

const EditorContainer = styled.div`
    margin: 2vh 0;
    padding: 2vh 2vw;
    border: 1px solid #ddd;
    border-radius: 1vw;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 2vh;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        padding: 2vh 2vw;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const PostEditor = ({ courseId }) => {
    const [content, setContent] = useState('');

    const handleChange = (value) => {
        setContent(value);
    };

    const handleSubmit = async () => {
        if (!courseId) {
            alert('강의가 선택되지 않았습니다.');
            return;
        }

        try {
            await createPost(courseId, content);
            alert('게시물이 등록되었습니다.');
            setContent('');
        } catch (error) {
            alert('게시물 등록에 실패했습니다.');
            console.error(error);
        }
    };

    return (
        <EditorContainer>
            <h2>게시물 작성</h2>
            <ReactQuill value={content} onChange={handleChange} />
            <ButtonContainer>
                <button onClick={handleSubmit}>등록</button>
            </ButtonContainer>
        </EditorContainer>
    );
};

export default PostEditor;
