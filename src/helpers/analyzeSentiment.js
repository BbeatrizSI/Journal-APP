import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const analyzeSentiment = async (text) => {
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const prompt = `
        Analiza el siguiente texto y determina si es positivo, negativo o neutro.
        Si es negativo, explica por qué en un párrafo. Si es positivo, destaca el motivo por el que lo es. Si es neutro o negativo, ofrece una frase de ánimo o bonita.
        Necesito la siguiente estructura:
        1. Etiqueta (POSITIVE, NEUTRAL o NEGATIVE)
        2. Explicación
        3. Frase
        Texto: "${text}"
    `;

    try {
        const response = await axios.post(API_URL, {
            contents: [{ parts: [{ text: prompt }] }],
        });

        return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Error en la API de Gemini:", error);
        return "Error al analizar el sentimiento.";
    }
};
