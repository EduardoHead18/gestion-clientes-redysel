import { useState } from "react";
import { SearchIcon } from "lucide-react";

export const SearchComponent = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full mb-5">
      <div className="relative w-auto md:w-[400px]">
        <SearchIcon
          size={20}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        />
        <input
          type="text"
          placeholder="Buscar por ID, nombre, apellido, servicio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md "
        />
      </div>
    </div>
  );
};
