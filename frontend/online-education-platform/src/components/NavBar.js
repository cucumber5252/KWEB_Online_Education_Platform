// src/components/Navbar.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #007bff;
    padding: 1vh 2vw;
    color: white;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NavLinks = styled.div`
    display: flex;
    gap: 2vw;

    a {
        color: white;
        font-size: 1.1rem;
        text-decoration: none;
        transition: color 0.3s ease;
    }

    a:hover {
        color: #ddd;
    }
`;

const StyledLinkButton = styled.div`
    color: white;
    font-size: 1.1rem;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.3s ease;
    text-decoration: none;
    padding: 0;
    margin: 0;

    &:hover {
        color: #ddd;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('accessToken');

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        alert('로그아웃 되었습니다.');
        navigate('/login');
    };

    return (
        <NavbarContainer>
            <h1>KWEBOARD</h1>
            <NavLinks>
                <Link to="/">홈</Link>
                {!isAuthenticated ? (
                    <>
                        <Link to="/register">회원 가입</Link>
                        <Link to="/login">로그인</Link>
                    </>
                ) : (
                    <>
                        <StyledLinkButton onClick={handleLogout}>로그아웃</StyledLinkButton>
                        <Link to="/dashboard">대시보드</Link>
                    </>
                )}
            </NavLinks>
        </NavbarContainer>
    );
};

export default Navbar;
