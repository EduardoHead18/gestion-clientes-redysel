import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function getAllIpAdressImpl() {
  const ipAdress = await prisma.ip_address.findMany();
  return NextResponse.json({ data: ipAdress }, { status: 200 });
}

export async function createIpAdressImpl(data: Prisma.Ip_addressCreateInput) {
  const { ip_address } = data;
  const ipAddressExist = await prisma.ip_address.findUnique({
    where: { ip_address },
  });
  if (ipAddressExist)
    return NextResponse.json(
      { message: "La dirección IP ya existe" },
      { status: 409 }
    );
  const ipAdress = await prisma.ip_address.create({ data });
  return NextResponse.json({ data: ipAdress }, { status: 200 });
}

export async function deleteIpAddressImpl(id: number) {
  if (!id) {
    return NextResponse.json(
      { message: "el ID es requerido" },
      { status: 400 }
    );
  }

  const result = await prisma.ip_address.findUnique({
    where: { id },
  });

  if (!result) {
    return NextResponse.json({ error: "IP no encontrado" }, { status: 404 });
  }

  await prisma.ip_address.delete({
    where: { id },
  });
  return NextResponse.json({ message: "IP eliminado" }, { status: 200 });
}

export async function updateIpAdressImpl(
  id: number,
  data: Prisma.TemporaryClientsUpdateInput
) {
  if (!id) {
    return NextResponse.json(
      { message: "el ID es requerido" },
      { status: 400 }
    );
  }
  const findClient = await prisma.ip_address.findUnique({
    where: { id },
  });
  if (!findClient)
    return NextResponse.json({ message: "IP no encontrado" }, { status: 404 });

  const result = await prisma.ip_address.update({
    where: { id },
    data,
  });

  return NextResponse.json({ data: result }, { status: 200 });
}
