declare global {
  interface IModal {
    log: { id?: number };
  }
}

export interface IActivityLog {
  id?: number;
  user_id?: number | null;
  description: string;
  subject_id: number;
  subject_type: string;
  causer_id: number;
  causer_type: string;
  properties: Record<string, any>;
  created_at?: string;
  updated_at?: string;
  includes?: any;
}

export interface ISignInLog {
  id?: number;
  authenticatable: Record<string, any>;
  ip_address: string;
  user_agent: string;
  login_at: string;
  login_successful: boolean;
}
