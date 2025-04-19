"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ITemporaryClient } from "../../interfaces/interfaces";
import { dateFormat } from "../../utils/tools";
import { ButtonComponent } from "@/components/personalized/ButtonComponent";
export const columns: ColumnDef<ITemporaryClient>[] = [
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
    accessorKey: "phone_number",
    header: "Numero de telefono",
  },
  {
    accessorKey: "zone",
    header: "zona",
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
    cell({ row }) {
      const clientId = row.original.id;
      return <ButtonComponent text={"Crear contrato"} id={clientId} />;
    },
    header: "Acciones",
  },
];
