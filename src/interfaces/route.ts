interface Route {
  id: number
  link: string
  title: string
  menu?: string
  mainPath: string
  icon: React.ReactElement
  isCollapse: boolean
  submenus: RouteSubmenu[]
}

interface RouteSubmenu {
  id: number
  link: string
  title: string
  icon?: React.ReactElement
  submenus: Submenu[]
}

interface Submenu {
  id: number
  link: string
  title: string
}
