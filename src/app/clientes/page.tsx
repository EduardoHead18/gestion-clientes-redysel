"use client";

import { useEffect, useState } from "react";
import LayoutHome from "../inicio/layout";
import { DataTable } from "./data-table";
import {  columns } from "./colums";
import { IClients } from "../interfaces/interfaces";
import { getAllClients } from "../services/services-api";

export default function ClientsPage() {
  const [clients, setClients] = useState<IClients[]>([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await getAllClients();
        setClients(response);
    }

    fetchData();
  }, []);

  return (
    <LayoutHome>
      <div className="container mx-auto px-10">
        <DataTable columns={columns} data={clients} />
      </div>
    </LayoutHome>
  );
}
