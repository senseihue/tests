declare global {
  interface IModal {
    role: { id?: number }
  }

  interface IRole {
    id: number
    key: string
    users_count: number
    name: any
    level: string | null
    permissions: number[]
    created_at: string
    includes: any[]
  }
}

export class Role {
  id!: number
  key: string = ""
  users_count: number = 0
  name: { uz: string; ru: string; uzc: string } = { uz: "", ru: "", uzc: "" }
  level: string | null = null
  permissions: number[] = []
  created_at: string = ""
  includes: any[] = []
}
