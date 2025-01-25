// Customer Interface
export interface ICustomer {
  _id: string;
  email: string;
  name: string;
  contactNo: number;
  address: string;
  user: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

// User Interface
export interface IUser {
  _id: string;
  email: string;
  role: "USER" | "ADMIN";
  isBlocked: boolean;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  customer?: ICustomer;
}
