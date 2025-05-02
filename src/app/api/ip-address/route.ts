"use server";

import { NextRequest, NextResponse } from "next/server";
import {
  createIpAdressImpl,
  getAllIpAdressImpl,
} from "../implementation/ip-address-implementation";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;

    //get all params for the filter and pagination
    const dataObjectTransfer = {
      typeParam: searchParams.get("type"),
      searchParam: searchParams.get("search"),
      page: parseInt(searchParams.get("page") || "1", 10),
      pageLimit: parseInt(searchParams.get("pageLimit") || "10", 10),
    };
    const result = await getAllIpAdressImpl(dataObjectTransfer);
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
  } catch {
    return NextResponse.json(
      { message: "Falló al crear la dirección IP" },
      { status: 500 }
    );
  }
}
