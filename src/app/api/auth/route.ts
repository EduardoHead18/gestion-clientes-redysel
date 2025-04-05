"use server";

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "default_secret";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const findEmployee = await prisma.employees.findFirst({
      where: { email },
    });

    if (!findEmployee) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      findEmployee.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Correo o contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: findEmployee.id,
        email: findEmployee.email,
        role: findEmployee.role,
        zone: findEmployee.zone,
      },
      TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    return NextResponse.json(
      { message: "Inicio de sesión exitoso", token },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
