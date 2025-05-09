"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaUmbrellaBeach, FaWater, FaTree, FaLandmark } from "react-icons/fa";
import Link from "next/link";
import DonCamaronWidget from "@/components/DonCamaron";
import Footer from "@/components/footer";

interface Categoria {
  id: number;
  nombre: string;
  icono: string;
}

interface Lugar {
  id: number;
  nombre: string;
  imagen: string;
  descripcion?: string;
  categoria: Categoria;
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCat, resLug] = await Promise.all([
          fetch("/api/categorias"),
          fetch("/api/lugares"),
        ]);

        if (!resCat.ok || !resLug.ok) {
          throw new Error("Error al cargar datos desde el servidor");
        }

        const categoriasData = await resCat.json();
        const lugaresData = await resLug.json();

        console.log("✅ Categorías cargadas:", categoriasData);
        console.log("✅ Lugares cargados:", lugaresData);

        if (Array.isArray(categoriasData)) setCategorias(categoriasData);
        else console.error("❌ Categorías no son array:", categoriasData);

        if (Array.isArray(lugaresData)) setLugares(lugaresData);
        else console.error("❌ Lugares no son array:", lugaresData);

      } catch (err: any) {
        console.error("🔥 Error cargando datos:", err);
        setError("No se pudo cargar la información. Revisa tu servidor.");
      }
    };

    fetchData();
  }, []);

  const getIcono = (icono: string) => {
    switch (icono) {
      case "FaUmbrellaBeach": return <FaUmbrellaBeach size={30} className="text-2xl text-orange-500" />;
      case "FaWater": return <FaWater size={30} className="text-2xl text-blue-500" />;
      case "FaTree": return <FaTree size={30} className="text-2xl text-green-600" />;
      case "FaLandmark": return <FaLandmark size={30} className="text-2xl text-gray-700" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014d4d] via-[#f97316] to-[#fef3c7] px-4 md:px-16 py-10 text-gray-900">
      <header className="text-center mb-10">
        <h2 className="text-xl font-medium text-white">Santa Rosa</h2>
        <h1 className="text-5xl font-extrabold text-white mt-2">Explora Santa Rosa</h1>
        <p className="text-lg text-white mt-2">
          Donde te esperan el río, la playa y el camarón.
        </p>
      </header>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Buscar lugares..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-2/3 p-3 rounded-full shadow border focus:outline-none focus:ring focus:border-orange-400"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="text-center text-red-600 font-bold mb-6">{error}</div>
      )}

      {/* Categorías */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              className="bg-white rounded-2xl p-5 flex flex-col items-center shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
            >
              {getIcono(cat.icono)}
              <span className="mt-3 text-sm font-semibold text-gray-800">{cat.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lugares */}
      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">Lugares Populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {lugares
            .filter((lugar) =>
              lugar.nombre.toLowerCase().includes(search.toLowerCase())
            )
            .map((lugar) => (
              <Link
                key={lugar.id}
                href={`/lugares/${lugar.nombre.toLowerCase().replace(/\s+/g, "-")}`}
                className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 hover:scale-105 overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={lugar.imagen}
                    alt={lugar.nombre}
                    width={300}
                    height={200}
                    className="w-full h-[180px] object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-semibold text-gray-900">{lugar.nombre}</h3>
                  <p className="text-sm text-gray-500">{lugar.categoria?.nombre}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <DonCamaronWidget />

      <Footer />
    </div>
  );
}
