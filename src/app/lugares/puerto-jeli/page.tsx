"use client";

import Image from "next/image";
import HeaderDestinoRosa from "@/components/header";
import { useState } from "react";
import { FaMapMarkerAlt, FaUtensils, FaHotel } from "react-icons/fa";
import DonCamaronWidget from "@/components/DonCamaron";
import { useMediaQuery } from "react-responsive";
import Slider from "react-slick";

export default function PuertoJeliPage() {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [fotoActual, setFotoActual] = useState(0);

    const imagenes = [
        "jeli1.jpg",
        "jeli2.jpg",
        "jeli3.jpg",
        "jeli4.jpg",
        "jeli5.jpg",
    ];

    const restaurantes = [
        { nombre: "Mariscos Don Pepe", imagen: "/images/rest1.jpg" },
        { nombre: "La Cabaña del Camarón", imagen: "/images/rest2.jpg" },
        { nombre: "La choz del lobo", imagen: "/images/rest3.jpg" },

    ];

    const hoteles = [
        { nombre: "Hotel Puerto Azul", imagen: "/images/hotel1.jpg" },
        { nombre: "Hostal Bahía Linda", imagen: "/images/hotel2.jpg" },
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_: number, next: number) => setFotoActual(next),
    };

    return (
        <>
            <HeaderDestinoRosa />

            <div className="min-h-screen bg-[#fefcf8] px-4 md:px-16 py-10 text-gray-900">
                {/* Galería responsive */}
                {isMobile ? (
                    <div className="relative mb-8 rounded-xl overflow-hidden">
                        <Slider {...sliderSettings}>
                            {imagenes.map((img, i) => (
                                <div key={i}>
                                    <Image
                                        src={`/images/${img}`}
                                        alt={`Puerto Jelí ${i + 1}`}
                                        width={800}
                                        height={500}
                                        className="w-full h-64 object-cover rounded-xl"
                                    />
                                </div>
                            ))}
                        </Slider>
                        <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                            {fotoActual + 1} / {imagenes.length}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8">
                        <div className="col-span-2 row-span-2 relative">
                            <Image
                                src={`/images/${imagenes[0]}`}
                                alt="Puerto Jelí principal"
                                width={800}
                                height={500}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        {imagenes.slice(1).map((img, i) => (
                            <div key={i} className="relative">
                                <Image
                                    src={`/images/${img}`}
                                    alt={`Puerto Jelí ${i + 2}`}
                                    width={400}
                                    height={250}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                                {i === 3 && (
                                    <button className="absolute bottom-2 right-2 bg-white bg-opacity-80 px-3 py-1 rounded-md text-sm font-medium text-gray-800 shadow-md hover:bg-opacity-100 transition">
                                        Mostrar todas las fotos
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Información principal */}
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold">Puerto Jelí</h1>
                    <p className="text-lg text-gray-600">Santa Rosa</p>
                    <p className="mt-2 text-gray-700">
                        Puerto Jelí está ubicado a unos 10 minutos del centro de Santa Rosa. Es un destino ideal para disfrutar de mariscos frescos y paseos en lancha.
                    </p>
                </div>

                {/* Mapa */}
                <div className="mb-10">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" /> ¿Dónde queda?
                    </h2>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.3028447201814!2d-79.97238815431394!3d-3.461792513309739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90331cfa2bfa8c75%3A0x11cabc1813408ae3!2sPuerto%20Jel%C3%AD!5e0!3m2!1ses!2sec!4v1715197076487!5m2!1ses!2sec"
                        width="100%"
                        height="300"
                        allowFullScreen
                        loading="lazy"
                        className="rounded-lg border"
                    ></iframe>
                </div>
                {/* Transportes */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-purple-600" /> Transportes
                    </h2>
                    {isMobile ? (
                        <Slider {...sliderSettings}>
                            {[
                                {
                                    nombre: "Cooperativa Trans Santa Rosa",
                                    imagen: "/images/transporte1.jpg",
                                    descripcion: "Servicio de buses interparroquiales. Salidas cada 30 minutos.",
                                },
                                {
                                    nombre: "Taxis Puerto Jelí",
                                    imagen: "/images/transporte2.jpg",
                                    descripcion: "Servicio directo desde Santa Rosa por $3 - $4. Atención 24/7.",
                                },
                            ].map((t, i) => (
                                <div key={i} className="px-2">
                                    <div className="bg-white rounded-xl shadow overflow-hidden">
                                        <Image
                                            src={t.imagen}
                                            alt={t.nombre}
                                            width={400}
                                            height={250}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-3">
                                            <h3 className="text-md font-semibold text-gray-800">{t.nombre}</h3>
                                            <p className="text-sm text-gray-600">{t.descripcion}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            <div className="bg-white rounded-xl shadow overflow-hidden">
                                <Image
                                    src="/images/transporte1.jpg"
                                    alt="Cooperativa Trans Santa Rosa"
                                    width={400}
                                    height={250}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-md font-semibold text-gray-800">Cooperativa Trans Santa Rosa</h3>
                                    <p className="text-sm text-gray-600">Servicio de buses interparroquiales. Salidas desde el centro cada 30 minutos.</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow overflow-hidden">
                                <Image
                                    src="/images/transporte2.jpg"
                                    alt="Taxis Puerto Jelí"
                                    width={400}
                                    height={250}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-md font-semibold text-gray-800">Taxis Puerto Jelí</h3>
                                    <p className="text-sm text-gray-600">Servicio directo desde Santa Rosa por $3 - $4. Atención 24/7.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </section>


                {/* Restaurantes */}
                {/* Restaurantes */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaUtensils className="text-orange-500" /> Restaurantes
                    </h2>
                    {isMobile ? (
                        <Slider {...sliderSettings}>
                            {restaurantes.map((r, i) => (
                                <div key={i} className="px-2">
                                    <div className="bg-white rounded-xl shadow overflow-hidden">
                                        <Image
                                            src={r.imagen}
                                            alt={r.nombre}
                                            width={400}
                                            height={250}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-3">
                                            <h3 className="text-md font-semibold text-gray-800">{r.nombre}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {restaurantes.map((r) => (
                                <div key={r.nombre} className="bg-white rounded-xl shadow overflow-hidden">
                                    <Image
                                        src={r.imagen}
                                        alt={r.nombre}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-3">
                                        <h3 className="text-md font-semibold text-gray-800">{r.nombre}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>


                {/* Hoteles */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaHotel className="text-green-600" /> Hoteles
                    </h2>
                    {isMobile ? (
                        <Slider {...sliderSettings}>
                            {hoteles.map((h, i) => (
                                <div key={i} className="px-2">
                                    <div className="bg-white rounded-xl shadow overflow-hidden">
                                        <Image
                                            src={h.imagen}
                                            alt={h.nombre}
                                            width={400}
                                            height={250}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="p-3">
                                            <h3 className="text-md font-semibold text-gray-800">{h.nombre}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {hoteles.map((h) => (
                                <div key={h.nombre} className="bg-white rounded-xl shadow overflow-hidden">
                                    <Image
                                        src={h.imagen}
                                        alt={h.nombre}
                                        width={400}
                                        height={250}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-3">
                                        <h3 className="text-md font-semibold text-gray-800">{h.nombre}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>


                <DonCamaronWidget />

                <footer className="text-center text-sm text-gray-600 mt-10">
                    <p>&copy; 2024 Destino Rosa</p>
                </footer>
            </div>
        </>
    );
}
