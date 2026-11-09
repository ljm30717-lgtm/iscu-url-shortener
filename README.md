# URL Shortener

Next.js와 PostgreSQL을 활용한 URL 단축 웹 애플리케이션입니다.

## 프로젝트 소개

긴 URL을 짧은 주소로 변환하고, 생성된 단축 주소를 통해 원본 웹사이트로 이동할 수 있는 서비스입니다.

## 주요 기능

- 긴 URL을 짧은 URL로 변환
- 단축 URL 접속 시 원본 주소로 리다이렉트
- 동일한 URL 요청 시 기존 단축 주소 재사용
- 올바르지 않은 URL 입력 검증
- 자기 서비스 도메인 단축 방지
- 관리자 인증 및 관리 페이지

## 기술 스택

- Frontend / Backend: Next.js
- Database: PostgreSQL (Neon)
- Deployment: Vercel

## 프로젝트 구조

- `app/` : 페이지 및 API 라우트
- `lib/` : 데이터베이스 연결 및 주요 기능
- `schema.sql` : 데이터베이스 테이블 구조
- `package.json` : 프로젝트 의존성 및 실행 명령어

## 실행 방법

1. 프로젝트를 다운로드합니다.
2. `npm install`로 의존성을 설치합니다.
3. 환경변수를 설정합니다.
4. `npm run dev`로 개발 서버를 실행합니다.
