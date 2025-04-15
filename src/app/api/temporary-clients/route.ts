"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  getClientsTempImplementation,
  createClientTempImplementation,
} from "../implementation/clients-temp-implementation";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const tokenHeader = req.headers.get("authorization");

    const dataObjectTransfer = {
      typeParam: searchParams.get("type"),
      searchParam: searchParams.get("search"),
      page: parseInt(searchParams.get("page") || "1", 10),
      pageLimit: parseInt(searchParams.get("pageLimit") || "10", 10),
      tokenHeader: tokenHeader,
    };

    const result = await getClientsTempImplementation(dataObjectTransfer);
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
    return result;
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create client ${error}` },
      { status: 400 }
    );
  }
}
