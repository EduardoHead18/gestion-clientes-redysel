"use server";
import { NextRequest, NextResponse } from "next/server";
import { deleteIpAddressImpl } from "../../implementation/ip-address-implementation";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const result = await deleteIpAddressImpl(id);
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
