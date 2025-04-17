"use client";
import { useForm } from "react-hook-form";
import { AlertError } from "@/components/personalized/AlertError";
import { AlertBadge } from "@/components/personalized/AlertBadge";
import { useState } from "react";
import LayoutHome from "../../inicio/layout";
import { createIpAddress } from "@/services/services-api";
import { useRouter } from "next/navigation";

interface IPadress {
  ipAddress: string;
}
const regexIp =
  /^(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1?[0-9]{1,2})){3}$/;

export default function RegistrarIpAdressPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPadress>();
  const [errorBadge, setErrorBadge] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const route = useRouter();
  const onSubmit = async (data: IPadress) => {
    const dataObject = {
      ip_address: data.ipAddress,
      status: true,
    };

    try {
      const response = await createIpAddress(dataObject);
      if (response.status === 200) {
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
    <LayoutHome>
      <div className="flex flex-col items-center  min-h-screen">
        <div className=" p-10 rounded-lg shadow-sm w-full max-w-2xl ">
          <h1 className="text-center lg:text-2xl font-bold mb-10">
            Registrar Dirección IP
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="">
              <div className="lg:mb-11 basis-1/5">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Dirección IP
                </label>
                <input
                  {...register("ipAddress", {
                    required: "La Dirección IP es obligatoria",
                    pattern: {
                      value: regexIp,
                      message:
                        "La dirección IP no es válida. Ejemplo válido: 192.168.1.1",
                    },
                  })}
                  type="text"
                  id="nombre"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="192.168.1.1"
                />
                {errors.ipAddress?.message &&
                  AlertError({ message: String(errors.ipAddress.message) })}
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
    </LayoutHome>
  );
}
