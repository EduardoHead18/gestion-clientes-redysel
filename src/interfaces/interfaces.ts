export interface IEmployee {
  name: string;
  lastName: string;
  role: string;
  email: string;
  password: string;
  zone: string;
}

export interface IContracts {
  service: number;
  client_id: number;
  createdAt?: string;
}

export interface IPayments {
  id: number;
  clientsId: IClients[];
  employeeId: IEmployee[];
  paymentDate: string;
  createdAt?: string;
}

export interface ITemporaryClient {
  id: number;
  name: string;
  last_name: string;
  phone_number: string;
  zone: string;
  payment_date: string;
}

export interface IClients {
  id?: number;
  name: string;
  last_name: string;
  phone_number?: string;
  ip_address_id: number;
  zone: string;
  contracts: IContracts[];
  active: boolean;
  payment_date: string;
  payments: IPayments[];
  createdAt: string;
}
