"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./colums";
import { IClients } from "../../interfaces/interfaces";
import { getAllClients } from "@/services/services-api";
import { SearchComponent } from "../../components/personalized/SearchComponent";
import { PaginationComponent } from "../../components/personalized/PaginationComponent";
import { useStorePagination } from "@/hooks/useStore";

export default function ClientsPage() {
  const [clients, setClients] = useState<IClients[]>([]);
  const { page } = useStorePagination();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllClients({
          page: page,
          pageLimit: 20,
        });
        setClients(response.data);
      } catch (error) {
        console.log("error:", error);
      }
    };

    fetchData();
  }, [page]);

  return (
    <div className="container mx-auto px-10">
      <div className="flex flex-col md:flex-row w-full">
        <SearchComponent />
        <PaginationComponent />
      </div>
      <DataTable columns={columns} data={clients} />
    </div>
  );
}
