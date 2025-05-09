import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Función para generar slug tipo 'puerto-jeli'
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD") // Quita tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// ✅ GET: obtener todos los lugares con su categoría
export async function GET() {
  try {
    const lugares = await prisma.lugar.findMany({
      include: {
        categoria: true, // Esto es clave para mostrar en el Home
      },
    });

    return NextResponse.json(lugares); // Retorna array directo
  } catch (error) {
    console.error("❌ Error al obtener lugares:", error);
    return NextResponse.json({ error: "Error al obtener lugares" }, { status: 500 });
  }
}

// ✅ POST: crear nuevo lugar
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, descripcion, imagen, categoriaId, latitud, longitud } = body;

    if (!nombre || !imagen || !categoriaId || !latitud || !longitud) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    const slug = slugify(nombre);

    const nuevoLugar = await prisma.lugar.create({
      data: {
        nombre,
        descripcion,
        imagen,
        slug,
        latitud,
        longitud,
        categoria: {
          connect: {
            id: Number(categoriaId),
          },
        },
      },
      include: { categoria: true }, // Esto es necesario si lo quieres mostrar inmediatamente en Home
    });

    return NextResponse.json(nuevoLugar);
  } catch (error) {
    console.error("❌ Error al guardar lugar:", error);
    return NextResponse.json({ error: "Error al guardar lugar" }, { status: 500 });
  }
}
