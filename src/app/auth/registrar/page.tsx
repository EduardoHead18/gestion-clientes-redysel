"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AlertError } from "@/components/personalized/AlertError";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IEmployee } from "@/interfaces/interfaces";
import { createEmployeeApi } from "@/services/services-api";
import { AlertBadge } from "@/components/personalized/AlertBadge";
import { useState } from "react";

export default function Auth() {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<IEmployee>();
  const router = useRouter();
  const [errorBadge, setErrorBadge] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit: SubmitHandler<IEmployee> = async (data) => {
    try {
      const response = await createEmployeeApi(data);
      if (response?.status === 201) return router.push("/inicio/");
      if (response?.status === 409) {
        setErrorBadge(true);
        setErrorMessage(response?.data?.message);
      }
    } catch {
      setErrorBadge(true);
      setErrorMessage("Error al registrar el empleado");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-50 p-10 rounded-lg shadow-sm w-full max-w-2xl ">
        <h1 className="text-center lg:text-2xl font-bold mb-10">
          Registrar empleado
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="mb-11 basis-1/3">
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
                {...register("lastName", {
                  required: "El nombre es obligatorio",
                  maxLength: 50,
                  minLength: 3,
                })}
                type="text"
                id="apellidos"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Hernández Morales"
              />
              {errors.lastName?.message &&
                AlertError({ message: String(errors.lastName.message) })}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <div className="mb-8 w-full">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email address
              </label>
              <input
                {...register("email", {
                  required: "El correo es obligatorio",
                  maxLength: 50,
                })}
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="email@gmail.com"
              />
              {errors.email?.message &&
                AlertError({ message: String(errors.email.message) })}
            </div>
            <div className="w-full mb-11">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  maxLength: 20,
                })}
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="•••••••••"
              />
              {errors.password?.message &&
                AlertError({ message: String(errors.password.message) })}
            </div>
          </div>
          <div className="mb-11">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Seleccionar rol y zona
            </label>
            <div className="flex flex-col md:flex-row gap-3">
              <Select
                {...register("role", { required: "El rol es obligatorio" })}
                onValueChange={(value) => {
                  setValue("role", value, { shouldValidate: true });
                  trigger("role");
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Asignar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Roles</SelectLabel>
                    <SelectItem value="administrador">Administrador</SelectItem>
                    <SelectItem value="empleado">Empleado</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.role &&
                AlertError({
                  message: String(errors.role.message),
                })}

              <Select
                {...register("zone", { required: "El zona es obligatorio" })}
                onValueChange={(value) => {
                  setValue("zone", value, { shouldValidate: true });
                  trigger("zone");
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Asignar zona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Zonas</SelectLabel>
                    <SelectItem value="ocosingo">Ocosingo</SelectItem>
                    <SelectItem value="chilon">Chilon</SelectItem>
                    <SelectItem value="yajalon">Yajalon</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.zone &&
                AlertError({ message: String(errors.zone.message) })}
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
    </section>
  );
}
