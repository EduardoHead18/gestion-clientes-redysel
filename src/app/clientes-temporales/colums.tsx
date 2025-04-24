"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  IClients,
  IPadress,
  ITemporaryClient,
} from "../../interfaces/interfaces";
import { dateFormat } from "../../utils/tools";
import DropMenuTempClient from "@/components/personalized/DropMenus/DropMenuTempClients";
import {
  createClient,
  deleteTemporaryClient,
  getAllIpAdress,
  getByIdTemporaryClient,
  updateIpAddressService,
} from "@/services/services-api";

const deleteClientTemp = async (clientId: number) => {
  try {
    await deleteTemporaryClient(clientId);
  } catch (error) {
    console.error(error);
  }
};

const getIpAddressFunc = async () => {
  //get ip-address
  const response = await getAllIpAdress();
  const responseMap = response.data.find(
    (data: IPadress) => data.status === true
  );
  if (!responseMap) return;
  const ipAddress = responseMap.ip_address;
  const ipAddressId = responseMap.id;
  //update to false ip-address
  return {
    id: ipAddressId,
    ipAddress: ipAddress,
  };
};

const updateAddressFunc = async () => {
  const responseAddress = await getIpAddressFunc();
  if (!responseAddress)
    return alert("No hay Direcciones IP disponibles, registra una nueva");
  const ipAddressId = responseAddress.id;

  await updateIpAddressService({
    id: ipAddressId,
    status: false,
  });
};

const createClientAndContract = async (id: number) => {
  try {
    const response = await getByIdTemporaryClient(id);
    if (!response) {
      alert("Cliente temporal no encontrado");
      return;
    }

    const responseAddress = await getIpAddressFunc();
    if (!responseAddress)
      return alert("No hay Direcciones IP disponibles, registra una nueva");
    const ipAddressId = responseAddress.id;

    const newClient: Partial<IClients> = {
      name: response.name ?? "",
      last_name: response.last_name ?? "",
      phone_number: response.phone_number ?? "",
      ip_address_id: ipAddressId,
      zone: response.zone ?? "",
      payment_date: new Date().toISOString(),
      active: true,
    };

    const result = await createClient(newClient as IClients);

    if (result.status === 201) {
      await updateAddressFunc();
      await deleteTemporaryClient(id);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

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
      return (
        <DropMenuTempClient
          id={clientId}
          functionProp={() => deleteClientTemp(clientId)}
          cotractFunctionProp={() => createClientAndContract(clientId)}
        />
      );
    },
    header: "Acciones",
  },
];
