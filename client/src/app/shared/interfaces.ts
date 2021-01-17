export interface User {
  email: string;
  password: string;
}

export interface ICategory {
  name: string;
  _id?: string;
  imageSrc?: string;
  user?: string;
}
