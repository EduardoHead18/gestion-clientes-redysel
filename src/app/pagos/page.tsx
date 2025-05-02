"use client";

import { useEffect, useState } from "react";
import { IClients } from "../../interfaces/interfaces";
import { getAllClients } from "@/services/services-api";
import {
  useStorePagination,
  useStoreSearch,
  useRefreshClientComponent,
} from "@/hooks/useStore";
import { DataTableIncome } from "./income/data-table-income";
import { columnsIncome } from "./income/colums";
import { currentDate } from "@/utils/tools";
import { DataTableExpenses } from "./expenses/data-table-expenses";
import { DataTableCashClosing } from "./cash-closing/data-table-cash-closing";
import { columnsCashClosing } from "./cash-closing/colums";
import { columnsExpenses } from "./expenses/colums";

const date = currentDate();

export default function PagosPage() {
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
    <div className="container mx-auto px-10 fade-in">
      <div className="flex flex-col justify-end mb-4">
        <div className="flex md:flex-row items-end justify-between">
          <h1 className="md:text-2xl font-semibold mb-5">Pagos</h1>
          <h2 className="md:text-xl font-semibold mb-5">{date}</h2>
        </div>
      </div>

      <section className="grid gap-7">
        <DataTableIncome columns={columnsIncome} data={clients} />
        <DataTableExpenses columns={columnsExpenses} data={clients} />
        <DataTableCashClosing columns={columnsCashClosing} data={clients} />
      </section>
    </div>
  );
}
