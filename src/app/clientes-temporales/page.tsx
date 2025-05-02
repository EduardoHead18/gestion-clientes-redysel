"use client";
import { PaginationComponent } from "@/components/personalized/PaginationComponent";
import { SearchComponent } from "@/components/personalized/SearchComponent";
import { IconPlus } from "@tabler/icons-react";
import { columns } from "./colums";
import { DataTable } from "./data-table";
import { useEffect, useState } from "react";
import { getAllTemporaryClients } from "@/services/services-api";
import { ITemporaryClient } from "@/interfaces/interfaces";
import Link from "next/link";
import {
  useStoreSearch,
  useStoreClientsTemporaryPagination,
  useRefreshTemporaryClientComponent,
} from "@/hooks/useStore";

export default function ClientesTemporalesPage() {
  const [clients, setClients] = useState<ITemporaryClient[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { search } = useStoreSearch();
  const { increasePage, decreasePage, reset, page } =
    useStoreClientsTemporaryPagination();
  const { refreshTemporaryClient } = useRefreshTemporaryClientComponent();

  const getAllClientsTemp = async () => {
    try {
      const response = await getAllTemporaryClients({
        page: page,
        pageLimit: 20,
        search: search,
      });
      if (response.status === 200) {
        setClients(response.data);
        setHasMore(response.data.length === 20);
      } else {
        setClients([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    getAllClientsTemp();
  }, [page, search, refreshTemporaryClient]);
  return (
    <div className="container mx-auto px-10 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-5">Clientes temporales</h1>
        <div className="flex items-center mb-5">
          <Link
            href="/clientes-temporales/registrar"
            className="bg-gray-800 text-white hover:bg-gray-800 transition-colors duration-300 hover:cursor-pointer rounded-md px-4 py-2 flex items-center gap-2"
          >
            <IconPlus size={20} />
            Nuevo Cliente
          </Link>
        </div>
      </div>

      <div className="flex flex-col md:flex-row w-full">
        <SearchComponent />
        <PaginationComponent
          page={page}
          increasePage={hasMore ? increasePage : undefined}
          decreasePage={decreasePage}
          reset={reset}
        />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
