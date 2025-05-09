"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import DonCamaronChat from "./DonCamaronChat";

export default function DonCamaronWidget() {
    const [chatAbierto, setChatAbierto] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setMostrarBurbuja(true);
        }, 10000);
        return () => clearTimeout(timer);
    }, []);
    const [mostrarBurbuja, setMostrarBurbuja] = useState(false);

    return (
        <>

            {!chatAbierto && (
                <div className="fixed bottom-10 right-6 z-50 ">
                    <div className="relative w-[110px] h-[110px]">
                        <div className="absolute inset-0 m-auto w-[95px] h-[95px] bg-white rounded-full z-10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]"></div>
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
        </>
    );
}
