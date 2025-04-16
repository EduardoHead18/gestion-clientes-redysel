import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getAllEmployeeImpl() {
  const getAllEmployee = await prisma.employees.findMany();
  return NextResponse.json({ data: getAllEmployee }, { status: 200 });
}

export async function createEmployeeImpl(data: Prisma.EmployeesCreateInput) {
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
