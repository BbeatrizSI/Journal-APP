import axios from "axios";

// const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Para GitHub Pages
const API_URL = "https://gemini-api-key.bbeatriz.workers.dev/"

export const analyzeSentiment = async (text) => {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        return await response.json();
    } catch (error) {
        console.error("Error en Cloudflare Worker:", error);
        return "Error al analizar el sentimiento.";
    }
};
