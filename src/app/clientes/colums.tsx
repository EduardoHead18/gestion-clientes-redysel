"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IClients } from "../interfaces/interfaces";
import { Contrast } from "lucide-react";
import { dateFormat } from "../utils/date-format";

export const columns: ColumnDef<IClients>[] = [
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
    cell: ({ row }) => {
      const contracts = row.original.contracts;
      return contracts?.length > 0
        ? `$${contracts[0].service}`
        : "Sin servicio";
    },
    header: "Servicio",
  },
  {
    accessorKey: "payment_date",
    cell: ({ row }) => {
      const dateFormatted = dateFormat({ date: row.original.payment_date });
      return dateFormatted;
    },
    header: "Fecha de pago",
  },
  {
    accessorKey: "nothing",
    header: "Estado de pago",
  },
  {
    accessorKey: "acciones",
    header: "Acciones",
  },
];
