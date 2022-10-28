export interface UserInterface {
  first_name: string;
  id: number;
  is_active?: true;
  last_name: string;
  phone: null | string;
  role?: number;
  token?: string;
  user_name?: string | null;
  email?: string;
}
