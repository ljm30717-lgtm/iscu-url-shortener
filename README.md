# 사이버대학교 URL Shortener 과제

교수님 공개 채점표 T01~T11 조건에 맞추어 작성한 Next.js + Neon Postgres 프로젝트입니다.

## 1. Neon 데이터베이스 준비
1. https://neon.tech 에서 계정 생성 후 프로젝트 생성
2. SQL Editor에서 `schema.sql` 내용 실행
3. Dashboard → Connect → Pooled connection string 복사

## 2. GitHub
1. https://github.com 에 로그인하여 새 저장소 만들기 (예: `iscu-url-shortener`)
2. 압축파일을 풀고 **압축파일 자체가 아닌 프로젝트 내부 파일과 폴더**를 저장소에 업로드
3. `.env.local`, 실제 비밀번호, DB 접속 문자열은 업로드하지 마세요.

## 3. Vercel 배포
1. https://vercel.com 접속 → Add New → Project → GitHub 저장소 Import
2. Framework Preset: Next.js, Root Directory: `./`
3. Settings → Environment Variables 에 다음 2개 등록:
   - `DATABASE_URL`: Neon의 pooled connection string
   - `ADMIN_PASSWORD`: 본인이 정한 길고 안전한 비밀번호
4. Production 환경을 포함하도록 지정한 뒤 Deploy / Redeploy.
5. Deploy가 완료되면 `https://프로젝트명.vercel.app` 같은 Production 주소 확인

## 4. 제출 전 테스트
공식 검사 파일: https://github.com/alifewellspent/iscu_cloud_class/blob/main/assignment/iscu_url_shortener_check.py
Python 3.10+ 설치 후, 검사 파일이 들어 있는 폴더에서:
```
python -m pip install requests
python iscu_url_shortener_check.py --url https://프로젝트명.vercel.app
```
11개가 모두 PASS인지 확인하세요. 만약 실패하면 수정하고 재배포하세요.

## 5. 학교 제출
공지에 나온 Google Form에 **본인 Vercel Production URL**을 학번과 함께 제출하세요.
배포 및 제출이 끝난 상태는 아직 아닙니다. GitHub/Neon/Vercel 로그인 및 작업은 계정 소유자가 진행해야 합니다.

## 구현 내용
- 6자리 영숫자 shortCode, 중복 URL 동일 코드
- 주소 누락/형식 오류 HTTP 400
- Neon DB에 영구 저장, 307 이동 및 no-store
- 미등록 코드 404
- `/admin`과 `/api/stats` Basic 인증
- 자기 서비스 도메인 차단, 타 Vercel 도메인은 허용

## 주의
- 교내 수업 과제로 만든 예제입니다. 인터넷 공개 서비스를 운영한다면 Rate Limiting, 악성 URL 차단, 보안 정책을 추가하세요.
- 프로젝트 설정에서 Vercel Deployment Protection이 켜져 있다면 채점기의 공개 HTTP 요청이 막히므로 공개 접근 상태인지 확인하세요.
- 기존 실습에서 `urls` 테이블을 만든 상태라면 새 프로젝트/새 Neon DB를 사용하세요. 기존 표의 컬럼/제약이 다를 수 있습니다.
