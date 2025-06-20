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
  payment_date: string;
  createdAt?: string;
}

export interface ITemporaryClient {
  id: number;
  name: string;
  last_name: string;
  phone_number: string;
  zone: string;
  payment_date: string;
  service?: number;
}

export interface IClients {
  id?: number;
  name: string;
  last_name: string;
  phone_number?: string;
  ip_address: {
    connect: {
      id: number;
    };
  };
  zone: string;
  service: number;
  contracts: IContracts[];
  active: boolean;
  payment_date: string;
  payments: IPayments[];
  createdAt: string;
}

export interface IPadress {
  id?: number;
  ip_address: string;
  clients?: IClients;
  createdAt?: string;
}
