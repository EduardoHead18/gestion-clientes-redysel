import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await prisma.ip_address.findMany({
      where: {
        status: true,
      },
    });
    return NextResponse.json({ data: response }, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Error al obtener las direcciones IP" },
      { status: 500 }
    );
  }
}
