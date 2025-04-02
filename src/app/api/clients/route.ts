"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
export async function GET() {
  try {
    const clients = await prisma.clients.findMany({
      include:{
        contracts: true,
        payments:true
      }
    });
    return NextResponse.json(clients);
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
