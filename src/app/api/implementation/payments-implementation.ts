import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getCookie } from "../utils/cookies";
import { decodeToken } from "../utils/tools";

export async function getAllPaymentsImp() {
  const result = await prisma.payments.findMany();
  return NextResponse.json({ data: result }, { status: 200 });
}

export async function createPaymentImp({
  clients_id,
  payment_date,
}: {
  clients_id: number;
  payment_date: string;
}) {
  const employeeCookie = await getCookie();
  const responseDecodeToken = decodeToken(employeeCookie!);
  let employeeIdStr = "";
  //validate the zone from the token
  if (typeof responseDecodeToken === "string") {
    console.error("Error decoding token:", responseDecodeToken);
  } else if ("zone" in responseDecodeToken) {
    employeeIdStr = responseDecodeToken.id;
  }

  const employee_id = parseInt(employeeIdStr, 10);

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

  //validate if client is active
  const clientIsActive = await validateClientIsActive(clients_id);
  if (!clientIsActive)
    return NextResponse.json(
      {
        message:
          "El cliente no está activo, para agregar el pago debes de activar el servicio del cliente",
      },
      { status: 409 }
    );

  //validate date doesnt exist
  const dateIsValid = await validatePaymentDate(clients_id);
  if (!dateIsValid)
    return NextResponse.json(
      {
        message:
          "No puedes volver a hacer un pago porque ya se ha realizado un pago este mes",
      },
      { status: 409 }
    );

  if (validateClientAndEmployee) {
    return validateClientAndEmployee;
  }

  //validate month
  const [dayStr, monthStr, yearStr] = payment_date.split("/");

  const day = parseInt(dayStr, 10);
  const month = parseInt(monthStr, 10);
  const year = parseInt(yearStr, 10);

  if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
    return NextResponse.json(
      { message: "El formato de la fecha debe ser: dia/mes/año" },
      { status: 400 }
    );
  }

  const paymentMonth = month;
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

const validatePaymentDate = async (clientId: number) => {
  try {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const getPaymentDate = await prisma.payments.findMany({
      where: {
        clients_id: clientId,
      },
      select: {
        payment_date: true,
      },
    });

    const paymentExistsThisMonth = getPaymentDate.some(({ payment_date }) => {
      const payment = new Date(payment_date);
      const paymentMonth = payment.getMonth() + 1;
      const paymentYear = payment.getFullYear();

      return paymentMonth === currentMonth && paymentYear === currentYear;
    });

    if (paymentExistsThisMonth) return false;

    return true;
  } catch {
    console.error("❌ Error validando fecha de pago:");
  }
};

const validateClientIsActive = async (id: number) => {
  const client = await prisma.clients.findUnique({
    where: {
      id,
    },
  });

  if (client?.active === false) return false;
  return true;
};
