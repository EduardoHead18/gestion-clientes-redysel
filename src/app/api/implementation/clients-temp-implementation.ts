"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { decodeToken } from "../utils/tools";
import { getCookie } from "../utils/cookies";

interface IGetClients {
  typeParam?: string | null;
  searchParam?: string | null;
  page?: number;
  pageLimit?: number;
}

export async function getClientsTempImplementation(data: IGetClients) {
  const { searchParam, typeParam } = data;
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
  if (typeParam === "clients") {
    const skip = (page - 1) * pageLimit;

    if (
      searchParam === "" ||
      searchParam === undefined ||
      searchParam === null
    ) {
      const clients = await prisma.temporaryClients.findMany({
        skip,
        take: pageLimit,
        where: {
          zone: employeeZone,
        },
      });
      return NextResponse.json({ data: clients }, { status: 200 });
    }
    const clients = await prisma.temporaryClients.findMany({
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

export async function createClientTempImplementation(
  data: Prisma.TemporaryClientsCreateInput
) {
  //getCookie token
  const cookie = await getCookie();

  const decodeTokenFunc = decodeToken(cookie!);
  let employeeZone = "";

  //validate the zone from the token
  if (typeof decodeTokenFunc === "string") {
    console.error("Error decoding token:", decodeTokenFunc);
  } else if ("zone" in decodeTokenFunc) {
    employeeZone = decodeTokenFunc.zone;
  }
  const newClientObject = { ...data, zone: employeeZone };
  const result = await prisma.temporaryClients.create({
    data: newClientObject,
  });
  return NextResponse.json({ data: result }, { status: 201 });
}

export async function getClientTempByIdImplementation(id: number) {
  const result = await prisma.temporaryClients.findUnique({
    where: { id },
  });
  return result;
}

export async function updateClientTempImplementation(
  id: number,
  data: Prisma.TemporaryClientsUpdateInput
) {
  const findClient = await prisma.temporaryClients.findUnique({
    where: { id },
  });
  if (!findClient)
    return NextResponse.json(
      { message: "cliente no encontrado" },
      { status: 404 }
    );

  const result = await prisma.temporaryClients.update({
    where: { id },
    data,
  });
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function deleteClientTempImplementation(id: number) {
  const findClient = await prisma.temporaryClients.findUnique({
    where: { id },
  });
  if (!findClient)
    return NextResponse.json(
      { message: "cliente no encontrado" },
      { status: 404 }
    );

  await prisma.temporaryClients.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Cliente eliminado" }, { status: 200 });
}

export async function getByIdTemporaryClientImp(id: number) {
  const result = await prisma.temporaryClients.findUnique({
    where: { id },
  });

  if (!result)
    return NextResponse.json(
      { message: "Cliente temporal no encontrado" },
      { status: 404 }
    );

  return NextResponse.json({ data: result }, { status: 200 });
}
