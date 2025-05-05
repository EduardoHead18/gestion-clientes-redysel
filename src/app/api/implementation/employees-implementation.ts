import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function getAllEmployeeImpl() {
  const getAllEmployee = await prisma.employees.findMany();
  return NextResponse.json({ data: getAllEmployee }, { status: 200 });
}

export async function createEmployeeImpl(data: Prisma.EmployeesCreateInput) {
  type typeRoles = "admi" | "empleado";
  const { name, last_name, zone, role, email, password } = data;

  const passwordEncrypted = await bcrypt.hash(password, 10);
  //validate role
  const normalizedRole = role.toLowerCase();
  const validRoles: typeRoles[] = ["admi", "empleado"];
  if (!validRoles.includes(normalizedRole as typeRoles)) {
    return NextResponse.json(
      { message: "El rol no es adecuado" },
      { status: 400 }
    );
  }

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

export default async function deleteEmployeeImpl(id: number) {
  if (!id) {
    return NextResponse.json(
      { message: "el ID es requerido" },
      { status: 400 }
    );
  }

  const result = await prisma.employees.findUnique({
    where: { id },
  });

  if (!result) {
    return NextResponse.json(
      { error: "Empleado no encontrado" },
      { status: 404 }
    );
  }

  await prisma.employees.delete({
    where: { id },
  });
  return NextResponse.json({ message: "Empleado eliminado" }, { status: 200 });
}
