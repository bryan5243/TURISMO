// /api/lugares/imagen/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function GET() {
    try {
        const imagenes = await prisma.imagenLugar.findMany({
            include: { lugar: true },
        });
        return NextResponse.json(imagenes);
    } catch (error) {
        console.error("Error al obtener las imágenes:", error);
        return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const lugarId = formData.get("lugarId");

        if (!file || !lugarId) {
            return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const nombreArchivo = `${Date.now()}-${randomUUID()}-${file.name}`;
        const rutaArchivo = path.join(process.cwd(), "public", "images", nombreArchivo);

        await writeFile(rutaArchivo, buffer);

        const nuevaImagen = await prisma.imagenLugar.create({
            data: {
                url: `/images/${nombreArchivo}`,
                lugarId: parseInt(lugarId.toString()),
            },
            include: { lugar: true },
        });

        return NextResponse.json(nuevaImagen, { status: 201 });
    } catch (error) {
        console.error("Error al crear la imagen:", error);
        return NextResponse.json({ error: "Error del servidor" }, { status: 500 });
    }
}
