"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./colums";
import { IClients } from "../interfaces/interfaces";
import { getAllClients } from "../services/services-api";
import { SearchComponent } from "../components/SearchComponent";
import { PaginationComponent } from "../components/PaginationComponent";
import { useStorePagination } from "@/hooks/useStore";

export default function ClientsPage() {
  const [clients, setClients] = useState<IClients[]>([]);
  const { page } = useStorePagination();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllClients({
        page: page,
        pageLimit: 10,
      });
      setClients(response);
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
