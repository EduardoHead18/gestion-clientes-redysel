"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  deleteClientImplementation,
  getClientByIdImplementation,
} from "../../implementation/clients-implementation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const result = await getClientByIdImplementation(id);
    return result;
  } catch (error) {
    return NextResponse.json(
      { message: "error en el servidor", info: `el error es ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const result = await deleteClientImplementation(id);
    return result;
  } catch {
    return NextResponse.json(
      { error: "Falló al eliminar el cliente" },
      { status: 500 }
    );
  }
}
