import { IEmployee } from "../interfaces/interfaces";

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

export const getAllClients = async ({
  page,
  pageLimit,
}: {
  page: number;
  pageLimit: number;
}) => {
  const response = await fetch(
    `api/clients?type=clients&page=${page}&pageLimit=${pageLimit}`
  );
  const responseJson = await response.json();
  return responseJson;
};
