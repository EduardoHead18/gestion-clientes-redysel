import React, { useState } from "react";
import { AlertModal } from "./AlertModal";
import { createClient, getByIdTemporaryClient } from "@/services/services-api";
import { IClients } from "@/interfaces/interfaces";

export const ButtonComponent = ({ text, id }: { text: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clienCreate, setClientCreate] = useState<Partial<IClients>>({});

  const findClientTemp = async () => {
    const response = await getByIdTemporaryClient(id);
    const newObject: Partial<IClients> = {
      name: response.name ?? "",
      last_name: response.last_name ?? "",
      phone_number: response.phone_number ?? "",
      ip_address_id: response.ip_address_id || 1,
      zone: response.zone ?? "",
      payment_date: new Date().toISOString(),
      active: true,
    };
    setClientCreate(newObject);
  };

  const createClientFunc = async () => {
    if (
      !clienCreate.name ||
      !clienCreate.last_name ||
      !clienCreate.ip_address_id
    ) {
      return;
    }
    const result = await createClient(clienCreate as IClients);
    return result;
  };

  // const deleteTemporaryClient = () => {};

  // const createContract = () => {};
  const createClientAndContract = async () => {
    await findClientTemp();
    await createClientFunc();
  };
  return (
    <>
      <button
        type="submit"
        onClick={() => {
          setIsModalOpen(true);
        }}
        className="bg-blue-400 text-white hover:bg-blue-800 transition-colors duration-300 hover:cursor-pointer rounded-md px-4 py-2 flex items-center gap-2"
      >
        {text}
      </button>
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="¿Quieres crear el cliente y el contrato?"
        message="Esta acción no se puede deshacer."
        textButtonOption="Confirmar"
        action={createClientAndContract}
      ></AlertModal>
    </>
  );
};
