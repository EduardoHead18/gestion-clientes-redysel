"use server";

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({ message: "Holaa" });
}

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const findEnployee = await prisma.employee.findFirst({
      where: {
        email: email,
        password: password,
      },
    });
    if (!findEnployee)
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    return NextResponse.json({ message: "User found" }, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Error en el servidor" }, { status: 500 });
  }
}
