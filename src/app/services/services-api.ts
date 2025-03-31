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
  const response = await fetch("/api/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const responseJson = await response.json();
  return { status: response.status, data: responseJson };
};
