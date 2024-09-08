// src/mockData.js

export const mockUsers = [
    {
        id: 1,
        username: 'student1',
        password: 'password123',
        name: '학생1',
        studentId: '20240101',
        role: 'student',
    },
    {
        id: 2,
        username: 'professor1',
        password: 'password123',
        name: '교수자1',
        studentId: 'P0001',
        role: 'professor',
    },
];

export const mockCourses = [
    {
        id: 1,
        title: '컴퓨터 과학 개론',
        professorId: 2,
        students: [1],
    },
    {
        id: 2,
        title: '웹 개발 입문',
        professorId: 2,
        students: [],
    },
];

export const mockPosts = [
    {
        id: 1,
        courseId: 1,
        title: '첫 번째 게시물',
        content: '<p>컴퓨터 과학 개론 첫 번째 게시물입니다.</p>',
        createdAt: '2024-01-01T10:00:00Z',
        courseTitle: '컴퓨터 과학 개론',
    },
    {
        id: 2,
        courseId: 2,
        title: '첫 번째 게시물',
        content: '<p>웹 개발 입문 첫 번째 게시물입니다.</p>',
        createdAt: '2024-01-02T12:00:00Z',
        courseTitle: '웹 개발 입문',
    },
    {
        id: 3,
        courseId: 1,
        title: '두 번째 게시물',
        content: '<p>컴퓨터 과학 개론 두 번째 게시물입니다.</p>',
        createdAt: '2024-01-01T10:00:01Z',
        courseTitle: '컴퓨터 과학 개론',
    },
];

export const mockUpdates = [
    {
        id: 1,
        courseTitle: '컴퓨터 과학 개론',
        content: '새로운 게시물이 등록되었습니다.',
        createdAt: '2024-01-03T15:00:00Z',
    },
    {
        id: 2,
        courseTitle: '웹 개발 입문',
        content: '수강 신청이 완료되었습니다.',
        createdAt: '2024-01-04T18:30:00Z',
    },
];
