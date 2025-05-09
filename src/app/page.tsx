"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DonCamaronChat from "@/components/DonCamaronChat";
import { FaUmbrellaBeach, FaWater, FaTree, FaLandmark } from "react-icons/fa";
import Link from "next/link";
import DonCamaronWidget from "@/components/DonCamaron";


export default function HomePage() {
  const [chatAbierto, setChatAbierto] = useState(false);
  const [search, setSearch] = useState("");



  const categorias = [
    { nombre: "Playas", icono: <FaUmbrellaBeach size={30} className="text-2xl text-orange-500" /> },
    { nombre: "Ríos", icono: <FaWater size={30} className="text-2xl text-blue-500" /> },
    { nombre: "Parques", icono: <FaTree size={30} className="text-2xl text-green-600" /> },
    { nombre: "Historia", icono: <FaLandmark size={30} className="text-2xl text-gray-700" /> },

  ];


  const lugaresPopulares = [
    { nombre: "Puerto Jelí", imagen: "/images/jeli.png" },
    { nombre: "Playa Jambelí", imagen: "/images/jambeli.png" },
    { nombre: "Tembladera", imagen: "/images/tembladera.jpg" },
    { nombre: "Parque Simón Bolívar", imagen: "/images/parque.jpg" },
    { nombre: "Parque Sucre", imagen: "/images/sucre.jpg" },

  ];



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


      <div className="max-w-4xl mx-auto mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center">
          {categorias.map((cat) => (
            <button
              key={cat.nombre}
              className="bg-white rounded-2xl p-5 flex flex-col items-center shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
            >
              {cat.icono}
              <span className="mt-3 text-sm font-semibold text-gray-800">{cat.nombre}</span>
            </button>
          ))}
        </div>
      </div>


      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">Lugares Populares</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-center">
          {lugaresPopulares.map((lugar) => (
            <Link
              key={lugar.nombre}
              href={
                lugar.nombre === "Puerto Jelí"
                  ? "/lugares/puerto-jeli"
                  : "#"
              }
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
                <p className="text-sm text-gray-500">Santa Rosa - El Oro</p>
              </div>
            </Link>
          ))}
        </div>
      </section>




      <DonCamaronWidget />


      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>&copy; 2024 Destino Rosa</p>
      </footer>
    </div>
  );
}
