"use server";
import { NextRequest, NextResponse } from "next/server";
import deleteEmployeeImpl from "../../implementation/employees-implementation";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const result = await deleteEmployeeImpl(id);
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
