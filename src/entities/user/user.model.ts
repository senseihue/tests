declare global {
  interface IModal {
    user: { id?: number };
    "user-password": { id?: number };
  }
}

export interface IUser {
  id?: number;
  first_name: string;
  last_name: string;
  patronymic?: string | null;
  passport?: string | null;
  tin?: string | null;
  birth_date?: string | null;
  phone: string | null;
  role_id: number;
  login: string;
  password?: string;
  status: boolean;
  created_at?: string;
  updated_at?: string;
  includes?: any[];
}

export class User implements IUser {
  id!: number;
  first_name: string = "";
  last_name: string = "";
  patronymic: string | null = null;
  passport: string | null = null;
  tin: string | null = null;
  birth_date: string | null = null;
  phone: string | null = null;
  role_id: number = 0;
  login: string = "";
  password?: string = "";
  status: boolean = true;
}
