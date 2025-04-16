import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function createEmployee(data: Prisma.EmployeesCreateInput) {
  const { name, last_name, zone, role, email, password } = data;

  const passwordEncrypted = await bcrypt.hash(password, 10);

  const findUser = await prisma.employees.findUnique({
    where: {
      email,
    },
  });
  if (findUser)
    return NextResponse.json(
      { message: "El usuario ya existe" },
      { status: 409 }
    );
  const employee = await prisma.employees.create({
    data: {
      name,
      last_name,
      role,
      zone,
      email,
      password: passwordEncrypted,
    },
  });

  return NextResponse.json({ data: employee }, { status: 201 });
}
