export interface MenuItem {
  id: number
  name: string
  path: string | null
  children?: MenuItem[]
}
