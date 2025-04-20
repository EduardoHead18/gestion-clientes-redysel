"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IClients } from "../../../interfaces/interfaces";
import { dateFormat, validateObject } from "../../../utils/tools";
import { BadgeStatus } from "../../../components/personalized/BadgeStatus";

export const columnsIncome: ColumnDef<IClients>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "last_name",
    header: "Apellidos",
  },
  {
    accessorKey: "pay",
    header: "Pago",
  },
  {
    accessorKey: "payment_date",
    cell: ({ row }) => {
      const dateFormatted = dateFormat(row.original.payment_date);
      return dateFormatted;
    },
    header: "Fecha de pago",
  },
  {
    accessorKey: "status_payment",
    cell: ({ row }) => {
      const getPayment = validateObject(row.original.payments);
      if (!getPayment) {
        return <BadgeStatus textMessage={"No pagado"} variant="destructive" />;
      }
      return <BadgeStatus textMessage={"Pagado"} variant="default" />;
    },
    header: "Fecha que se pago",
  },
];
