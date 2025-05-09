import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    // 🔧 Esperar a que context esté resuelto (obligatorio)
    const { slug } = await Promise.resolve(context.params);

    const lugar = await prisma.lugar.findFirst({
      where: { slug },
      include: {
        categoria: true,
        imagenes: true,
        hoteles: true,
        restaurantes: true,
        transportes: true,
      },
    });

    if (!lugar) {
      return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 });
    }

    return NextResponse.json(lugar);
  } catch (error) {
    console.error("❌ Error al obtener lugar:", error);
    return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
  }
}
