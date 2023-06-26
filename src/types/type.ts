export type RegisterT = {
  first_name: string;
  last_name: string;
  phone_number: number;
  email: string;
  country: string;
  state: string;
  city: string;
  password: string;
};

export type LoginT = {
  email: string;
  password: string;
};

export type UserT = {};
