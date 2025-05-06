"use client";

import { useState } from "react";
import Image from "next/image";

interface DonCamaronChatProps {
  onClose: () => void;
}

const baseConocimiento = [
  {
    pregunta: "puerto jeli",
    respuesta:
      "Puerto Jelí está a unos 10 minutos del centro de Santa Rosa, ideal para mariscos y paseos en lancha.",
  },
  {
    pregunta: "playas",
    respuesta:
      "Puedes visitar la Playa Jambelí y Las Huacas, muy populares en Santa Rosa.",
  },
  {
    pregunta: "comida",
    respuesta:
      "La comida típica incluye arroz con camarón, ceviche, seco de chivo y empanadas de verde.",
  },
  {
    pregunta: "tembladera",
    respuesta:
      "La Tembladera está al norte de Santa Rosa, conocida por sus manglares y paseos en bote.",
  },
  {
    pregunta: "festival del camarón",
    respuesta:
      "El Festival del Camarón se celebra en enero con eventos culturales y gastronómicos.",
  },
];

function obtenerRespuesta(mensaje: string): string {
  if (!mensaje || typeof mensaje !== "string") return "Lo siento 😅, no entendí tu mensaje.";
  const pregunta = mensaje.toLowerCase();
  const match = baseConocimiento.find((item) => pregunta.includes(item.pregunta));
  return match?.respuesta ||
    "Lo siento 😅, no tengo información sobre eso. Pregunta sobre playas, comida, o sitios turísticos de Santa Rosa.";
}

export default function DonCamaronChat({ onClose }: DonCamaronChatProps) {
  const [mensajes, setMensajes] = useState([
    {
      remitente: "bot",
      texto: "¡Hola! Soy Don Camarón 🦐 ¿En qué te puedo ayudar hoy?",
    },
  ]);
  const [entrada, setEntrada] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

  const enviarMensaje = () => {
    if (!entrada.trim()) return;
    const nuevoMensaje = { remitente: "user", texto: entrada };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    setEscribiendo(true);

    setTimeout(() => {
      const respuesta = { remitente: "bot", texto: obtenerRespuesta(entrada) };
      setMensajes((prev) => [...prev, respuesta]);
      setEscribiendo(false);
    }, 1000);

    setEntrada("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 scale-[1.1]">
      <div className="bg-white w-96 h-[460px] rounded-xl shadow-lg flex flex-col overflow-hidden border">
        <div className="bg-orange-500 text-white px-4 py-2 flex justify-between items-center">
          <span>Don Camarón Asistente</span>
          <button onClick={onClose} className="text-white font-bold text-xl">
            ×
          </button>
        </div>

        <div className="flex-1 p-4 space-y-4 overflow-y-auto text-sm">
          {mensajes.map((msg, i) => (
            <div key={i} className={`flex items-start gap-2 ${msg.remitente === "bot" ? "flex-row" : "flex-row-reverse"}`}>
              <Image
                src={msg.remitente === "bot" ? "/images/chatbot-camaron.png" : "/images/user-generic.png"}
                alt={msg.remitente === "bot" ? "Don Camarón" : "Usuario"}
                width={32}
                height={32}
                className="rounded-full object-cover border"
              />
              <div
                className={`px-3 py-2 rounded-lg max-w-[75%] ${
                  msg.remitente === "bot"
                    ? "bg-orange-100 text-left"
                    : "bg-blue-100 text-right"
                }`}
              >
                {msg.texto}
              </div>
            </div>
          ))}
          {escribiendo && (
            <div className="flex items-start gap-2">
              <Image
                src="/images/chatbot-camaron.png"
                alt="Don Camarón escribiendo"
                width={32}
                height={32}
                className="rounded-full object-cover border"
              />
              <div className="bg-orange-100 px-3 py-2 rounded-lg text-sm text-gray-600 flex items-center gap-1">
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-150">.</span>
                <span className="animate-bounce delay-300">.</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex border-t px-2 py-2 bg-gray-50">
          <input
            type="text"
            className="flex-1 px-2 py-1 text-sm border rounded-l-md focus:outline-none"
            placeholder="Escribe tu pregunta..."
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
          />
          <button
            onClick={enviarMensaje}
            className="bg-orange-500 text-white px-4 rounded-r-md text-sm"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
