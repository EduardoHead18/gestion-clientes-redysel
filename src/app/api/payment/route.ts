"use server";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "payments" });
}

export async function POST(req: NextRequest) {
  try {
    const { clients_id, employee_id, payment_date } = await req.json();

    if (!clients_id || !employee_id || !payment_date) {
      return NextResponse.json(
        {
          message:
            "Es necesario proporcionar todos los datos: clients_id, employee_id y payment_date.",
        },
        { status: 400 }
      );
    }

    //validate client exist
    const validateClientAndEmployee = await clientAndEmployeeExistValidate({
      clientId: clients_id,
      employeeId: employee_id,
    });

    if (validateClientAndEmployee) {
      return validateClientAndEmployee;
    }

    //validate month
    const [day, month, year] = payment_date.split("/");

    if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
      return NextResponse.json(
        { message: "El formato de la fecha debe ser: dia/mes/año" },
        { status: 400 }
      );
    }

    const paymentMonth = parseInt(month, 10);
    const currentMonth = new Date().getMonth() + 1;

    if (paymentMonth !== currentMonth) {
      return NextResponse.json(
        { message: "El mes de la fecha de pago no coincide con el mes actual" },
        { status: 400 }
      );
    }

    const todayPaymentted = new Date();

    const payment = await prisma.payments.create({
      data: {
        clients_id,
        employee_id,
        payment_date: todayPaymentted,
      },
    });

    return NextResponse.json({ message: "Pago creado", data: { payment } });
  } catch (error) {
    return NextResponse.json(
      {
        message: "El servidor no pudo crear el pago: " + error,
      },
      {
        status: 500,
      }
    );
  }
}

const clientAndEmployeeExistValidate = async ({
  clientId,
  employeeId,
}: {
  clientId: number;
  employeeId: number;
}) => {
  try {
    const clients = await prisma.clients.findUnique({
      where: {
        id: clientId,
      },
    });
    if (!clients)
      return NextResponse.json(
        { message: "EL cliente no existe" },
        { status: 404 }
      );

    const employee = await prisma.employees.findUnique({
      where: {
        id: employeeId,
      },
    });
    if (!employee)
      return NextResponse.json(
        { message: "EL empleado no existe" },
        { status: 404 }
      );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "Error al obtener los datos el cliente o el empleado: " + error,
      },
      {
        status: 500,
      }
    );
  }
};
