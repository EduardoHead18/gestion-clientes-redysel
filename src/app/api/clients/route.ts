"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
import {
  createClient,
  deleteClientImplement,
  getClientsImplementation,
} from "../implementation/clients-implementation";
export async function GET(req: NextRequest) {
  try {
    //get all params for the filter and pagination
    const { searchParams } = new URL(req.url);
    const dataObjectTransfer = {
      typeParam: searchParams.get("type"),
      searchParam: searchParams.get("search"),
      page: parseInt(searchParams.get("page") || "1", 10),
      pageLimit: parseInt(searchParams.get("pageLimit") || "10", 10),
    };
    const result = await getClientsImplementation(dataObjectTransfer);
    return result;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const result = await createClient(data);
    return NextResponse.json({ data: result }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParam = request.nextUrl.searchParams;
    const id = parseInt(searchParam.get("id") || "0", 10);
    console.log(id);
    const result = await deleteClientImplement(id);
    return result;
  } catch (error) {
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
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
};
