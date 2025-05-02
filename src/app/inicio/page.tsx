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
export default function ClientsPage() {
  const [payDay, setPayDay] = useState<string>("0");
  const [clients, setClients] = useState<IClients[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { page, increasePage, decreasePage, reset } = useStorePagination();
  const { refreshClient } = useRefreshClientComponent();
  const { search } = useStoreSearch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllClients({
          page: page,
          pageLimit: 20,
          search: search,
          payDay: payDay,
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
    <div className="container mx-auto px-10 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-5">Clientes</h1>
      </div>
      <div className="flex flex-col gap-10 md:flex-row w-full">
        <SearchComponent />
        <CheckBoxFilter onChange={(value) => setPayDay(value)} />
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
