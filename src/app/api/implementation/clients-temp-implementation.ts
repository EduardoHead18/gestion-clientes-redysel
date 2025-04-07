"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function getClientsTempImplementation() {
  const result = await prisma.clientsTemporary.findMany();
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function createClientTempImplementation(
  data: Prisma.ClientsTemporaryCreateInput
) {
  const result = prisma.clientsTemporary.create({ data });
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function getClientTempByIdImplementation(id: number) {
  const result = await prisma.clientsTemporary.findUnique({
    where: { id },
  });
  return result;
}

export async function updateClientTempImplementation(
  id: number,
  data: Prisma.ClientsTemporaryUpdateInput
) {
  const findClient = await prisma.clientsTemporary.findUnique({
    where: { id },
  });
  if (!findClient)
    return NextResponse.json(
      { message: "cliente no encontrado" },
      { status: 404 }
    );

  const result = await prisma.clientsTemporary.update({
    where: { id },
    data,
  });
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function deleteClientTempImplementation(id: number) {
  const result = await prisma.clientsTemporary.delete({
    where: { id },
  });
  return result;
}
