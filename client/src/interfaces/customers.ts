
export interface IDeleteCustomer {
    response: string;
}

export interface ICreateCustomer extends IFormCreateCustomer { }

export interface IUpdateCustomer extends IFormUpdateCustomer { }

export interface IFormCreateCustomer {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    address: string;
    zipcode?: string;
}

export interface IFormUpdateCustomer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    cpf: string;
    address: string;
}

export interface ICustomer {
    name: string;
    cpf: string;
    phone: string;
    address: string;
    email: string;
    _id: string;
}