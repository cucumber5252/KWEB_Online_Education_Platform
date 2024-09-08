// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/NavBar';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage';
import ProfessorPage from './pages/ProfessorPage';
import StudentPage from './pages/StudentPage';
import GlobalStyle from './styles/GlobalStyles.js';
import PostDetailPage from './pages/PostDetailPage.js';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('accessToken');

    useEffect(() => {
        if (!isAuthenticated) {
            alert('로그인 이후에 사용 가능합니다');
        }
    }, [isAuthenticated]);

    return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <Router>
            <GlobalStyle />
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/professor"
                    element={
                        <ProtectedRoute>
                            <ProfessorPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/student"
                    element={
                        <ProtectedRoute>
                            <StudentPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/post-detail"
                    element={
                        <ProtectedRoute>
                            <PostDetailPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
