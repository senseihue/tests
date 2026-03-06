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

  static fromRequest(dto: IRole) {
    const role = new Role()
    role.id = dto.id
    role.key = dto.key
    role.users_count = dto.users_count
    role.name = dto.name
    role.level = dto.level
    role.permissions = dto.includes.permissions
    role.created_at = dto.created_at
    return role
  }
}
