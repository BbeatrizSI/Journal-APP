import { useSelector } from "react-redux";

export const useWellbeingScore = () => {
    const { positive, neutral, negative } = useSelector((state) => state.sentiment);
    const total = positive + neutral + negative;

    if (total === 0) return 50; // Valor neutro inicial (puedes cambiarlo)

    // Fórmula: % de notas positivas sobre el total
    return Math.round((positive / total) * 100);
};
