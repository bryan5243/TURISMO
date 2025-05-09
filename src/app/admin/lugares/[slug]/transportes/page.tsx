"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Lugar {
    id: number;
    nombre: string;
    slug: string;
}

interface Transporte {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
}

export default function AdminTransportes() {
    const [lugares, setLugares] = useState<Lugar[]>([]);
    const [transportes, setTransportes] = useState<Transporte[]>([]);
    const [slugSeleccionado, setSlugSeleccionado] = useState("");
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenFile, setImagenFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        fetch("/api/lugares")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) setLugares(data);
                else console.error("Lugares mal formateados:", data);
            });
    }, []);

    useEffect(() => {
        if (slugSeleccionado) {
            fetch(`/api/lugares/${slugSeleccionado}/transportes`)
                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data)) setTransportes(data);
                    else console.error("Transportes mal formateados:", data);
                });
        }
    }, [slugSeleccionado]);

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

    const guardarTransporte = async () => {
        if (!nombre || !descripcion || !imagenFile || !slugSeleccionado) {
            return alert("Faltan campos");
        }

        const imagen = await subirImagen();
        if (!imagen) return alert("Error al subir imagen");

        const res = await fetch(`/api/lugares/${slugSeleccionado}/transportes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, descripcion, imagen }),
        });

        if (res.ok) {
            const nuevo = await res.json();
            setTransportes([...transportes, nuevo]);
            setNombre("");
            setDescripcion("");
            setImagenFile(null);
            setPreviewUrl("");
        } else {
            const error = await res.json();
            alert("Error al guardar transporte: " + error.error);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto text-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-white">Agregar Transporte a un Lugar</h1>

            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <label className="block mb-2 font-medium">Selecciona un lugar:</label>
                <select
                    value={slugSeleccionado}
                    onChange={(e) => setSlugSeleccionado(e.target.value)}
                    className="w-full p-2 border rounded mb-3"
                >
                    <option value="">-- Selecciona --</option>
                    {lugares.map((lugar) => (
                        <option key={lugar.id} value={lugar.slug}>
                            {lugar.nombre} (slug: {lugar.slug})
                        </option>
                    ))}
                </select>

                <label className="block mb-2 font-medium">Nombre del transporte:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Bus Interprovincial"
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block mb-2 font-medium">Descripción:</label>
                <textarea
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    placeholder="Ej: Sale desde la terminal cada 30 minutos..."
                    className="w-full p-2 border rounded mb-3"
                />

                <label className="block mb-2 font-medium">Imagen del transporte:</label>
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

                <button
                    onClick={guardarTransporte}
                    className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
                >
                    Guardar Transporte
                </button>
            </div>

            {transportes.length > 0 && (
                <>
                    <h2 className="text-xl font-semibold mb-3 text-white">Transportes registrados:</h2>
                    <ul className="space-y-2">
                        {transportes.map((t) => (
                            <li key={t.id} className="bg-gray-100 p-3 rounded-lg flex items-center gap-4">
                                <img
                                    src={t.imagen}
                                    alt={t.nombre}
                                    className="w-20 h-16 object-cover rounded"
                                />
                                <div>
                                    <strong>{t.nombre}</strong>
                                    <p className="text-sm text-gray-700">{t.descripcion}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
