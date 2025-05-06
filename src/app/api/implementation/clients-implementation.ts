"use server";
import { NextResponse } from "next/server";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { decodeToken, randomCodeUuid } from "../utils/tools";
import { getCookie } from "../utils/cookies";

interface IGetClients {
  typeParam?: string;
  searchParam?: string;
  page?: number;
  pageLimit?: number;
  payDay?: number;
}

// type ClientResponse = NextResponse ;

interface IShowClientsParams {
  typeParam?: string | undefined;
  searchParam?: string | undefined;
  employeeZone: string;
  page: number;
  pageLimit: number;
  payDay?: number;
}
export async function getClientsImplementation(data: IGetClients) {
  const { searchParam, typeParam, payDay } = data;
  // Check if the token is valid
  const cookieToken = await getCookie();
  const responseDecodeToken = decodeToken(cookieToken!);

  let employeeZone = "";
  let userRole = "";
  //validate the zone from the token and get role from the user
  if (typeof responseDecodeToken === "string") {
    console.error("Error decoding token:", responseDecodeToken);
  } else if ("zone" in responseDecodeToken) {
    employeeZone = responseDecodeToken.zone;
    userRole = responseDecodeToken.role;
  }

  if (!responseDecodeToken || typeof responseDecodeToken !== "object") {
    return NextResponse.json({ error: "Token no válido" }, { status: 401 });
  }
  const page = data.page ?? 1;
  const pageLimit = data.pageLimit ?? 10;

  //This feature shows all the customers that exist in the different regions
  if (userRole === "admi") {
    const clients = await prisma.clients.findMany({
      skip: (page - 1) * pageLimit,
      take: pageLimit,
      include: {
        contracts: true,
        payments: true,
        ip_address: true,
      },
    });

    if (clients.length === 0) {
      return NextResponse.json(
        { data: "No se encontraron registros" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: clients }, { status: 200 });
  }

  return showClients({
    typeParam,
    searchParam,
    employeeZone,
    page,
    pageLimit,
    payDay,
  });
}

export async function getClientByIdImplementation(id: number) {
  const result = await prisma.clients.findUnique({
    where: { id },
  });
  if (!result)
    return NextResponse.json(
      { message: "Cliente no encontrado" },
      { status: 404 }
    );
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function createClientImplementation(
  data: Prisma.ClientsCreateInput
) {
  //generate uuid random
  const uuid = randomCodeUuid();
  const newDataObject = { ...data, uuid };
  const result = await prisma.clients.create({ data: newDataObject });
  return NextResponse.json({ data: result }, { status: 201 });
}

export async function deleteClientImplementation(id: number) {
  if (!id) {
    return NextResponse.json(
      { message: "Client ID is required" },
      { status: 400 }
    );
  }

  const result = await prisma.clients.findUnique({
    where: { id },
  });

  if (!result) {
    return NextResponse.json(
      { error: "Cliente no encontrado" },
      { status: 404 }
    );
  }

  await prisma.clients.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Cliente eliminado" }, { status: 200 });
}

export const updateClient = async (
  id: number,
  data: Prisma.ClientsUpdateInput
) => {
  try {
    if (!id || !data) {
      return NextResponse.json(
        { error: "Client ID and data are required" },
        { status: 400 }
      );
    }

    const findClient = await prisma.clients.findUnique({
      where: { id },
    });
    if (!findClient)
      return NextResponse.json(
        { message: "Cliente no encontrado" },
        { status: 404 }
      );

    const updatedClient = await prisma.clients.update({
      where: { id },
      data,
    });

    return NextResponse.json(
      { message: "Cliente actualizado", client: updatedClient },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Falló al actualizar el cliente" },
      { status: 500 }
    );
  }
};
// This function shows customers depending on which zone they are in.
const showClients = async ({
  typeParam,
  searchParam,
  employeeZone,
  page,
  pageLimit,
  payDay,
}: IShowClientsParams) => {
  if (typeParam === "clients") {
    const skip = (page - 1) * pageLimit;

    // Basis of the WHERE condition for all cases
    const whereCondition: Prisma.ClientsWhereInput = {
      zone: employeeZone,
    };

    // Apply payday filters
    if (payDay === 15 || payDay === 30) {
      const allClients = await prisma.clients.findMany({
        where: {
          zone: employeeZone,
        },
        include: {
          contracts: true,
          payments: true,
          ip_address: true,
        },
      });

      // Filter by payday
      let filteredClients = allClients;
      if (payDay === 15) {
        filteredClients = allClients.filter((client) => {
          const paymentDay = client.payment_date.getDate();
          return paymentDay <= 15;
        });
      } else if (payDay === 30) {
        filteredClients = allClients.filter((client) => {
          const paymentDay = client.payment_date.getDate();
          return paymentDay >= 16;
        });
      }

      // Apply search filter if it exists
      if (searchParam && searchParam !== "") {
        filteredClients = filteredClients.filter((client) => {
          const nameMatch = client.name
            .toLowerCase()
            .includes(searchParam.toLowerCase());
          const lastNameMatch = client.last_name
            .toLowerCase()
            .includes(searchParam.toLowerCase());
          return nameMatch || lastNameMatch;
        });
      }

      // Apply memory paging
      const paginatedClients = filteredClients.slice(skip, skip + pageLimit);

      if (paginatedClients.length === 0) {
        return NextResponse.json(
          { data: "No se encontraron registros" },
          { status: 404 }
        );
      }
      return NextResponse.json({ data: paginatedClients }, { status: 200 });
    } else {
      // If payDay is 0 or does not exist, normal query using Prisma
      if (
        searchParam === "" ||
        searchParam === undefined ||
        searchParam === null
      ) {
        const clients = await prisma.clients.findMany({
          skip,
          take: pageLimit,
          where: whereCondition,
          include: {
            contracts: true,
            payments: true,
            ip_address: true,
          },
        });
        return NextResponse.json({ data: clients }, { status: 200 });
      }

      //search clients with filter
      const clients = await prisma.clients.findMany({
        skip,
        take: pageLimit,
        where: {
          AND: [
            { zone: employeeZone },
            {
              OR: [
                { name: { contains: searchParam || undefined } },
                { last_name: { contains: searchParam || undefined } },
              ],
            },
          ],
        },
        include: {
          contracts: true,
          payments: true,
          ip_address: true,
        },
      });

      if (clients.length === 0) {
        return NextResponse.json(
          { data: "No se encontraron registros" },
          { status: 404 }
        );
      }
      return NextResponse.json({ data: clients }, { status: 200 });
    }
  }
};
