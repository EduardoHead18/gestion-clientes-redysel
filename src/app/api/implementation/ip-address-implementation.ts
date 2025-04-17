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
