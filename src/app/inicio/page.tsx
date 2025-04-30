"use client";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./colums";
import { IClients } from "../../interfaces/interfaces";
import { getAllClients, getServerCookie } from "@/services/services-api";
import { SearchComponent } from "../../components/personalized/SearchComponent";
import { PaginationComponent } from "../../components/personalized/PaginationComponent";
import {
  useStorePagination,
  useStoreSearch,
  useRefreshClientComponent,
} from "@/hooks/useStore";
import { useRouter } from "next/navigation";
import { CheckBoxFilter } from "@/components/personalized/CheckBoxFilter";
//TODO: Prevent page changes if the page size is not greater than 20 data.
export default function ClientsPage() {
  const [payDay, setPayDay] = useState<string>("0");
  const [clients, setClients] = useState<IClients[]>([]);
  const router = useRouter();
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
          payDay: payDay,
        });
        if (!Array.isArray(response)) setClients([]);
        else setClients(response);
      } catch (error) {
        console.error("error:", error);
      }
    };

    const getCookieServer = async () => {
      const response = await getServerCookie();
      if (typeof response === "boolean") {
        if (response !== true) return router.push("/auth/login");
      }
    };
    getCookieServer();
    fetchData();
  }, [page, search, refreshClient, payDay]);

  return (
    <div className="container mx-auto px-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-5">Clientes</h1>
      </div>
      <div className="flex flex-col gap-10 md:flex-row w-full">
        <SearchComponent />
        <CheckBoxFilter onChange={(value) => setPayDay(value)} />
        <PaginationComponent />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
