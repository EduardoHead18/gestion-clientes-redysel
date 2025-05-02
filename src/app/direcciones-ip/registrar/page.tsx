"use client";
import { AlertBadge } from "@/components/personalized/AlertBadge";
import { useState } from "react";
import { createIpAddress } from "@/services/services-api";
import { useRouter } from "next/navigation";

interface IPadress {
  ipAddress: string;
}
// const regexIp =
//   /^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/;

export default function RegistrarIpAdressPage() {
  const [errorBadge, setErrorBadge] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [segmentoIp, setSegmentoIp] = useState(0);
  const route = useRouter();

  const handleSubmmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!segmentoIp) return;
    onSubmit({ ipAddress: `${segmentoIp}` });
  };

  const onSubmit = async (data: IPadress) => {
    const dataObject = {
      ip_address: data.ipAddress,
    };
    try {
      const response = await createIpAddress(dataObject);
      if (response.status === 201) {
        route.push("/direcciones-ip");
      } else if (response.status == 409) {
        setErrorBadge(true);
        setErrorMessage(response.data.message);
      } else {
        alert("Error desconocido: " + response.status);
      }
    } catch {
      alert("error en el server");
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen fade-in">
      <div className=" p-10 rounded-lg shadow-sm w-full max-w-2xl ">
        <h1 className="text-center lg:text-2xl font-bold mb-10">
          Registrar Segmento de Dirección IP
        </h1>
        <form onSubmit={handleSubmmit}>
          <div className="">
            <div className="lg:mb-11 basis-1/5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Dirección IP
              </label>
              <input
                type="number"
                id="nombre"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSegmentoIp(parseInt(e.target.value))
                }
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="1"
              />
            </div>
          </div>

          <div className="flex justify-center mb-10">
            <button
              type="submit"
              className="items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Registrar
            </button>
          </div>
        </form>

        {errorBadge && <AlertBadge message={errorMessage} />}
      </div>
    </div>
  );
}
