"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { AlertModal } from "../AlertModal";
import { useState } from "react";
import {
  useRefreshIpAdressApi,
  useRefreshClientComponent,
} from "@/hooks/useStore";

interface DropMenuComponentProps {
  id: number;
  functionProp: () => Promise<void>;
  cotractFunctionProp: () => Promise<void>;
}

type ActionType = "contract" | "delete" | null;

export default function DropMenuTempClient({
  functionProp,
  cotractFunctionProp,
}: DropMenuComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>(null);
  const { refreshFunction } = useRefreshIpAdressApi();
  const { refreshFunctionClient } = useRefreshClientComponent();

  const getModalTitle = () => {
    if (actionType === "contract") {
      return "¿Quieres crear el cliente y el contrato?";
    }
    if (actionType === "delete") {
      return "¿Estás seguro de que quieres eliminarlo?";
    }
    return "";
  };

  const getModalMessage = () => {
    if (actionType === "contract") {
      return "Esta acción creará un cliente y su contrato asociado.";
    }
    if (actionType === "delete") {
      return "Esta acción eliminará al cliente temporal permanentemente. No se puede deshacer.";
    }
    return "";
  };

  return (
    <div className="container mx-auto px-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconDotsVertical size={30} className="py-1 flex opacity-40" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setActionType("contract");
              setIsModalOpen(true);
            }}
          >
            Crear contrato
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setActionType("delete");
              setIsModalOpen(true);
            }}
          >
            Eliminar
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
          if (actionType === "contract") {
            await cotractFunctionProp();
          } else if (actionType === "delete") {
            await functionProp();
          }

          refreshFunction();
          refreshFunctionClient();
        }}
      />
    </div>
  );
}
