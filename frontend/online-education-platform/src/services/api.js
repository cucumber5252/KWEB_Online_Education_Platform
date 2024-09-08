import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        if (!config.url.includes('/auth/login') && !config.url.includes('/auth/register')) {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const registerUser = (userData) =>
    apiClient.post('/auth/register', userData).then((response) => {
        console.log('registerUser response:', response.data);
        return response.data;
    });

export const loginUser = (credentials) =>
    apiClient.post('/auth/login', credentials).then((response) => {
        console.log('loginUser response:', response.data);
        return response.data;
    });

export const fetchCourses = () =>
    apiClient.get('/courses').then((response) => {
        console.log('fetchCourses response:', response.data);
        return response.data;
    });

export const fetchProfessorCourses = () =>
    apiClient.get('/courses/my').then((response) => {
        console.log('fetchProfessorCourses response:', response.data);
        return response.data;
    });

export const createCourse = (courseData) =>
    apiClient.post('/courses', courseData).then((response) => {
        console.log('createCourse response:', response.data);
        return response.data;
    });

export const enrollCourse = (courseId) =>
    apiClient.post(`/courses/${courseId}/enroll`).then((response) => {
        console.log('enrollCourse response:', response.data);
        return response.data;
    });

export const fetchEnrolledCourses = () =>
    apiClient.get('/courses/enrolled').then((response) => {
        console.log('fetchEnrolledCourses response:', response.data);
        return response.data;
    });

export const fetchPostsByCourse = (courseId) =>
    apiClient.get(`/courses/${courseId}/posts`).then((response) => {
        console.log('fetchPostsByCourse response:', response.data);
        return response.data;
    });

export const createPost = (courseId, content) =>
    apiClient.post(`/courses/${courseId}/posts`, content).then((response) => {
        console.log('createPost response:', response.data);
        return response.data;
    });

export const deletePost = (courseId, postId) =>
    apiClient.delete(`/courses/${courseId}/posts/${postId}`).then((response) => {
        console.log('deletePost response:', response.data);
        return response.data;
    });

export const fetchStudentsByCourse = (courseId) =>
    apiClient.get(`/courses/${courseId}/students`).then((response) => {
        console.log('fetchStudentsByCourse response:', response.data);
        return response.data;
    });

export const removeStudentFromCourse = (courseId, studentId) =>
    apiClient.delete(`/courses/${courseId}/students/${studentId}`).then((response) => {
        console.log('removeStudentFromCourse response:', response.data);
        return response.data;
    });

export const fetchRecentUpdates = () =>
    apiClient.get('/updates').then((response) => {
        console.log('fetchRecentUpdates response:', response.data);
        return response.data;
    });
