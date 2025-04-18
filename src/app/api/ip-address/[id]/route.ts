"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  deleteIpAddressImpl,
  updateIpAdressImpl,
} from "../../implementation/ip-address-implementation";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const result = await deleteIpAddressImpl(id);
    return result;
  } catch {
    return NextResponse.json(
      {
        message: "Falló al eliminar la dirección IP",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const data = await req.json();
    const result = await updateIpAdressImpl(id, data);
    return result;
  } catch {
    return NextResponse.json(
      {
        message: "Falló al actualizar la dirección IP",
      },
      { status: 500 }
    );
  }
}
