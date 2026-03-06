declare global {
  interface IModal {
    "user": { id?: number }
    "user-password": { id?: number }
  }
}

export interface IUser {
  id?: number
  first_name: string
  last_name: string
  patronymic?: string | null
  passport?: string | null
  military_number?: string | null
  military_district_id?: number | null
  military_unit_id?: number | null
  military_position_id?: number | null
  military_rank_id?: number | null
  tin?: string | null
  birth_date?: string | null
  phone: string | null
  role_id: number
  login: string
  password?: string
  status: boolean
  created_at?: string
  updated_at?: string
  includes?: any[]
}

export class User implements IUser {
  id!: number
  first_name: string = ""
  last_name: string = ""
  patronymic: string = ""
  passport: string = ""
  military_number: string = ""
  military_district_id!: number
  military_unit_id!: number
  military_position_id!: number
  military_rank_id!: number
  tin: string = ""
  birth_date: string = ""
  phone: string = ""
  role_id!: number
  login: string = ""
  password?: string = ""
  status: boolean = true
}
