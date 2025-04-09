"use client";
import { PaginationComponent } from "@/components/personalized/PaginationComponent";
import { SearchComponent } from "@/components/personalized/SearchComponent";
import { IconPlus } from "@tabler/icons-react";
import { columns } from "./colums";

import LayoutHome from "../inicio/layout";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { getAllTemporaryClients } from "@/services/services-api";
import { ITemporaryClient } from "@/interfaces/interfaces";
import Link from "next/link";

export default function ClientesTemporalesPage() {
  const [data, setData] = useState<ITemporaryClient[]>([]);
  const getAllClientsTemp = async () => {
    const response = await getAllTemporaryClients();
    setData(response.data);
  };
  useEffect(() => {
    getAllClientsTemp();
  }, []);
  return (
    <LayoutHome>
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold mb-5">Clientes temporales</h1>
          <div className="flex items-center mb-5">
            <Link
              href="/clientes-temporales/registrar"
              className="bg-gray-800 text-white hover:bg-gray-800 transition-colors duration-300 hover:cursor-pointer rounded-md px-4 py-2 flex items-center gap-2"
            >
              Nuevo Cliente
              <IconPlus size={20} />
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full">
          <SearchComponent />
          <PaginationComponent />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </LayoutHome>
  );
}
