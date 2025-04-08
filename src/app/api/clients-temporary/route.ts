"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  getClientsTempImplementation,
  createClientTempImplementation,
} from "../implementation/clients-temp-implementation";

export async function GET() {
  try {
    const result = await getClientsTempImplementation();
    return result;
  } catch {
    return NextResponse.json(
      { message: "Failed to fetch clients" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const result = await createClientTempImplementation(data);
    console.log(result)
    return result;
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create client ${error}` },
      { status: 400 }
    );
  }
}
