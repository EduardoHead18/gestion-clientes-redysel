"use client";
import { ITemporaryClient } from "@/interfaces/interfaces";
import { useForm } from "react-hook-form";
import { AlertError } from "@/components/personalized/AlertError";
import { AlertBadge } from "@/components/personalized/AlertBadge";
import { useState } from "react";
import { createTemporaryClient } from "@/services/services-api";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRefreshTemporaryClientComponent } from "@/hooks/useStore";

export default function ClientsTemporaryPage() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ITemporaryClient>();
  const [errorBadge, setErrorBadge] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();
  const { refreshFunctionTemporaryClient } =
    useRefreshTemporaryClientComponent();

  const onSubmit = async (data: ITemporaryClient) => {
    const sendData = {
      ...data,
    };
    const response = await createTemporaryClient(sendData);
    if (response?.status === 201) {
      refreshFunctionTemporaryClient();
      return router.push("/clientes-temporales");
    } else {
      setErrorMessage("error en el servidor");
      setErrorBadge(true);
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen fade-in">
      <div className=" p-10 rounded-lg shadow-sm w-full max-w-2xl ">
        <h1 className="text-center lg:text-2xl font-bold mb-10">
          Registrar Cliente
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="lg:mb-11 basis-1/3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Nombre
              </label>
              <input
                {...register("name", {
                  required: "El nombre es obligatorio",
                  maxLength: 50,
                })}
                type="text"
                id="nombre"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Eduardo"
              />
              {errors.name?.message &&
                AlertError({ message: String(errors.name.message) })}
            </div>
            <div className="mb-6 basis-2/3">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Apellidos
              </label>
              <input
                {...register("last_name", {
                  required: "El apellido es obligatorio",
                  maxLength: 50,
                  minLength: 3,
                })}
                type="text"
                id="apellidos"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Hernández Morales"
              />
              {errors.last_name?.message &&
                AlertError({ message: String(errors.last_name.message) })}
            </div>
          </div>

          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="mb-8 w-full">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Numero de telefono
                </label>
                <input
                  {...register("phone_number", {
                    required: "El telefono es obligatorio",
                    minLength: {
                      value: 10,
                      message: "El teléfono debe tener al menos 10 dígitos",
                    },
                    maxLength: {
                      value: 10,
                      message: "El teléfono no puede tener más de 10 dígitos",
                    },
                  })}
                  type="tel"
                  id="number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="9191234567"
                />
                {errors.phone_number?.message &&
                  AlertError({
                    message: String(errors.phone_number?.message),
                  })}
              </div>
            </div>

            <Select
              {...register("service", {
                required: "El servicio es obligatorio",
              })}
              onValueChange={(value) => {
                setValue("service", Number(value), { shouldValidate: true });
                trigger("service");
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Elegir servicio" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Servicios</SelectLabel>
                  <SelectItem value="300">300</SelectItem>
                  <SelectItem value="500">500</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.service &&
              AlertError({
                message: String(errors.service.message),
              })}
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
