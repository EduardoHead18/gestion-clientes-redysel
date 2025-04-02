"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
import bcrypt from "bcrypt";

export async function GET() {
  try {
    const employees = await prisma.employees.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, lastName, zone, role, email, password } = await req.json();

    const passwordEncrypted = await bcrypt.hash(password, 10);

    const findUser = await prisma.employees.findUnique({
      where: {
        email,
      },
    });
    if(findUser) return NextResponse.json({message: 'El usuario ya existe'}, { status: 409 });
    const employee = await prisma.employees.create({
      data: {
        name,
        last_name: lastName,
        role,
        zone, 
        email,
        password: passwordEncrypted,
      },
    });

    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create employee",
      status: 400,
    });
  }
}
