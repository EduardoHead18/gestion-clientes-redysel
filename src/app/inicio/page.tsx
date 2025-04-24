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
      </div>

      <div className="flex flex-col md:flex-row w-full">
        <SearchComponent />
        <PaginationComponent />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
