"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { AlertModal } from "./AlertModal";
import { deleteClient } from "@/services/services-api";
import { useStorePagination } from "@/hooks/useStore";
import { useState } from "react";

export default function DropMenuComponent({ id }: { id: number }) {
  const { refreshFunction } = useStorePagination();
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal

  const deleteApiClient = async () => {
    try {
      const response = await deleteClient(id);
      if (response.status === 200) {
        refreshFunction();
        setIsModalOpen(false);
      } else {
        alert("Error al eliminar el cliente");
      }
    } catch {
      alert("Error en el servidor");
    }
  };

  const handleEditClick = () => {
    alert("Hola");
  };

  return (
    <div className="container mx-auto px-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconDotsVertical size={30} className="py-1 flex opacity-40" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleEditClick}>Editar</DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            Eliminar
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>Agregar pago</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="¿Quieres eliminarlo?"
        message="Esta acción no se puede deshacer."
        textButtonOption="Confirmar"
        action={deleteApiClient}
      />
    </div>
  );
}
