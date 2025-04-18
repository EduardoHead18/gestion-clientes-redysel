"use server";

import { NextRequest, NextResponse } from "next/server";
import {
  createIpAdressImpl,
  getAllIpAdressImpl,
} from "../implementation/ip-address-implementation";

export async function GET() {
  try {
    const result = await getAllIpAdressImpl();
    return result;
  } catch {
    return NextResponse.json(
      { message: "Falló al obtener la dirección IP" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await createIpAdressImpl(data);
    return result;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Falló al crear la dirección IP", info: error },
      { status: 500 }
    );
  }
}
