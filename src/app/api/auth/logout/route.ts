"use server";

import { NextResponse } from "next/server";
import { deleteCookie } from "../../utils/cookies";

export async function GET() {
  try {
    await deleteCookie();

    return NextResponse.json(
      { message: "Sesión cerrada exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al cerrar sesión", error },
      { status: 500 }
    );
  }
}
