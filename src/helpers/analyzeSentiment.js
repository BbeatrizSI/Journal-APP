import axios from "axios";

// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Para GitHub Pages
const getApiKey = async () => {
    try {
        const response = await fetch("/config.json");
        const data = await response.json();
        return data.gemini_api_key;
    } catch (error) {
        console.error("Error al obtener la API Key:", error);
        return null; // Devuelve null en caso de error
    }
};

export const analyzeSentiment = async (text) => {
    const apiKey = await getApiKey(); // Obtenemos la API Key antes de hacer la petición

    if (!apiKey) {
        console.error("API Key no encontrada.");
        return "Error: No se pudo obtener la API Key.";
    }
    
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    const prompt = `
        Analiza el siguiente texto y determina si es positivo, negativo o neutro.
        Si es negativo, explica por qué en un párrafo. Si es positivo, destaca el motivo por el que lo es. Si es neutro o negativo, ofrece una frase de ánimo o bonita.
        
        Devuélveme exclusivamente un JSON con la siguiente estructura:
        {
            "etiqueta": "POSITIVE | NEUTRAL | NEGATIVE",
            "explicacion": "Explicación del análisis del texto.",
            "frase": "Una frase de ánimo o relevante al análisis."
        }

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
