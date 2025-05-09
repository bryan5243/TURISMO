"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Mapa = dynamic(() => import("./MapSelector"), { ssr: false });

interface Categoria {
    id: number;
    nombre: string;
}

interface Lugar {
    id: number;
    nombre: string;
    descripcion?: string;
    imagen: string;
    categoriaId: number;
    categoria?: Categoria;
}

export default function AdminLugares() {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [latitud, setLatitud] = useState<number | null>(null);
    const [longitud, setLongitud] = useState<number | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [lugares, setLugares] = useState<Lugar[]>([]);

    useEffect(() => {
        fetch("/api/categorias")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCategorias(data);
                } else {
                    console.error("⚠️ Categorías mal formateadas:", data);
                }
            });

        fetch("/api/lugares")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setLugares(data);
                } else if (Array.isArray(data.lugares)) {
                    setLugares(data.lugares);
                } else {
                    console.error("⚠️ Lugares mal formateados:", data);
                }
            });
    }, []);

    const subirImagen = async (): Promise<string | null> => {
        if (!imagenFile) return null;
        const formData = new FormData();
        formData.append("file", imagenFile);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        return data.url || null;
    };

    const guardarLugar = async () => {
        if (!nombre || !categoriaId || !imagenFile || !latitud || !longitud) {
            return alert("Faltan campos obligatorios.");
        }

        const urlImagen = await subirImagen();
        if (!urlImagen) return alert("Error al subir imagen");

        const res = await fetch("/api/lugares", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nombre,
                descripcion,
                imagen: urlImagen,
                categoriaId: Number(categoriaId),
                latitud,
                longitud,
            }),
        });

        if (res.ok) {
            const nuevo = await res.json();
            setLugares([...lugares, nuevo]);
            setNombre("");
            setDescripcion("");
            setImagenFile(null);
            setCategoriaId("");
            setPreviewUrl("");
            setLatitud(null);
            setLongitud(null);
        } else {
            const error = await res.json();
            alert("Error al guardar: " + error.error);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto text-gray-900">
            <h1 className="text-2xl font-bold mb-4">Administrar Lugares Turísticos</h1>

            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <label className="block mb-2 font-medium">Nombre:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Puerto Jelí"
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block mb-2 font-medium">Descripción:</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Lugar ideal para comer mariscos y pasear en lancha..."
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block mb-2 font-medium">Imagen:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            setImagenFile(file);
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

                <label className="block mb-2 font-medium">Categoría:</label>
                <select
                    value={categoriaId}
                    onChange={(e) => setCategoriaId(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                >
                    <option value="">-- Selecciona una categoría --</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.nombre}
                        </option>
                    ))}
                </select>

                <label className="block mb-2 font-medium">Ubicación (haz clic en el mapa):</label>
                <Mapa
                    onSelectLocation={(lat, lng) => {
                        setLatitud(lat);
                        setLongitud(lng);
                    }}
                    lat={latitud}
                    lng={longitud}
                />

                <button
                    onClick={guardarLugar}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                    Guardar Lugar
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-3">Lugares existentes:</h2>
            <ul className="space-y-2">
                {Array.isArray(lugares) && lugares.length > 0 ? (
                    lugares.map((lugar) => (
                        <li key={lugar.id} className="bg-gray-100 p-3 rounded-lg">
                            <strong>{lugar.nombre}</strong> - {lugar.categoria?.nombre || "Sin categoría"}
                        </li>
                    ))
                ) : (
                    <li>No hay lugares registrados. 😢</li>
                )}
            </ul>
        </div>
    );
}
