# 사건 관리 프로그램

## 설치

```bash
npm i
npm run dev
```

## URL

- AppRoutes.tsx 참조

### / (HomePage.tsx)

- /clients로 URL 이동

### /clients (ClientsPage.tsx)

- subNavigationBar.item에 1개 이상 있을 경우, /clients/:clientId로 URL 이동
- 이 때, clientId는 첫 번째 아이템의 PK

### /clients/:clientId (ClientDetailPage.tsx)

- 의뢰인 상세 페이지
- 기본 정보, 사건 정보 탭으로 구성

### /cases (CaesPage.tsx)

- subNavigationBar.item에 1개 이상 있을 경우, /cases/list?client=:clientId로 URL 이동
- 이 때, clientId는 첫 번째 아이템의 PK

### /cases/new (ClientNewPage.tsx)

- 사건 등록 페이지

### /cases/list?client=:clientId (ClientListPage.tsx)

- 사건 리스트 페이지

### /cases/:caseId?client=:clientId (CaseDetailPage.tsx)

- 사건 상세 페이지
- 사건 정보, 상담 정보, 지출 정보, 종결 탭으로 구성

### /employees

- 미구현

### /employees/:employeeId (EmployeeDetailPage.tsx)

- 사원 상세 페이지

### /login (LoginPage.tsx)

- 로그인 페이지

### /join (JoinPage.tsx)

- 회원 가입 페이지

### /error (NotFoundPage.tsx)

- 존재하지 않는 URL에 접근할 때 표시되는 페이지

## 전역 상태

### IsLoginState.tsx

- 로그인한 유무

### Client(Case, Employee)IdState.tsx

- 현재 페이지에 사용할 의뢰인, 사건, 직원의 PK 상태

### Side(Main, Sub)NavigationBarState.tsx

- 사이드 나비게이션 바의 상태

### SubNavigationBarState.tsx

- 서브 나비게이션의 타입

1. client
   - clients/:clientId 에서 사용 및 이동하는 아이템
2. caseClient
   - /cases/list?client=:clientId 에서 사용 및 이동하는 아이템
3. case
   - /cases/:caseId?client=:clientId 에서 사용 및 이동하는 아이템

## 컴포넌트 구조

### 레이아웃

- Header
  - SideNavigationBarDisplayButton
  - Title
  - LogoutButton
- SideNavigationBar
  - SideNavigationBarHeader
    - ClientInformation
    - SideNavigationBarHiddenButton
  - MainNavigation
  - (SubNavigation)
- Main
- (ClientRegisterPopUp)
- (ClientRemovePopUp)
