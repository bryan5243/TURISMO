import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

interface Context {
  params: {
    slug: string;
  };
}

/**
 * POST /api/lugares/[slug]/hoteles
 * Crea un hotel relacionado al lugar identificado por su slug.
 */
export async function POST(
  request: NextRequest,
  { params }: Context
) {
  try {
    const { slug } = params;
    const { nombre, imagen } = await request.json();

    if (!nombre || !imagen) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const lugar = await prisma.lugar.findUnique({ where: { slug } });

    if (!lugar) {
      return NextResponse.json(
        { error: "Lugar no encontrado" },
        { status: 404 }
      );
    }

    const nuevoHotel = await prisma.hotel.create({
      data: {
        nombre,
        imagen,
        lugarId: lugar.id,
      },
    });

    return NextResponse.json(nuevoHotel);
  } catch (error) {
    console.error("❌ Error al crear hotel:", error);
    return NextResponse.json(
      { error: "Error al guardar hotel" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/lugares/[slug]/hoteles
 * Lista todos los hoteles del lugar especificado por su slug.
 */
export async function GET(
  _request: NextRequest,
  { params }: Context
) {
  try {
    const { slug } = params;

    const lugar = await prisma.lugar.findUnique({
      where: { slug },
      include: {
        hoteles: true,
      },
    });

    if (!lugar) {
      return NextResponse.json(
        { error: "Lugar no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(lugar.hoteles);
  } catch (error) {
    console.error("❌ Error al obtener hoteles:", error);
    return NextResponse.json(
      { error: "Error al cargar hoteles" },
      { status: 500 }
    );
  }
}
