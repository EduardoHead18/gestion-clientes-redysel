"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";

export default function DropMenuComponent() {
  return (
    <div className="container mx-auto px-10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconDotsVertical size={30} className="py-1 flex opacity-40" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Editar</DropdownMenuItem>
          <DropdownMenuItem>Eliminar</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Agregar pago</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
