import { IClients, IEmployee } from "../interfaces/interfaces";

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

interface IClientsParams {
  page: number;
  pageLimit: number;
  search: string;
  token: string;
}

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

export const deleteClient = async (id: number) => {
  const response = await fetch(`/api/clients?id=${id}`, {
    method: "DELETE",
  });
  const responseJson = await response.json();
  return { status: response.status, data: responseJson };
};
