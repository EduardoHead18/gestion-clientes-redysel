import { useState } from "react";
import { AlertModal } from "./AlertModal";
import {
  createClient,
  deleteTemporaryClient,
  getByIdTemporaryClient,
} from "@/services/services-api";
import { IClients } from "@/interfaces/interfaces";
import { useRefreshComponent } from "@/hooks/useStore";
export const ButtonComponent = ({ text, id }: { text: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refreshFunction } = useRefreshComponent();

  const createClientAndContract = async () => {
    try {
      const response = await getByIdTemporaryClient(id);
      if (!response) {
        alert("Cliente temporal no encontrado");
        return;
      }

      const newClient: Partial<IClients> = {
        name: response.name ?? "",
        last_name: response.last_name ?? "",
        phone_number: response.phone_number ?? "",
        ip_address_id: response.ip_address_id || 1,
        zone: response.zone ?? "",
        payment_date: new Date().toISOString(),
        active: true,
      };

      const result = await createClient(newClient as IClients);

      if (result.status === 201) {
        await deleteTemporaryClient(id);
        refreshFunction();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button
        type="submit"
        onClick={() => setIsModalOpen(true)}
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
      />
    </>
  );
};
