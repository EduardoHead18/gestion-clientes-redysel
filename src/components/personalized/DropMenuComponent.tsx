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
import { useState } from "react";
import { useRefreshIpAdressApi } from "@/hooks/useStore";

interface DropMenuComponentProps {
  id: number;
  functionProp: (id: number) => Promise<void>;
}

export default function DropMenuComponent({
  id,
  functionProp,
}: DropMenuComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { refreshFunction } = useRefreshIpAdressApi();

  return (
    <div className="container mx-auto px-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconDotsVertical size={30} className="py-1 flex opacity-40" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => alert("editar")}>
            Editar
          </DropdownMenuItem>

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
        action={async () => {
          await functionProp(id);
          refreshFunction();
        }}
      />
    </div>
  );
}
