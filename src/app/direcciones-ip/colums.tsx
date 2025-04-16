"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IPadress } from "../../interfaces/interfaces";
import { BadgeStatus } from "../../components/personalized/BadgeStatus";
import DropMenuComponent from "../../components/personalized/DropMenuComponent";
export const columns: ColumnDef<IPadress>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "ip_address",
    header: "Dirección IP",
  },
  {
    accessorKey: "status",
    cell: ({ row }) => {
      const status = row.original.status;
      return status == true ? (
        <BadgeStatus textMessage={"Disponible"} variant="default" />
      ) : (
        <BadgeStatus textMessage={"No Disponible"} variant="destructive" />
      );
    },
    header: "Estado",
  },
  {
    cell({ row }) {
      const clientId = row.original.id;
      if (clientId) return <DropMenuComponent id={clientId} />;
    },
    header: "Acciones",
  },
];
