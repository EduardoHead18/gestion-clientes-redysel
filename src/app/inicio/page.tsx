"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./colums";
import { IClients } from "../../interfaces/interfaces";
import { getAllClients } from "@/services/services-api";
import { SearchComponent } from "../../components/personalized/SearchComponent";
import { PaginationComponent } from "../../components/personalized/PaginationComponent";
import {
  useStorePagination,
  useStoreSearch,
  useRefreshClientComponent,
} from "@/hooks/useStore";
import { IconPlus } from "@tabler/icons-react";

//TODO: Prevent page changes if the page size is not greater than 20 data.
export default function ClientsPage() {
  const [clients, setClients] = useState<IClients[]>([]);
  const { page } = useStorePagination();
  const { refreshClient } = useRefreshClientComponent();
  const { search } = useStoreSearch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllClients({
          page: page,
          pageLimit: 20,
          search: search,
        });
        if (!Array.isArray(response)) setClients([]);
        else setClients(response);
      } catch (error) {
        console.error("error:", error);
      }
    };

    fetchData();
  }, [page, search, refreshClient]);

  return (
    <div className="container mx-auto px-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-5">Clientes</h1>
        <div className="flex items-center mb-5">
          <button className="bg-gray-800 text-white hover:bg-gray-800 transition-colors duration-300 hover:cursor-pointer rounded-md px-4 py-2 flex items-center gap-2">
            Nuevo Cliente
            <IconPlus size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        <SearchComponent />
        <PaginationComponent />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
