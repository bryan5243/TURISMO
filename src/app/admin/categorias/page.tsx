"use client";

import { useState, useEffect } from "react";


import Select from "react-select";
import {
    FaWater,
    FaTree,
    FaUmbrellaBeach,
    FaLandmark,
    FaMountain,
    FaFish,
    FaHotel,
    FaUtensils,
    FaShoppingCart,
    FaChurch,
    FaHiking,
    FaBicycle,
    FaMapMarkedAlt,
    FaCamera,
    FaCar,
    FaShip,
    FaSun,
    FaStar,
    FaHome,
} from "react-icons/fa";

const iconosDisponibles = [
    { label: "FaWater", value: "FaWater", icon: <FaWater /> },
    { label: "FaTree", value: "FaTree", icon: <FaTree /> },
    { label: "FaUmbrellaBeach", value: "FaUmbrellaBeach", icon: <FaUmbrellaBeach /> },
    { label: "FaLandmark", value: "FaLandmark", icon: <FaLandmark /> },
    { label: "FaMountain", value: "FaMountain", icon: <FaMountain /> },
    { label: "FaFish", value: "FaFish", icon: <FaFish /> },
    { label: "FaHotel", value: "FaHotel", icon: <FaHotel /> },
    { label: "FaUtensils", value: "FaUtensils", icon: <FaUtensils /> },
    { label: "FaShoppingCart", value: "FaShoppingCart", icon: <FaShoppingCart /> },
    { label: "FaChurch", value: "FaChurch", icon: <FaChurch /> },
    { label: "FaHiking", value: "FaHiking", icon: <FaHiking /> },
    { label: "FaBicycle", value: "FaBicycle", icon: <FaBicycle /> },
    { label: "FaMapMarkedAlt", value: "FaMapMarkedAlt", icon: <FaMapMarkedAlt /> },
    { label: "FaCamera", value: "FaCamera", icon: <FaCamera /> },
    { label: "FaCar", value: "FaCar", icon: <FaCar /> },
    { label: "FaShip", value: "FaShip", icon: <FaShip /> },
    { label: "FaSun", value: "FaSun", icon: <FaSun /> },
    { label: "FaStar", value: "FaStar", icon: <FaStar /> },
    { label: "FaHome", value: "FaHome", icon: <FaHome /> },
];


const customStyles = {
    option: (provided: any) => ({
        ...provided,
        display: "flex",
        alignItems: "center",
        gap: "10px",
    }),
};

const formatOptionLabel = ({ label, icon }: any) => (
    <div className="flex items-center gap-2">
        {icon}
        {label}
    </div>
);

interface Categoria {
    id: number;
    nombre: string;
    icono: string;
}


export default function AdminCategorias() {
    const [nombre, setNombre] = useState("");
    const [icono, setIcono] = useState("");
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    useEffect(() => {
        fetch("/api/categorias")
            .then((res) => res.json())
            .then((data) => setCategorias(data));
    }, []);

    const guardarCategoria = async () => {
        if (!nombre || !icono) return alert("Completa los campos");

        const res = await fetch("/api/categorias", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, icono }),
        });

        if (res.ok) {
            const nueva = await res.json();
            setCategorias([...categorias, nueva]);
            setNombre("");
            setIcono("");
        } else {
            const error = await res.json();
            alert("Error al guardar: " + error.error);
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto text-gray-900">
            <h1 className="text-2xl font-bold mb-4">Administrar Categorías</h1>

            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <label className="block mb-2 font-medium text-gray-700">Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Playas"
                    className="w-full p-2 border rounded mb-4 bg-white text-gray-800 placeholder:text-gray-500"
                />

                <label className="block mb-2 font-medium text-gray-700">Icono:</label>
                <Select
                    options={iconosDisponibles}
                    value={iconosDisponibles.find((i) => i.value === icono)}
                    onChange={(e) => setIcono(e?.value || "")}
                    styles={customStyles}
                    formatOptionLabel={formatOptionLabel}
                />


                <button
                    onClick={guardarCategoria}
                    className="bg-orange-500 mt-3 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                    Guardar Categoría
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-2">Categorías existentes:</h2>
            <ul className="space-y-2">
                {categorias.map((cat) => (
                    <li
                        key={cat.id}
                        className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
                    >
                        <span>{cat.nombre}</span>
                        <code className="text-gray-600">{cat.icono}</code>
                    </li>
                ))}
            </ul>
        </div>
    );
}
