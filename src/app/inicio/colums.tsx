"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IClients } from "../../interfaces/interfaces";
import { dateFormat, validateObject } from "../../utils/tools";
import { BadgeStatus } from "../../components/personalized/BadgeStatus";
import DropMenuComponent from "../../components/personalized/DropMenus/DropMenuComponent";
import {
  getByIdClientService,
  updateClientService,
} from "@/services/services-api";

const disableClient = async (id: number) => {
  try {
    // Get the active client and change it (true or false)
    const responseById = await getByIdClientService(id);
    if (!responseById) return alert("No se pudo obtener el cliente");

    const currentActive = responseById.active;
    const updatedActive = !currentActive;
    //update value if is active true or false
    const updateResponse = await updateClientService({
      id,
      active: updatedActive,
    });

    if (updateResponse.ok) {
      return alert(updatedActive ? "Cliente activado" : "Cliente desactivado");
    }

    if (updateResponse.status === 409) {
      return alert(updateResponse.data.message);
    }
  } catch (error) {
    alert("Error en el servidor");
    console.error(error);
  }
};

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
    accessorKey: "service",
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
    accessorKey: "zone",
    cell: ({ row }) => {
      const zone = row.original.zone
      return zone;
    },
    header: "Zona",
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
    header: "Estado de pago",
  },
  {
    accessorKey: "active",
    cell: ({ row }) => {
      const active = row.original.active;
      if (!active) {
        return <BadgeStatus textMessage={"Inactivo"} variant="destructive" />;
      }
      return <BadgeStatus textMessage={"Activo"} variant="default" />;
    },
    header: "Activo",
  },
  {
    cell({ row }) {
      const clientId = row.original.id;
      const activeClient = row.original.active;
      if (clientId)
        return (
          <DropMenuComponent
            id={clientId}
            functionProp={() => {
              return disableClient(clientId);
            }}
            activeClient={activeClient}
          />
        );
    },
    header: "Acciones",
  },
];
