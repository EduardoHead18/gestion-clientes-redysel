"use server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@lib/prisma";
import { stat } from "fs";
export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const employee = await prisma.employee.create({ data: body });
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to create employee",
      status: 400,
    });
  }
}
