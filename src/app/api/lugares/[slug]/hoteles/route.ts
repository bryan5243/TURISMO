import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: { slug: string } }
) {
  try {
    const slug = context.params.slug;

    const lugar = await prisma.lugar.findUnique({
      where: { slug },
      include: {
        hoteles: true,
      },
    });

    if (!lugar) {
      return NextResponse.json({ error: "Lugar no encontrado" }, { status: 404 });
    }

    return NextResponse.json(lugar.hoteles);
  } catch (error) {
    console.error("[GET_HOTELES_ERROR]", error);
    return NextResponse.json({ error: "Error al obtener hoteles" }, { status: 500 });
  }
}
