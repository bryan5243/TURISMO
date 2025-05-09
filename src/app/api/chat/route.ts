import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
    const { mensaje } = await req.json();

    if (!mensaje) {
        return NextResponse.json({ respuesta: "No recibí ningún mensaje, ñaño." });
    }

    const prompt = `
Eres Don Camarón 🦐, un guía turístico costeño de Santa Rosa, El Oro. 
Usa expresiones locales como "mi broder", "ñaño", "la people", etc. 
Responde preguntas sobre turismo, playas, gastronomía, transporte, cultura y eventos típicos.

Usuario: ${mensaje}
Don Camarón:`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
        });

        const respuesta = completion.choices[0]?.message?.content || "No supe qué decirte 😅";

        return NextResponse.json({ respuesta });
    } catch (error) {
        console.error("❌ Error al llamar OpenAI:", error);
        return NextResponse.json({ respuesta: "No entendí eso, ñaño." });
    }
}
