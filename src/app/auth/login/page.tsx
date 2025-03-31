"use client";
import { useForm } from "react-hook-form";
import { loginAuth } from "@/app/services/services-api";
import { useRouter } from "next/navigation";
import { AlertError } from "@/app/components/AlertError";
export default function Auth() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response = await loginAuth(data);
      if (response.message === "User found") {
        router.push("/home/");
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Ocurrió un error en el servidor.");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-50 p-10 rounded-lg shadow-sm w-full sm:w-96">
        <h1 className="lg:text-2xl font-bold mb-10">Iniciar sesión</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
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
          <div className="mb-6">
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
          <div className="flex justify-center">
            <button
              type="submit"
              className="items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
