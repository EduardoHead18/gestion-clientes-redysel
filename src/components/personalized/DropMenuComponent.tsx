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
import {
  useRefreshIpAdressApi,
  useRefreshClientComponent,
} from "@/hooks/useStore";

interface DropMenuComponentProps {
  id: number;
  functionProp: () => Promise<void>;
  activeClient?: boolean;
}

type ActionType = "cancel" | "delete" | null;

export default function DropMenuComponent({
  functionProp,
  activeClient,
}: DropMenuComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>(null);
  const { refreshFunction } = useRefreshIpAdressApi();
  const { refreshFunctionClient } = useRefreshClientComponent();

  const getModalTitle = () => {
    if (actionType === "cancel") {
      return activeClient
        ? "¿Quieres cancelar el servicio?"
        : "¿Quieres reactivar el servicio?";
    }
    if (actionType === "delete")
      return "¿Estás seguro de que quieres eliminar?";
    return "";
  };

  const getModalMessage = () => {
    if (actionType === "cancel") {
      return activeClient
        ? "Esta acción cancelará el servicio del cliente."
        : "Esta acción reactivará el servicio del cliente.";
    }
    if (actionType === "delete")
      return "Esta acción eliminará al cliente permanentemente. No se puede deshacer.";
    return "";
  };

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

          <DropdownMenuItem
            onClick={() => {
              setActionType("cancel");
              setIsModalOpen(true);
            }}
          >
            {activeClient ? "Cancelar servicio" : "Reactivar servicio"}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setActionType("delete");
              setIsModalOpen(true);
            }}
          >
            Eliminar
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>Agregar pago</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setActionType(null);
        }}
        title={getModalTitle()}
        message={getModalMessage()}
        textButtonOption="Confirmar"
        action={async () => {
          await functionProp();

          refreshFunction();

          if (actionType === "cancel") {
            refreshFunctionClient();
          }
        }}
      />
    </div>
  );
}
