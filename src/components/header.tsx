"use client";
import Image from "next/image";
import { FaSearch, FaUserCircle } from "react-icons/fa";

export default function HeaderDestinoRosa() {
    return (
        <header className="sticky top-0 z-50 w-full bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 md:px-10 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Image
                        src="/images/logo-camaron.png"
                        alt="Destino Rosa Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="text-xl font-bold text-orange-600">Destino Rosa</span>
                </div>

                {/* Buscador */}
                <div className="hidden md:flex flex-1 justify-center px-6">
                    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm w-full max-w-2xl">
                        <input
                            type="text"
                            placeholder="Buscar lugares..."
                            className="outline-none flex-grow text-sm text-gray-600 bg-transparent"
                        />
                        <FaSearch className="text-orange-500" />
                    </div>
                </div>

                {/* Menú derecho */}
                <div className="flex items-center gap-4">
                    <button
                        title="Ayuda con Don Camarón"
                        className="text-sm text-gray-600 hover:text-orange-500"
                    >
                        ¿Necesitas ayuda?
                    </button>
                    <FaUserCircle className="text-3xl text-gray-500 hover:text-orange-500" />
                </div>
            </div>
        </header>
    );
}
