import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(
    request: NextRequest,
    context: { params: { slug: string } }
) {
    try {
        const { slug } = await Promise.resolve(context.params);
        const { nombre, descripcion, imagen } = await request.json(); // ✅ ahora incluye imagen

        if (!nombre || !descripcion || !imagen) {
            return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
        }

        const lugar = await prisma.lugar.findUnique({ where: { slug } });
        if (!lugar) {
            return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 });
        }

        const transporte = await prisma.transporte.create({
            data: {
                nombre,
                descripcion,
                imagen, // ✅ nuevo campo
                lugarId: lugar.id,
            },
        });

        return NextResponse.json(transporte);
    } catch (error) {
        console.error("❌ Error al guardar transporte:", error);
        return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }
}

export async function GET(
    _request: NextRequest,
    context: { params: { slug: string } }
) {
    try {
        const { slug } = await Promise.resolve(context.params);
        const lugar = await prisma.lugar.findUnique({
            where: { slug },
            include: { transportes: true },
        });

        if (!lugar) {
            return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 });
        }

        return NextResponse.json(lugar.transportes);
    } catch (error) {
        console.error("❌ Error al obtener transportes:", error);
        return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }
}
