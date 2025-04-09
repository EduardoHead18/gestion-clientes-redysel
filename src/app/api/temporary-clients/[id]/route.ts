"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  deleteClientTempImplementation,
  getByIdTemporaryClientImp,
  updateClientTempImplementation,
} from "../../implementation/clients-temp-implementation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const result = await getByIdTemporaryClientImp(id);
    return result;
  } catch {
    return NextResponse.json(
      { error: "Falló al obtener el cliente" },
      { status: 500 }
    );
  }
}

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
    const id = parseInt(params.id, 10);
    const data = await req.json();

    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }

    const result = await updateClientTempImplementation(id, data);

    return result;
  } catch {
    return NextResponse.json(
      { error: "Failed to update client" },
      { status: 500 }
    );
  }
}
