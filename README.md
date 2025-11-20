# nova-admin

Next.js 15와 React 생태계를 학습하기 위해 만드는 **새 개발 흐름(Nova)을 관리하는 Admin**입니다.
실무에서 자주 쓰이는 기술들을 한 번에 경험해보는 것을 목표로 합니다.

> 🎯 목표: Next.js + TypeScript + 상태관리 + 폼/검증 + UI 라이브러리까지  
> 한 번에 익힐 수 있는 개인 학습용 Admin 사이트 만들기

---

## 🧱 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: Zustand
- **Server State**: React Query (TanStack Query)
- **Form**: React Hook Form + Zod
- **Code Quality**: ESLint + Prettier
- **Deployment**: Vercel (예정)

---

## ✨ Features (계획)

- [ ] 로그인 / 인증 레이아웃
- [ ] 공통 레이아웃 (GNB / Sidebar / Footer)
- [ ] 대시보드 메인 화면
- [ ] 사용자 관리 테이블 + CRUD
- [ ] 폼 예제 (React Hook Form + Zod)
- [ ] Zustand + React Query 연동
- [ ] 다크 모드 / 테마 (shadcn/ui 활용)

---

## 📂 Folder Structure (초기 + 라우팅 포함)

```bash
.
├── app/
│   ├── (auth)/                   # 로그인 전
│   │   └── login/                # 로그인 페이지
│   │
│   ├── (protected)/              # 로그인 후
│   │   ├── dashboard/            # 보호된 대시보드 페이지
│   │   └── users/                # 사용자 관리 페이지
│   │
│   └── layout.tsx                # 전체 레이아웃
│
├── features/                     # 도메인 단위 기능 (예: auth, users...)
│
├── shared/                       # 공통 유틸, hooks, constants 등
│
├── components/
│   └── ui/                       # shadcn/ui 커스텀 컴포넌트
│
├── lib/                          # 비즈니스 로직, API, helpers
│
├── public/                       # 정적 파일
│
├── .gitignore
├── .prettierrc
├── components.json
├── eslint.config.mjs
├── next.config.ts
├── package.json
└── tsconfig.json
```

---
## 🚀 Getting Started
1.의존성 설치
```bash
npm install
```
2. 개발 서버 실행
```bash
npm run dev
# http://localhost:3000 에서 확인
```

---
## 📝 Commit Convention

이 프로젝트는 **Conventional Commits** 규칙을 기반으로 합니다.

| 타입(Type) | 의미(Description) |
|-----------|-------------------|
| **feat** | 새로운 기능 추가 |
| **fix** | 버그 수정 |
| **docs** | 문서 수정 (README 등) |
| **style** | 코드 포맷, 스타일 변경 (기능 변경 없음) |
| **refactor** | 리팩토링 (로직 변경, 성능향상, 구조 개선) |
| **test** | 테스트 코드 추가/수정 |
| **chore** | 빌드/설정/패키지 작업 (기능 변경 없음) |
| **perf** | 성능 최적화 |
| **ci** | CI/CD 설정 변경 |

### 📌 커밋 메시지 작성 예시

```bash
feat: 로그인 페이지 UI 추가
fix: 잘못된 토큰 처리 버그 수정
docs: README에 Folder Structure 추가
style: 코드 포맷팅 적용
refactor: userStore Zustand 구조 개선
chore: prettier 설정 업데이트
```

## 🗒️ Notes
	• 이 프로젝트는 학습용입니다.
	• Next.js 15, shadcn/ui, React Query, Zustand 등을 실험적으로 사용하면서 폴더 구조와 베스트 프랙티스를 정리해 나갈 예정입니다.
    • 큰 기능이 완성될 때마다 README를 조금씩 업데이트합니다.