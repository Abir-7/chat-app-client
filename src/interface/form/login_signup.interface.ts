export interface ILoginUser {
  email: string;
  password: string;
}

export interface ISignupUser {
  email: string;
  image: FileList | null;
  name: string;
  contactNo: string;
  address: string;
  password: string;
}
