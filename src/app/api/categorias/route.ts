import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
    const categorias = await prisma.categoria.findMany();
    return NextResponse.json(categorias);
}

export async function POST(req: Request) {
    const { nombre, icono } = await req.json();

    if (!nombre || !icono) {
        return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    try {
        const nuevaCategoria = await prisma.categoria.create({
            data: { nombre, icono },
        });
        return NextResponse.json(nuevaCategoria, { status: 201 });
    } catch (err) {
        console.error("❌ Error al guardar categoría:", err);
        return NextResponse.json({ error: "Error en el servidor" }, { status: 500 });
    }
}
