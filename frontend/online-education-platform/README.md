# KWEB Online Education Platform - 프론트엔드

## 프로젝트 소개

KWEB Online Education Platform의 프론트엔드는 React.js를 기반으로 한 웹 애플리케이션입니다. 이 플랫폼은 교수자와 학생 간의 상호작용을 가능하게 하며, 사용자는 로그인 후 강의를 등록하거나 수강신청을 하고, 강의별 게시물을 작성 및 조회할 수 있습니다. 이 프로젝트는 사용자 친화적인 인터페이스와 원활한 사용자 경험을 제공하는 것을 목표로 하고 있습니다.

## 기술 스택

-   **프론트엔드**: React.js
-   **HTTP 클라이언트**: Axios
-   **라우팅**: React Router
-   **스타일링**: Styled-components

## 설치 및 실행 방법

### 1. 클론 및 의존성 설치

먼저, GitHub 레포지토리를 클론한 후 프론트엔드 디렉토리로 이동하여 필요한 의존성을 설치합니다.

```bash
git clone https://github.com/cucumber5252/kweb_online-education-platform.git
cd Kweb/frontend/online-education-platform
npm install
```

### 2. 환경 설정

백엔드 서버가 `http://localhost:3000`에서 실행 중인지 확인하십시오. 프론트엔드는 기본적으로 이 서버와 통신하도록 설정되어 있으며, 이를 통해 API 요청을 처리합니다.

### 3. 클라이언트 실행

프론트엔드 애플리케이션을 실행하려면 다음 명령어를 사용하십시오:

```bash
npm start
```

이 명령어는 개발 모드로 애플리케이션을 시작합니다. 브라우저에서 `http://localhost:3001`로 접속하여 애플리케이션을 이용할 수 있습니다.

## 주요 기능

### 사용자 인증

-   **회원 가입 및 로그인**: 사용자는 아이디와 비밀번호를 통해 회원 가입 및 로그인을 할 수 있으며, 로그인 후 JWT 토큰을 통해 인증이 유지됩니다.

### 강의 관리

-   **강의 등록**: 교수자는 새로운 강의를 등록할 수 있습니다.
-   **수강 신청**: 학생은 기존 강의 목록을 조회하고, 원하는 강의에 수강 신청을 할 수 있습니다.
-   **게시물 작성 및 관리**: 교수자는 강의별로 게시물을 작성하고, 학생들은 해당 게시물을 조회할 수 있습니다.

### 역할별 기능

-   **교수자 기능**:
    -   강의 등록
    -   게시물 작성 및 수정
    -   수강 학생 목록 조회 및 관리
-   **학생 기능**:
    -   강의 목록 조회 및 수강 신청
    -   수강 중인 강의의 게시물 조회
    -   최신 업데이트 열람

### 초기 로그인 정보

`initial_data.json`을 통해 생성된 초기 사용자 계정 정보를 통해 애플리케이션의 모든 기능을 테스트할 수 있습니다:

-   **교수자 계정** (2명)

    -   **professor1**:
        -   아이디(username): `professor1`
        -   비밀번호(password): `password`
    -   **professor2**:
        -   아이디(username): `professor2`
        -   비밀번호(password): `password`

-   **학생 계정** (5명)
    -   **student1**:
        -   아이디(username): `student1`
        -   비밀번호(password): `password`
    -   **student2**:
        -   아이디(username): `student2`
        -   비밀번호(password): `password`
    -   **student3**:
        -   아이디(username): `student3`
        -   비밀번호(password): `password`
    -   **student4**:
        -   아이디(username): `student4`
        -   비밀번호(password): `password`
    -   **student5**:
        -   아이디(username): `student5`
        -   비밀번호(password): `password`

## 추가 정보

-   **스타일링**: 애플리케이션은 `styled-components`를 사용하여 CSS-in-JS 스타일링 방식을 채택하고 있습니다. 이를 통해 컴포넌트 기반으로 모듈화된 스타일링이 가능합니다.
-   **라우팅**: `React Router`를 사용하여 사용자 간 페이지 전환을 관리하며, 보호된 경로(Protected Routes)를 통해 인증된 사용자만 특정 페이지에 접근할 수 있도록 설정하였습니다.
-   **API 통신**: `Axios`를 사용하여 백엔드 서버와 HTTP 요청을 주고받으며, API 요청 인터셉터를 설정하여 인증 토큰을 자동으로 포함하도록 하였습니다.

## 문의

프로젝트 관련 문의는 GitHub를 통해 해주시면 감사하겠습니다.

-   GitHub: [cucumber5252](https://github.com/cucumber5252)
