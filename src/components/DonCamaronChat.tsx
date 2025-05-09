"use client";

import { useState } from "react";
import Image from "next/image";

interface DonCamaronChatProps {
  onClose: () => void;
}

interface Mensaje {
  remitente: "user" | "bot";
  texto: string;
}

export default function DonCamaronChat({ onClose }: DonCamaronChatProps) {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      remitente: "bot",
      texto: "¡Hola! Soy Don Camarón 🦐 ¿En qué te puedo ayudar hoy?",
    },
  ]);
  const [entrada, setEntrada] = useState<string>(""); // ✅ el estado se define bien
  const [escribiendo, setEscribiendo] = useState<boolean>(false);

  const enviarMensaje = async () => {
    const texto = entrada.trim();
    if (!texto) return;

    // Añadir el mensaje del usuario
    setMensajes((prev) => [...prev, { remitente: "user", texto }]);
    setEntrada("");
    setEscribiendo(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: texto }),
      });

      const data = await res.json();
      const respuesta = data.respuesta || "😅 No entendí eso, ñaño.";

      setMensajes((prev) => [...prev, { remitente: "bot", texto: respuesta }]);
    } catch (error) {
      setMensajes((prev) => [
        ...prev,
        {
          remitente: "bot",
          texto: "❌ No pude conectarme al servidor, mi broder.",
        },
      ]);
    } finally {
      setEscribiendo(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-2 left-2 md:right-4 md:left-auto z-50">
      <div className="bg-white w-full max-w-md mx-auto h-[80vh] md:h-[460px] rounded-xl shadow-lg flex flex-col overflow-hidden border">
        {/* Header */}
        <div className="bg-orange-500 text-white px-4 py-2 flex justify-between items-center">
          <span className="text-sm md:text-base">Don Camarón Asistente</span>
          <button onClick={onClose} className="text-white font-bold text-xl">
            ×
          </button>
        </div>

        {/* Mensajes */}
        <div className="flex-1 p-3 md:p-4 space-y-3 overflow-y-auto text-sm">
          {mensajes.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${msg.remitente === "bot" ? "flex-row" : "flex-row-reverse"
                }`}
            >
              <Image
                src={
                  msg.remitente === "bot"
                    ? "/images/chatbot-camaron.png"
                    : "/images/user-generic.png"
                }
                alt={msg.remitente === "bot" ? "Don Camarón" : "Usuario"}
                width={28}
                height={28}
                className="rounded-full object-cover border"
              />
              <div
                className={`px-3 py-2 rounded-lg max-w-[80%] ${msg.remitente === "bot"
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
                width={28}
                height={28}
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

        {/* Input */}
        <div className="flex border-t px-4 py-3 bg-gray-50">
          <input
            type="text"
            value={entrada}
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && enviarMensaje()}
            placeholder="Escribe tu pregunta..."
            className="flex-1 px-3 py-2 text-sm border rounded-l-md focus:outline-none"
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
