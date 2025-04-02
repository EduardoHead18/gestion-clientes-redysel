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
  paymentDate: string
  createdAt?: string;
}

export interface IClients {
  id: number;
  name: string;
  lastName: string;
  ip_address_id: number;
  zone: string;
  contracts: IContracts[];
  payment_date: string;
  payments: IPayments[]
  createdAt: string;
}
