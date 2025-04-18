import { useState } from "react";
import { AlertModal } from "./AlertModal";
import {
  createClient,
  deleteTemporaryClient,
  getAllIpAdress,
  getByIdTemporaryClient,
  updateIpAddressService,
} from "@/services/services-api";
import { IClients, IPadress } from "@/interfaces/interfaces";
import { useRefreshComponent } from "@/hooks/useStore";
export const ButtonComponent = ({ text, id }: { text: string; id: number }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refreshFunction } = useRefreshComponent();

  const getIpAddressFunc = async () => {
    //get ip-address
    const response = await getAllIpAdress();
    const responseMap = response.data.find(
      (data: IPadress) => data.status === true
    );
    if (!responseMap) return;
    const ipAddress = responseMap.ip_address;
    const ipAddressId = responseMap.id;
    //update to false ip-addressÏ
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

  const createClientAndContract = async () => {
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
        title="¿Quieres crear el cliente y el contrato jaja?"
        message="Esta acción no se puede deshacer."
        textButtonOption="Confirmar"
        action={createClientAndContract}
      />
    </>
  );
};
