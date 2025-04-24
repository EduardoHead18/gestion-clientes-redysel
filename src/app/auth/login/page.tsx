"use client";
import { useForm } from "react-hook-form";
import { getServerCookie, loginAuth } from "@/services/services-api";
import { useRouter } from "next/navigation";
import { AlertError } from "@/components/personalized/AlertError";
import { useEffect, useState } from "react";
import { AlertBadge } from "@/components/personalized/AlertBadge";
import { useStoreToken } from "@/hooks/useStore";
import Image from "next/image";

export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [authError, setAuthError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");
  const [token, setTokenTwo] = useState(false);
  const router = useRouter();
  const { setToken } = useStoreToken();

  const onSubmit = async (data: object) => {
    try {
      const response = await loginAuth(data);
      if (response?.status === 200) {
        setTimeout(() => {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          router.push("/inicio");
        }, 1000);
      }
      if (response?.status === 401) {
        setMessageError(response.data.message);
        setAuthError(true);
      }
      if (response?.status === 404) {
        setAuthError(true);
        setMessageError(response.data.message);
      }
    } catch {
      setAuthError(true);
      setMessageError("Error en el servidor");
    }
  };

  useEffect(() => {
    const getCookie = async () => {
      const response = await getServerCookie();
      if (typeof response === "boolean") {
        if (response === true) {
          setToken("token");
          router.push("/inicio/");
        } else {
          setTokenTwo(true);
          router.push("/auth/login");
        }
      }
    };

    getCookie();
  }, [router]);

  return token ? (
    <section className="flex flex-col md:flex-row h-[100vh]">
      <div className="invisible md:visible md:flex-1 bg-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center ">
          <h1 className="text-2xl font-bold">Redysel</h1>
          <Image
            src={"/network.png"}
            alt="redysel chiapas - servicios de internet"
            width={400}
            height={400}
          ></Image>
        </div>
      </div>

      <div className="flex-1 p-10 rounded-lg shadow-sm sm:w-full flex items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="lg:text-2xl font-bold mb-10">Iniciar sesión</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Correo
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
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Contraseña
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
            <div className="flex justify-center mb-10">
              <button
                type="submit"
                className="items-center text-white bg-blue-700 hover:bg-blue-800 cursor-pointer focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Iniciar sesión
              </button>
            </div>
            {authError &&
              AlertBadge({
                message: messageError,
              })}
          </form>
        </div>
      </div>
    </section>
  ) : null;
}
