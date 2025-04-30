"use server";
import { NextResponse } from "next/server";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { decodeToken } from "../utils/tools";
import { getCookie } from "../utils/cookies";

interface IGetClients {
  typeParam?: string | null;
  searchParam?: string | null;
  page?: number;
  pageLimit?: number;
  payDay?: number;
}
export async function getClientsImplementation(data: IGetClients) {
  const { searchParam, typeParam, payDay } = data;
  // Check if the token is valid
  const cookieToken = await getCookie();
  const responseDecodeToken = decodeToken(cookieToken!);
  let employeeZone = "";
  //validate the zone from the token
  if (typeof responseDecodeToken === "string") {
    console.error("Error decoding token:", responseDecodeToken);
  } else if ("zone" in responseDecodeToken) {
    employeeZone = responseDecodeToken.zone;
  }
  if (!responseDecodeToken || typeof responseDecodeToken !== "object") {
    return NextResponse.json({ error: "Token no válido" }, { status: 401 });
  }
  const page = data.page ?? 1;
  const pageLimit = data.pageLimit ?? 10;

  // validate date
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59
  );

  let dateFilter;
  // validate day of payment
  if (payDay === 15) {
    //day 15
    dateFilter = {
      gte: startOfMonth,
      lte: new Date(now.getFullYear(), now.getMonth(), 15, 23, 59, 59),
    };
  } else if (payDay === endOfMonth.getDate()) {
    //last day of month
    dateFilter = {
      gte: new Date(now.getFullYear(), now.getMonth(), 16),
      lte: endOfMonth,
    };
  } else if (payDay === 0) {
    //all days
    dateFilter = undefined;
  }

  if (typeParam === "clients") {
    //search clientes without filter
    const skip = (page - 1) * pageLimit;
    if (
      searchParam === "" ||
      searchParam === undefined ||
      searchParam === null
    ) {
      const clients = await prisma.clients.findMany({
        skip,
        take: pageLimit,
        where: {
          zone: employeeZone,
          payment_date: dateFilter,
        },

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
          { zone: employeeZone, payment_date: dateFilter },
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
        { data: "No se encontro registros" },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: clients }, { status: 200 });
  }
  return NextResponse.json("error", { status: 400 });
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
  const result = await prisma.clients.create({ data });
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
