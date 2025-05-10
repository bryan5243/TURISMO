"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import HeaderDestinoRosa from "@/components/header";
import DonCamaronWidget from "@/components/DonCamaron";
import { FaMapMarkerAlt, FaUtensils, FaHotel } from "react-icons/fa";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Footer from "@/components/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface ImagenLugar {
    id: number;
    url: string;
}

interface Restaurante {
    id: number;
    nombre: string;
    imagen: string;
}

interface Hotel {
    id: number;
    nombre: string;
    imagen: string;
}

interface Transporte {
    id: number;
    nombre: string;
    imagen: string;
    descripcion: string;
}

interface Lugar {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
    categoria: { nombre: string };
    imagenes: ImagenLugar[];
    restaurantes: Restaurante[];
    hoteles: Hotel[];
    transportes: Transporte[];
    latitud: number;
    longitud: number;
}

export default function LugarPage() {
    const { slug } = useParams();
    const [lugar, setLugar] = useState<Lugar | null>(null);
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [fotoActual, setFotoActual] = useState(0);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_: number, next: number) => setFotoActual(next),
    };

    const renderSlider = (items: any[], tipo: "transporte" | "restaurante" | "hotel") => (
        <Slider {...sliderSettings}>
            {items.map((item: any) => (
                <div key={item.id} className="px-2">
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <Image
                            src={item.imagen}
                            alt={item.nombre}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-3">
                            <h3 className="text-md font-semibold text-gray-800">{item.nombre}</h3>
                            {tipo === "transporte" && (
                                <p className="text-sm text-gray-600">{item.descripcion}</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );

    useEffect(() => {
        fetch(`/api/lugares/${slug}`)
            .then((res) => res.json())
            .then(setLugar);
    }, [slug]);

    if (!lugar) return <div className="p-10">Cargando...</div>;

    return (
        <>
            <HeaderDestinoRosa />
            <div className="min-h-screen bg-[#fefcf8] px-4 md:px-16 py-10 text-gray-900">
                {isMobile ? (
                    <div className="relative mb-8 rounded-xl overflow-hidden">
                        <Slider {...sliderSettings}>
                            {lugar.imagenes.map((img) => (
                                <div key={img.id}>
                                    <Image
                                        src={img.url}
                                        alt={lugar.nombre}
                                        width={800}
                                        height={500}
                                        className="w-full h-64 object-cover rounded-xl"
                                    />
                                </div>
                            ))}
                        </Slider>
                        <div className="absolute bottom-3 right-3 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                            {fotoActual + 1} / {lugar.imagenes.length}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-xl overflow-hidden mb-8">
                        <div className="col-span-2 row-span-2 relative">
                            <Image
                                src={lugar.imagenes[0]?.url}
                                alt={lugar.nombre}
                                width={800}
                                height={500}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        </div>
                        {lugar.imagenes.slice(1).map((img) => (
                            <div key={img.id} className="relative">
                                <Image
                                    src={img.url}
                                    alt={lugar.nombre}
                                    width={400}
                                    height={250}
                                    className="w-full h-full object-cover rounded-xl"
                                />
                            </div>
                        ))}
                    </div>
                )}

                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold">{lugar.nombre}</h1>
                    <p className="text-lg text-gray-600">Santa Rosa</p>
                    <p className="mt-2 text-gray-700 text-justify">{lugar.descripcion}</p>
                </div>

                <div className="mb-10 relative">
                    <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-600" /> ¿Dónde queda?
                    </h2>

                    <div className="relative">
                        <iframe
                            src={`https://www.google.com/maps?q=${lugar.latitud},${lugar.longitud}&z=16&output=embed`}
                            width="100%"
                            height="300"
                            allowFullScreen
                            loading="lazy"
                            className="rounded-lg border"
                        ></iframe>

                        <button
                            onClick={() => {
                                const url = `https://www.google.com/maps/search/?api=1&query=${lugar.latitud},${lugar.longitud}`;
                                window.open(url, "_blank");
                            }}
                            className="absolute bottom-3 right-3 bg-white bg-opacity-90 text-blue-600 px-3 py-1 rounded-md text-sm font-medium shadow hover:bg-opacity-100 transition"
                        >
                            Ver en Google Maps
                        </button>
                    </div>
                </div>

                {/* Transportes */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-purple-600" /> Transportes
                    </h2>
                    {isMobile
                        ? renderSlider(lugar.transportes, "transporte")
                        : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {lugar.transportes.map(t => (
                                    <div key={t.id} className="bg-white rounded-xl shadow overflow-hidden">
                                        <Image src={t.imagen} alt={t.nombre} width={400} height={250} className="w-full h-48 object-cover" />
                                        <div className="p-3">
                                            <h3 className="text-md font-semibold text-gray-800">{t.nombre}</h3>
                                            <p className="text-sm text-gray-600">{t.descripcion}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                </section>

                {/* Restaurantes */}
                <section className="mb-12">
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <FaUtensils className="text-orange-500" /> Restaurantes
                    </h2>
                    {isMobile
                        ? renderSlider(lugar.restaurantes, "restaurante")
                        : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {lugar.restaurantes.map(r => (
                                    <div key={r.id} className="bg-white rounded-xl shadow overflow-hidden">
                                        <Image src={r.imagen} alt={r.nombre} width={400} height={250} className="w-full h-48 object-cover" />
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
                    {isMobile
                        ? renderSlider(lugar.hoteles, "hotel")
                        : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {lugar.hoteles.map(h => (
                                    <div key={h.id} className="bg-white rounded-xl shadow overflow-hidden">
                                        <Image src={h.imagen} alt={h.nombre} width={400} height={250} className="w-full h-48 object-cover" />
                                        <div className="p-3">
                                            <h3 className="text-md font-semibold text-gray-800">{h.nombre}</h3>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                </section>

                <DonCamaronWidget />
                <Footer />
            </div>
        </>
    );
}
