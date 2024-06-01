export type User = {
  id?: number;
  name: string;
  email: string;
  password: string;
  address?: Address;
  avatar?: string;
}

interface Address {
  country: string;
  state: string;
  street: string;
  zipCode: string;
  phone: string;
}

export interface UserAuth {
  accessToken: string;
  user?: User 
}

export interface Product  {
  id?: number;
  userId?: number;
  accessToken?: string,
  name: string;
  description: string;
  price: string;
  images: string[]
}
