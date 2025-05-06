"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DonCamaronChat from "@/components/DonCamaronChat";
import { FaUmbrellaBeach, FaWater, FaTree, FaLandmark } from "react-icons/fa";

export default function HomePage() {
  const [mostrarBurbuja, setMostrarBurbuja] = useState(false);
  const [chatAbierto, setChatAbierto] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarBurbuja(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  const categorias = [
    { nombre: "Playas", icono: <FaUmbrellaBeach className="text-2xl text-orange-500" /> },
    { nombre: "Ríos", icono: <FaWater className="text-2xl text-blue-500" /> },
    { nombre: "Parques", icono: <FaTree className="text-2xl text-green-600" /> },
    { nombre: "Historia", icono: <FaLandmark className="text-2xl text-gray-700" /> },
  ];


  const lugaresPopulares = [
    { nombre: "Puerto Jelí", imagen: "/images/jeli.png" },
    { nombre: "Playa Jambelí", imagen: "/images/jambeli.png" },
    { nombre: "Tembladera", imagen: "/images/tembladera.jpg" },
    { nombre: "Parque Simón Bolívar", imagen: "/images/parque.jpg" },
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-[#014d4d] via-[#f97316] to-[#fef3c7] px-4 md:px-16 py-10 text-gray-900">
      <header className="text-center mb-10">
        <h2 className="text-xl font-medium text-white">Santa Rosa</h2>
        <h1 className="text-5xl font-extrabold text-white mt-2">Explore Santa Rosa</h1>
        <p className="text-lg text-white mt-2">
          Where the river, beach, and shrimp await.
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

      <div className="flex flex-wrap justify-center gap-6 mb-10">
        {categorias.map((cat) => (
          <button
            key={cat.nombre}
            className="bg-white text-gray-800 px-5 py-3 rounded-xl shadow-md flex items-center gap-3 hover:bg-orange-100 hover:scale-105 transition-all"
          >
            {cat.icono}
            <span className="font-medium">{cat.nombre}</span>
          </button>
        ))}
      </div>




      <section className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">Popular Places</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lugaresPopulares.map((lugar) => (
            <div
              key={lugar.nombre}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <Image
                src={lugar.imagen}
                alt={lugar.nombre}
                width={600}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{lugar.nombre}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {!chatAbierto && (
        <div className="fixed bottom-10 right-6 z-50 ">
          <div className="relative w-[110px] h-[110px]">
            <div className="absolute inset-0 m-auto w-[95px] h-[95px] bg-white rounded-full shadow-lg z-10"></div>
            {mostrarBurbuja && (
              <div className="absolute -top-6 -left-32 bg-white text-gray-800 text-sm px-4 py-2 rounded-xl shadow-lg z-50 animate-fade-in">
                ¿Necesitas ayuda?
                <div className="absolute top-1/2 -right-1 w-3 h-3 bg-white rotate-45 z-40"></div>
              </div>
            )}
            <button
              title="Don Camarón"
              onClick={() => setChatAbierto(true)}
              className="group w-full h-full relative z-20 transition-transform duration-300 hover:scale-110 float bottom-10"
            >
              <Image
                src="/images/chatbot-camaron.png"
                alt="Don Camarón Chatbot"
                width={110}
                height={110}
                className="rounded-full object-contain group-hover:scale-125 transition-transform duration-300"
              />
            </button>
          </div>
        </div>
      )}

      {chatAbierto && <DonCamaronChat onClose={() => setChatAbierto(false)} />}

      <footer className="text-center text-sm text-gray-600 mt-10">
        <p>&copy; 2024 Destino Rosa</p>
      </footer>
    </div>
  );
}
