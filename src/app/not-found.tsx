import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-9xl font-bold">404</h1>
      <p className="mb-6 text-2xl">Not Found</p>
      <Link className="hover:text-blue-500" href="/">
        Regresar al Login
      </Link>
    </div>
  );
}
