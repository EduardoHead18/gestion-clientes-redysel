"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  deleteClientTempImplementation,
  updateClientTempImplementation
} from "../../implementation/clients-temp-implementation";

export async function DELETE(req: NextRequest) {
  try {
    const id = await req.json();
    await deleteClientTempImplementation(id);
    return NextResponse.json({ message: "Cliente eliminado" }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Falló al eliminar el cliente" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();
    const id = parseInt(params.id, 10);

    const result = await updateClientTempImplementation(id, data);

    return result

  } catch {
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}
