import { NextRequest, NextResponse } from "next/server";
import { getClientPaymentStatus } from "../../implementation/payments-implementation";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const clientId = parseInt(params.id, 10);

  if (!clientId) {
    return NextResponse.json(
      { message: "El ID del cliente es obligatorio" },
      { status: 400 }
    );
  }

  try {
    const paymentStatus = await getClientPaymentStatus(clientId);
    return NextResponse.json({ data: paymentStatus }, { status: 200 });
  } catch (error) {
    console.error("Error al obtener el estado de pago:", error);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
