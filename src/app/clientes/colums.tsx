"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IClients } from "../../interfaces/interfaces";
import { dateFormat, validateObject } from "../../utils/tools";
import { BadgeStatus } from "../../components/personalized/BadgeStatus";
import DropMenuComponent from "../../components/personalized/DropMenuComponent";
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
      const dateFormatted = dateFormat(row.original.payment_date);
      return dateFormatted;
    },
    header: "Fecha de pago",
  },
  {
    cell: ({ row }) => {
      const getPayment = validateObject(row.original.payments);
      if (!getPayment) {
        return <BadgeStatus textMessage={"No pagado"} variant="destructive" />;
      }
      return <BadgeStatus textMessage={"Pagado"} variant="default" />;
    },
    header: "Estado de pago",
  },
  {
    cell() {
      return <DropMenuComponent />;
    },
    header: "Acciones",
  },
];
