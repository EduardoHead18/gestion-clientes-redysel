"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const typeParam = searchParams.get("type");
    const searchParam = searchParams.get("search");

    if (typeParam === "clients") {
      const page = parseInt(searchParams.get("page") || "1", 10);
      const pageLimit = parseInt(searchParams.get("pageLimit") || "10", 10);

      const skip = (page - 1) * pageLimit;

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

    if (searchParam) {
      const clients = await searchClient(searchParam);
      return clients;
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const client = await prisma.clients.create({ data: body });
    return NextResponse.json(client, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create client" },
      { status: 400 }
    );
  }
}

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
