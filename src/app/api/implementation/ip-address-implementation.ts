import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function getAllIpAdressImpl() {
  const ipAdress = await prisma.ip_address.findMany();
  return NextResponse.json({ data: ipAdress }, { status: 200 });
}

export async function createIpAdressImpl(data: Prisma.Ip_addressCreateInput) {
  const ipAdress = await prisma.ip_address.create({ data });
  return NextResponse.json({ data: ipAdress }, { status: 200 });
}
