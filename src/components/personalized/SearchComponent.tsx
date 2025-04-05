import { SearchIcon } from "lucide-react";
import { useStoreSearch } from "@/hooks/useStore";

export const SearchComponent = () => {
  const { search, setSearch } = useStoreSearch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full mb-5">
      <form onSubmit={handleSubmit} className="flex flex-row  w-auto gap-8 ">
        <div className="relative md:w-[400px]">
          <SearchIcon
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            name="search"
            placeholder="Buscar por ID, nombre, apellido, servicio..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md "
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white hover:bg-gray-800 transition-colors duration-300 hover:cursor-pointer rounded-md px-4 py-2 flex items-center gap-2"
        >
          Buscar
        </button>
      </form>
    </div>
  );
};
