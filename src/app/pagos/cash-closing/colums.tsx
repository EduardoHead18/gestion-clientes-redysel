"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IClients } from "../../../interfaces/interfaces";
import { dateFormat } from "../../../utils/tools";

export const columnsCashClosing: ColumnDef<IClients>[] = [
  {
    accessorKey: "motion",
    header: "Movimiento",
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
  },
  {
    accessorKey: "service",
    header: "Servicio",
  },
  {
    accessorKey: "date",
    cell: ({ row }) => {
      const dateFormatted = dateFormat(row.original.payment_date);
      return dateFormatted;
    },
    header: "Fecha",
  },
];
