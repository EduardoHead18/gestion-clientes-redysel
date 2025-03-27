"use server";
import { NextResponse } from "next/server";
import prisma from '@lib/prisma';
export async function GET() {
    try {
        const clients = await prisma.clients.findMany(); // Cambia "client" si tu modelo tiene otro nombre
        return NextResponse.json(clients);
      } catch (error) {
        console.error("Error fetching clients:", error);
        return NextResponse.json({ error: "Failed to fetch clients" }, { status: 500 });
      }
}
