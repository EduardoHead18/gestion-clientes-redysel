"use server";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getAllIpAdressImpl } from "../implementation/ip-address-implementation";

export async function GET() {
  try {
    const result = await getAllIpAdressImpl();
    return result;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create client", info: error },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await prisma.ip_address.create({ data });
    return result;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create client", info: error },
      { status: 500 }
    );
  }
}
