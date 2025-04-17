"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IPadress } from "../../interfaces/interfaces";
import { BadgeStatus } from "../../components/personalized/BadgeStatus";
import DropMenuComponent from "../../components/personalized/DropMenuComponent";
import { deleteIpAdressService } from "@/services/services-api";

const deleteIpAdressFunc = async (id: number) => {
  console.log("ip: ", id);
  try {
    await deleteIpAdressService(id);
  } catch {
    alert("Error en el servidor");
  }
};
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
      const ipAdressId = row.original.id;
      if (!ipAdressId) return null;
      if (ipAdressId)
        return (
          <DropMenuComponent
            functionProp={() => deleteIpAdressFunc(ipAdressId)}
            id={ipAdressId}
          />
        );
    },
    header: "Acciones",
  },
];
