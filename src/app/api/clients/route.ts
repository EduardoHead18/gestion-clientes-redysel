"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
import {
  createClientImplementation,
  deleteClientImplementation,
  getClientsImplementation,
} from "../implementation/clients-implementation";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const tokenHeader = req.headers.get("authorization");

    //get all params for the filter and pagination
    const dataObjectTransfer = {
      typeParam: searchParams.get("type"),
      searchParam: searchParams.get("search"),
      page: parseInt(searchParams.get("page") || "1", 10),
      pageLimit: parseInt(searchParams.get("pageLimit") || "10", 10),
      tokenHeader: tokenHeader,
      payDay: parseInt(searchParams.get("payDay") || "0", 10),
    };
    const result = await getClientsImplementation(dataObjectTransfer);
    return result;
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createClientImplementation(data);
    return result;
  } catch {
    return NextResponse.json(
      { message: "Falló al crear un cliente " },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParam = request.nextUrl.searchParams;
    const id = parseInt(searchParam.get("id") || "0", 10);
    const result = await deleteClientImplementation(id);
    return result;
  } catch {
    return NextResponse.json(
      { error: "Falló al eliminar el cliente" },
      { status: 500 }
    );
  }
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
