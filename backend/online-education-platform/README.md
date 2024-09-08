# KWEB Online Education Platform - 백엔드

## 프로젝트 소개

KWEB Online Education Platform의 백엔드는 NestJS를 사용하여 구축된 API 서버입니다. 이 서버는 사용자의 인증, 강의 관리, 게시물 작성 및 관리를 위한 기능을 제공하며, 고려대학교의 Blackboard Learn과 유사한 온라인 교육 플랫폼을 구축하는 데 중점을 두고 있습니다.

## 기술 스택

- **백엔드**: Node.js (NestJS)
- **데이터베이스**: PostgreSQL
- **ORM**: TypeORM
- **인증**: JWT (JSON Web Token)

## 설치 및 실행 방법

### 1. 클론 및 의존성 설치

먼저, GitHub 레포지토리를 클론한 후 백엔드 디렉토리로 이동하여 필요한 의존성을 설치합니다.

```bash
git clone https://github.com/cucumber5252/kweb_online-education-platform.git
cd Kweb/backend/online-education-platform
npm install
```

### 2. 데이터베이스 설정

PostgreSQL을 설치한 후, 새로운 데이터베이스와 사용자를 생성합니다:

PostgreSQL에 접속합니다:

```bash
psql -U postgres
```

다음 명령어를 통해 데이터베이스와 사용자를 생성합니다:

```sql
CREATE DATABASE online_education;
CREATE USER kweb WITH ENCRYPTED PASSWORD 'kweb';
GRANT ALL PRIVILEGES ON DATABASE online_education TO kweb;
```

### 3. 환경 변수 설정

`backend/online-education-platform/` 디렉토리에 `.env` 파일을 생성하고 다음 내용을 입력합니다:

```plaintext
DB_USERNAME=kweb
DB_PASSWORD=kweb
JWT_SECRET=kweb1234567890
```

### 4. 초기 데이터 설정

초기 데이터는 `data/initial_data.json` 파일을 통해 자동으로 설정됩니다. 서버가 시작될 때, 해당 파일의 데이터가 로드되어 데이터베이스에 저장됩니다.

`data/initial_data.json` 파일은 다음과 같은 정보를 포함하고 있습니다:

- **사용자 정보**: 교수자와 학생 계정 정보
- **강의 정보**: 다양한 강의와 그에 대한 정보
- **게시물 정보**: 각 강의에 대한 초기 게시물 데이터

### 5. 서버 실행

백엔드 서버를 실행하여 데이터베이스와 애플리케이션을 초기화합니다:

```bash
npm run start
```

서버는 `http://localhost:3000`에서 실행됩니다. 서버가 시작되면 `data/initial_data.json`에 정의된 초기 데이터가 자동으로 데이터베이스에 삽입됩니다.

## 데이터베이스 초기화 및 테스트 데이터

애플리케이션이 실행되면, TypeORM이 자동으로 데이터베이스 스키마를 생성하고 `initial_data.json`에 정의된 초기 데이터가 삽입됩니다. 이를 통해 교수자 및 학생 계정이 미리 설정되어, 애플리케이션의 모든 기능을 손쉽게 테스트할 수 있습니다.

### 초기 로그인 정보

- **교수자 계정** (2명)

  - **professor1**:
    - 아이디(username): `professor1`
    - 비밀번호(password): `password`
  - **professor2**:
    - 아이디(username): `professor2`
    - 비밀번호(password): `password`

- **학생 계정** (5명)
  - **student1**:
    - 아이디(username): `student1`
    - 비밀번호(password): `password`
  - **student2**:
    - 아이디(username): `student2`
    - 비밀번호(password): `password`
  - **student3**:
    - 아이디(username): `student3`
    - 비밀번호(password): `password`
  - **student4**:
    - 아이디(username): `student4`
    - 비밀번호(password): `password`
  - **student5**:
    - 아이디(username): `student5`
    - 비밀번호(password): `password`

### 주요 기능

- **사용자 인증**: 회원 가입, 로그인, JWT 기반 인증
- **강의 관리**: 강의 등록, 수강 신청, 게시물 작성 및 관리
- **역할별 기능**:
  - **교수자**: 강의 등록, 게시물 작성, 수강 학생 관리
  - **학생**: 강의 수강 신청, 게시물 열람, 최신 업데이트 확인

## 문의

프로젝트 관련 문의는 GitHub를 통해 해주시면 감사하겠습니다.

- GitHub: [cucumber5252](https://github.com/cucumber5252)
