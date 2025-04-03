"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
import { Prisma } from "@prisma/client";

interface IGetClients {
  typeParam?: string | null;
  searchParam?: string | null;
  page?: number;
  pageLimit?: number;
}

export async function getClientsImplementation(data: IGetClients) {
  const { searchParam, typeParam } = data;
  const page = data.page ?? 1;
  const pageLimit = data.pageLimit ?? 10;

  if (searchParam) {
    return await searchClient(searchParam);
  }

  if (typeParam === "clients") {
    const skip = (page - 1) * pageLimit;

    const clients = await prisma.clients.findMany({
      skip,
      take: pageLimit,
      include: {
        contracts: true,
        payments: true,
      },
    });

    return { data: clients };
  }

  return { error: "Invalid request parameters" };
}

export async function createClient(data: Prisma.ClientsCreateInput) {
  try {
    const client = await prisma.clients.create({ data });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 400 }
    );
  }
}

export async function deleteClientImplement(id: number) {
  if (!id) {
    return NextResponse.json(
      { error: "Client ID is required" },
      { status: 400 }
    );
  }

  const result = await prisma.clients.findUnique({
    where: { id },
  });
  console.log(result);

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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
};

export async function searchClient(searchParam: string) {
  try {
    const clientsFind = await prisma.clients.findMany({
      where: {
        name: {
          contains: searchParam,
        },
        last_name: {
          contains: searchParam,
        },
      },
      include: {
        contracts: true,
        payments: true,
      },
    });

    if (clientsFind.length == 0) {
      return NextResponse.json(
        { message: "No se encontraron resultados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: clientsFind,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}
