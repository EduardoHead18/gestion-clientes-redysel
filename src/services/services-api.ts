import {
  IClients,
  IEmployee,
  IPadress,
  ITemporaryClient,
} from "../interfaces/interfaces";

//small interfaces
interface IClientsParams {
  page: number;
  pageLimit: number;
  search: string;
  token: string;
}

//AUTH API
export const loginAuth = async (body: object) => {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseJson = await response.json();
  return { status: response.status, data: responseJson };
};

//EMPLOYEES API
export const createEmployeeApi = async (body: IEmployee) => {
  const response = await fetch("/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseJson = await response.json();
  return { status: response.status, data: responseJson };
};

//CLIENTS API
export const getAllClients = async ({
  page,
  pageLimit,
  search,
  token,
}: IClientsParams) => {
  const response = await fetch(
    `api/clients?type=clients&page=${page}&pageLimit=${pageLimit}&search=${search}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const responseJson: { data: IClients } = await response.json();
  return responseJson.data;
};

export const createClient = async (data: IClients) => {
  const response = await fetch("/api/clients", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const respondeJson = await response.json();
  return { status: response.status, data: respondeJson };
};

export const deleteClient = async (id: number) => {
  const response = await fetch(`/api/clients?id=${id}`, {
    method: "DELETE",
  });
  const responseJson = await response.json();
  return { status: response.status, data: responseJson };
};

//TEMPORARY-CLIENTS API
export const getAllTemporaryClients = async ({
  page,
  pageLimit,
  search,
  token,
}: IClientsParams) => {
  const response = await fetch(
    `api/temporary-clients?type=clients&page=${page}&pageLimit=${pageLimit}&search=${search}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  const responseJson = await response.json();
  return { status: response.status, data: responseJson.data };
};

export const createTemporaryClient = async (data: ITemporaryClient) => {
  const response = await fetch("/api/temporary-clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();
  return { status: response.status, data: responseJson.data };
};

export const getByIdTemporaryClient = async (id: number) => {
  const response = await fetch(`/api/temporary-clients/${id}`);
  const responseJson = await response.json();
  return responseJson.data;
};

export const deleteTemporaryClient = async (id: number) => {
  const response = await fetch(`/api/temporary-clients/${id}`, {
    method: "DELETE",
  });
  const respondeJson = await response.json();
  return respondeJson;
};

// IP-ADDRESS API
export const getAllIpAdress = async () => {
  const response = await fetch("/api/ip-address");
  const responseJson = await response.json();
  return { status: response.status, data: responseJson.data };
};

export const createIpAddress = async (data: IPadress) => {
  try {
    const response = await fetch("/api/ip-address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    return { status: response.status, data: responseJson };
  } catch (error) {
    throw error;
  }
};

export const deleteIpAdressService = async (id: number) => {
  const response = await fetch(`/api/ip-address/${id}`, {
    method: "DELETE",
  });
  const responseJson = await response.json();
  return responseJson;
};
