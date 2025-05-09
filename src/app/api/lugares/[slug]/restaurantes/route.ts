// /app/api/lugares/restaurantes/route.ts
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Obtener todos los restaurantes
export async function GET() {
  try {
    const restaurantes = await prisma.restaurante.findMany({
      include: {
        lugar: true,
      },
    });
    return NextResponse.json(restaurantes);
  } catch (error) {
    console.error("❌ Error al obtener restaurantes:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}

// Crear nuevo restaurante
export async function POST(req: NextRequest) {
  try {
    const { nombre, imagen, lugarId } = await req.json();

    if (!nombre || !imagen || !lugarId) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const nuevoRestaurante = await prisma.restaurante.create({
      data: {
        nombre,
        imagen,
        lugarId: parseInt(lugarId),
      },
      include: { lugar: true },
    });

    return NextResponse.json(nuevoRestaurante, { status: 201 });
  } catch (error) {
    console.error("❌ Error al crear restaurante:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
