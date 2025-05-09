// /app/admin/lugares/restaurantes/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Restaurante {
    id: number;
    nombre: string;
    imagen: string;
    lugarId: number;
    lugar: {
        id: number;
        nombre: string;
    };
}

interface Lugar {
    id: number;
    nombre: string;
}

export default function AdminRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [lugares, setLugares] = useState<Lugar[]>([]);
    const [lugarId, setLugarId] = useState("");
    const [nombre, setNombre] = useState("");
    const [archivo, setArchivo] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");

    useEffect(() => {
        fetch("/api/lugares")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setLugares(data);
                } else {
                    console.error("⚠️ La API /api/lugares no devolvió un array:", data);
                    setLugares([]);
                }
            })
            .catch((err) => {
                console.error("❌ Error al obtener lugares:", err);
                setLugares([]);
            });

        fetch("/api/lugares/restaurantes")
            .then((res) => res.json())
            .then(setRestaurantes)
            .catch((err) => {
                console.error("❌ Error al obtener restaurantes:", err);
                setRestaurantes([]);
            });
    }, []);


    const subirImagen = async (): Promise<string | null> => {
        if (!archivo) return null;
        const formData = new FormData();
        formData.append("file", archivo);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        return data.url || null;
    };

    const guardarRestaurante = async () => {
        if (!nombre || !archivo || !lugarId) return alert("Faltan campos obligatorios");

        const url = await subirImagen();
        if (!url) return alert("Error al subir imagen");

        const res = await fetch("/api/lugares/restaurantes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, imagen: url, lugarId }),
        });

        if (res.ok) {
            const nuevo = await res.json();
            setRestaurantes([...restaurantes, nuevo]);
            setNombre("");
            setLugarId("");
            setArchivo(null);
            setPreviewUrl("");
        } else {
            alert("Error al guardar restaurante");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto text-gray-900">
            <h1 className="text-2xl font-bold mb-4">Administrar Restaurantes</h1>

            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <label className="block mb-2 font-medium">Nombre del restaurante:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block mb-2 font-medium">Lugar:</label>
                <select
                    value={lugarId}
                    onChange={(e) => setLugarId(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                >
                    <option value="">-- Selecciona un lugar --</option>
                    {Array.isArray(lugares) &&
                        lugares.map((lugar) => (
                            <option key={lugar.id} value={lugar.id}>
                                {lugar.nombre}
                            </option>
                        ))}
                </select>


                <label className="block mb-2 font-medium">Imagen:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setArchivo(file);
                            setPreviewUrl(URL.createObjectURL(file));
                        }
                    }}
                    className="w-full p-2 border rounded mb-3"
                />

                {previewUrl && (
                    <div className="mb-4">
                        <Image
                            src={previewUrl}
                            alt="Vista previa"
                            width={300}
                            height={200}
                            className="rounded shadow object-cover h-40"
                        />
                    </div>
                )}

                <button
                    onClick={guardarRestaurante}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                    Guardar Restaurante
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-3">Restaurantes existentes:</h2>
            <ul className="space-y-4">
                {restaurantes.map((r) => (
                    <li key={r.id} className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center">
                        <Image
                            src={r.imagen}
                            alt={`Imagen de ${r.nombre}`}
                            width={150}
                            height={100}
                            className="rounded object-cover"
                        />
                        <span className="font-medium">{r.nombre} - {r.lugar?.nombre ?? `ID: ${r.lugarId}`}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
