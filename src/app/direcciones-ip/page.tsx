"use client";
import { SearchComponent } from "@/components/personalized/SearchComponent";
import { DataTable } from "./data-table";
import { PaginationComponent } from "@/components/personalized/PaginationComponent";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllIpAdress } from "@/services/services-api";
import { IPadress } from "@/interfaces/interfaces";
import { columns } from "./colums";
import { useStoreIpAddressPagination } from "@/hooks/useStore";

export default function IpAddressPage() {
  const [dataIpAdress, setDataIpAdress] = useState<IPadress[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { page, refresh, increasePage, decreasePage, reset } =
    useStoreIpAddressPagination();

  useEffect(() => {
    const getIpAddress = async () => {
      const response = await getAllIpAdress({ page: page, pageLimit: 20 });
      if (response.status === 200) {
        setDataIpAdress(response.data);
        setHasMore(response.data.length === 20);
      } else {
        setDataIpAdress([]);
        setHasMore(false);
      }
    };
    getIpAddress();
  }, [refresh, page]);
  return (
    <div className="container mx-auto px-10 fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold mb-5">Direcciones IP</h1>
        <div className="flex items-center mb-5">
          <Link
            href="direcciones-ip/registrar"
            className="bg-gray-800 text-white hover:bg-gray-800 transition-colors duration-300 hover:cursor-pointer rounded-md px-4 py-2 flex items-center gap-2"
          >
            <IconPlus size={20} />
            Nueva IP
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
      <DataTable columns={columns} data={dataIpAdress} />
    </div>
  );
}
