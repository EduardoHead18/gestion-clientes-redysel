"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { decodeToken } from "../utils/tools";

interface IGetClients {
  typeParam?: string | null;
  searchParam?: string | null;
  page?: number;
  pageLimit?: number;
  tokenHeader?: string | null;
}

export async function getClientsImplementation(data: IGetClients) {
  const { searchParam, typeParam, tokenHeader } = data;
  // Check if the token is valid
  const responseDecodeToken = decodeToken(tokenHeader!);
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
      const clients = await prisma.clients.findMany({
        skip,
        take: pageLimit,
        include: {
          contracts: true,
          payments: true,
        },
      });

      return NextResponse.json({ data: clients }, { status: 200 });
    }

    const clients = await prisma.clients.findMany({
      skip,
      take: pageLimit,
      where: {
        OR: [
          { name: { contains: searchParam || undefined } },
          { last_name: { contains: searchParam || undefined } },
        ],
      },
      include: {
        contracts: true,
        payments: true,
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
  console.log(data)
  const result = await prisma.clients.create({ data });
  return NextResponse.json({ data: result }, { status: 201 });
}

export async function deleteClientImplementation(id: number) {
  if (!id) {
    return NextResponse.json(
      { error: "Client ID is required" },
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

export const updateClient = async (request: NextRequest) => {
  try {
    const { id, data } = await request.json();
    if (!id || !data) {
      return NextResponse.json(
        { error: "Client ID and data are required" },
        { status: 400 }
      );
    }

    const updatedClient = await prisma.clients.update({
      where: id,
      data,
    });
    if (!updatedClient) {
      return NextResponse.json(
        { error: "Client not found or update failed" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Client updated successfully", client: updatedClient },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
};
