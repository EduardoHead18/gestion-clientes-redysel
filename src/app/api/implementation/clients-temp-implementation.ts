"use server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function getClientsTempImplementation() {
  const result = await prisma.temporaryClients.findMany();
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function createClientTempImplementation(
  data: Prisma.TemporaryClientsCreateInput
) {
  const result = await prisma.temporaryClients.create({ data });
  return NextResponse.json({ data: result }, { status: 201 });
}

export async function getClientTempByIdImplementation(id: number) {
  const result = await prisma.temporaryClients.findUnique({
    where: { id },
  });
  return result;
}

export async function updateClientTempImplementation(
  id: number,
  data: Prisma.TemporaryClientsUpdateInput
) {
  const findClient = await prisma.temporaryClients.findUnique({
    where: { id },
  });
  if (!findClient)
    return NextResponse.json(
      { message: "cliente no encontrado" },
      { status: 404 }
    );

  const result = await prisma.temporaryClients.update({
    where: { id },
    data,
  });
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function deleteClientTempImplementation(id: number) {
  const result = await prisma.temporaryClients.delete({
    where: { id },
  });
  return result;
}

export async function getByIdTemporaryClientImp(id: number) {
  const result = await prisma.temporaryClients.findUnique({
    where: { id },
  });

  if (!result)
    return NextResponse.json(
      { message: "Cliente temporal no encontrado" },
      { status: 404 }
    );

  return NextResponse.json({ data: result }, { status: 200 });
}
