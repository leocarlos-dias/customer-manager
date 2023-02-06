import { JwtPayload } from "jwt-decode";
import { ICustomer, IFormCreateCustomer, IFormUpdateCustomer } from "./customers";

export interface IUserContext {
    user: IUser | null;
    userLogin: (formValue: IFormLogin) => Promise<void>;
    userLogout: () => void;

    customers: ICustomer[] | null;

    createCustomer: (
        formValues: IFormCreateCustomer
    ) => Promise<boolean | undefined>;
    updateCustomer: (
        formValues: IFormUpdateCustomer
    ) => Promise<boolean | undefined>;
    deleteCustomer: (id: string) => Promise<boolean | undefined>;

    waitRequest: boolean;
    setWaitRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IUser {
    id: string;
    username: string;
}

export interface IRequestUser extends IUser { }

export interface IJwtDecode extends IUser, JwtPayload { }

export interface IFormLogin {
    username: string;
    password: string;
    remember: boolean;
}
