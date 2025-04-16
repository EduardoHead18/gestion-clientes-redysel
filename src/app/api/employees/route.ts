"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  createEmployeeImpl,
  getAllEmployeeImpl,
} from "../implementation/employees-implementation";

export async function GET() {
  try {
    const employees = await getAllEmployeeImpl();
    return employees;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch employees", info: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const result = await createEmployeeImpl(data);
    return result;
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create employee",
        info: error,
      },
      { status: 500 }
    );
  }
}
