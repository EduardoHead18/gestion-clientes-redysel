import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { getCookie } from "../utils/cookies";
import { decodeToken } from "../utils/tools";
interface IGetIpAddress {
  typeParam?: string | null;
  searchParam?: string | null;
  page?: number;
  pageLimit?: number;
  payDay?: number;
}
export async function getAllIpAdressImpl(data: IGetIpAddress) {
  const page = data.page ?? 1;
  const pageLimit = data.pageLimit ?? 10;
  const skip = (page - 1) * pageLimit;
  const cookieToken = await getCookie();
  const responseDecodeToken = decodeToken(cookieToken!);
  let employeeZone = "";
  //validate the zone from the token
  if (typeof responseDecodeToken === "string") {
    console.error("Error decoding token:", responseDecodeToken);
  } else if ("zone" in responseDecodeToken) {
    employeeZone = responseDecodeToken.zone;
  }

  const ipAdress = await prisma.ip_address.findMany({
    skip,
    take: pageLimit,
    where: { zone: employeeZone },
  });
  return NextResponse.json({ data: ipAdress }, { status: 200 });
}

export async function createIpAdressImpl(data: Prisma.Ip_addressCreateInput) {
  const { ip_address } = data;

  const ipAddressExist = await prisma.ip_address.findFirst({
    where: {
      ip_address: {
        startsWith: `192.168.${ip_address}.`,
      },
    },
  });

  if (ipAddressExist) {
    return NextResponse.json(
      { message: "Ya existen direcciones IP en este rango" },
      { status: 409 }
    );
  }

  // get the cookie token and decode the employeezone
  const cookie = await getCookie();
  const decodeTokenFunc = decodeToken(cookie!);
  let employeeZone = "";

  if (typeof decodeTokenFunc === "string") {
    console.error("Error decoding token:", decodeTokenFunc);
  } else if ("zone" in decodeTokenFunc) {
    employeeZone = decodeTokenFunc.zone;
  }

  // create the direction ip increments
  const ipAddressesToCreate = [];
  for (let i = 1; i <= 254; i++) {
    const newIp = `192.168.${ip_address}.${i}`;
    ipAddressesToCreate.push({
      ip_address: newIp,
      status: true,
      zone: employeeZone,
    });
  }

  // Insert all ip in the db
  const createdIps = await prisma.ip_address.createMany({
    data: ipAddressesToCreate,
    skipDuplicates: true, // Avoid errors if an IP already exists
  });

  return NextResponse.json(
    { message: "Direcciones IP creadas", count: createdIps.count },
    { status: 201 }
  );
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
  // check if the IP is in use for a client
  const clientUsingIp = await prisma.clients.findFirst({
    where: {
      ip_address_id: id,
    },
  });

  if (clientUsingIp) {
    return NextResponse.json(
      {
        message: "No se puede eliminar la IP. Está en uso por un cliente.",
      },
      { status: 409 }
    );
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
