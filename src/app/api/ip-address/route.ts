"use server";

import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json("hole");
}
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await prisma.ip_address.create({ data });
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
