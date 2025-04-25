"use server";
import { NextRequest, NextResponse } from "next/server";
import {
  createPaymentImp,
  getAllPaymentsImp,
} from "../implementation/payments-implementation";

export async function GET() {
  try {
    const response = await getAllPaymentsImp();

    return response;
  } catch {
    return NextResponse.json(
      {
        message:
          "Error en el servidor al crear el pago, por favor intente nuevamente",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { clients_id, payment_date } = await req.json();
    const response = await createPaymentImp({
      clients_id,
      payment_date,
    });

    return response;
  } catch {
    return NextResponse.json(
      {
        message:
          "Error en el servidor al crear el pago, por favor intente nuevamente",
      },
      {
        status: 500,
      }
    );
  }
}
