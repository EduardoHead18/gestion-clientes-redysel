"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { AlertModal } from "../AlertModal";
import { useState } from "react";
import { useRefreshClientComponent } from "@/hooks/useStore";

interface DropMenuComponentProps {
  id: number;
  activeClient?: boolean;
  functionCancelService: () => Promise<void>;
  functionAddPayment: () => Promise<void>;
}

type ActionType = "cancel-service" | "delete-client" | "add-payment" | null;

export default function DropMenuComponent({
  activeClient,
  functionCancelService,
  functionAddPayment,
}: DropMenuComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>(null);
  const { refreshFunctionClient } = useRefreshClientComponent();

  const getModalTitle = () => {
    if (actionType === "cancel-service") {
      return activeClient
        ? "¿Quieres cancelar el servicio?"
        : "¿Quieres reactivar el servicio?";
    }
    if (actionType === "add-payment") return "¿Quieres agregar un pago?";
    if (actionType === "delete-client")
      return "¿Estás seguro de que quieres eliminar?";
    return "";
  };

  const getModalMessage = () => {
    if (actionType === "cancel-service") {
      return activeClient
        ? "Esta acción cancelará el servicio del cliente."
        : "Esta acción reactivará el servicio del cliente.";
    }
    if (actionType === "add-payment")
      return "Esta acción agregará un pago al cliente.";
    if (actionType === "delete-client")
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
              setActionType("cancel-service");
              setIsModalOpen(true);
            }}
          >
            {activeClient ? "Cancelar servicio" : "Reactivar servicio"}
          </DropdownMenuItem>

          {/* <DropdownMenuItem
            onClick={() => {
              setActionType("delete-client");
              setIsModalOpen(true);
            }}
          >
            Eliminar
          </DropdownMenuItem> */}

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setActionType("add-payment");
              setIsModalOpen(true);
            }}
          >
            Agregar pago
          </DropdownMenuItem>
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
          if (actionType === "cancel-service") await functionCancelService();
          if (actionType === "add-payment") await functionAddPayment();

          refreshFunctionClient();
        }}
      />
    </div>
  );
}
