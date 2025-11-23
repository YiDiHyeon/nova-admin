export interface MenuItem {
  id: number // 고유 PK
  code?: number // 선택 (100, 200 등 의미값) – 없어도 OK
  name: string // 화면에 보이는 이름 (한글)
  slug: string // 입력하는 URL 조각
  path: string // 최종 URL = parent + slug 조합 (자동 계산)
  parentId: number | null // null = 대메뉴
  order: number // 동일 depth 내에서 정렬
  visible: boolean // 기본 true
  roles: string[] // 권한 배열
}
