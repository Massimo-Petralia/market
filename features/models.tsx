export type User = {
  id?: number | string;
  name: string;
  email: string;
  password: string;
  address?: Address;
  avatar?: string;
}|undefined

interface Address {
  country: string;
  state: string;
  street: string;
  zipCode: string;
  phone: string;
}

export interface UserAuth {
  accessToken: string;
  user: User 
}