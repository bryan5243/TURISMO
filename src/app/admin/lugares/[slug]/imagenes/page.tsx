// /app/admin/lugares/imagenes/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ImagenLugar {
  id: number;
  url: string;
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

export default function AdminImagenes() {
  const [imagenes, setImagenes] = useState<ImagenLugar[]>([]);
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [lugarId, setLugarId] = useState("");
  const [archivo, setArchivo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    fetch("/api/lugares/imagen")
      .then((res) => res.json())
      .then((data) => {
        const array = Array.isArray(data) ? data : data.imagenes || [];
        setImagenes(array);
      })
      .catch((error) => {
        console.error("Error al obtener imágenes:", error);
        setImagenes([]);
      });

    fetch("/api/lugares")
      .then((res) => res.json())
      .then(setLugares)
      .catch(() => setLugares([]));
  }, []);

  const subirImagen = async () => {
    if (!archivo || !lugarId) return alert("Faltan datos");

    const formData = new FormData();
    formData.append("file", archivo);
    formData.append("lugarId", lugarId);

    const res = await fetch("/api/lugares/imagen", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const nueva = await res.json();
      setImagenes([...imagenes, nueva]);
      setArchivo(null);
      setLugarId("");
      setPreviewUrl("");
    } else {
      alert("Error al guardar la imagen");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-900">
      <h1 className="text-2xl font-bold mb-4">Administrar Imágenes de Lugares</h1>

      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <label className="block mb-2 font-medium">Seleccionar Lugar:</label>
        <select
          value={lugarId}
          onChange={(e) => setLugarId(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="">-- Selecciona un lugar --</option>
          {lugares.map((lugar) => (
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
            const file = e.target.files?.[0] || null;
            setArchivo(file);
            if (file) setPreviewUrl(URL.createObjectURL(file));
          }}
          className="w-full p-2 border rounded mb-4"
        />

        {previewUrl && (
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-1">Vista previa:</p>
            <Image
              src={previewUrl}
              alt="Vista previa de la imagen"
              width={300}
              height={200}
              className="rounded object-cover border shadow"
            />
          </div>
        )}

        <button
          onClick={subirImagen}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          Subir Imagen
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-3">Imágenes existentes:</h2>
      <ul className="space-y-4">
        {Array.isArray(imagenes) && imagenes.map((img) => (
          <li key={img.id} className="bg-gray-100 p-4 rounded-lg flex gap-4 items-center">
            <Image
              src={img.url}
              alt={`Imagen de ${img.lugar?.nombre ?? 'Lugar desconocido'}`}
              width={150}
              height={100}
              className="rounded object-cover"
            />
            <span className="font-medium">{img.lugar?.nombre ?? `ID: ${img.lugarId}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
