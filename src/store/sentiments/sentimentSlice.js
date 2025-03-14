import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    positive: 0,
    neutral: 0,
    negative: 0,
};

export const sentimentSlice = createSlice({
    name: "sentiment",
    initialState,
    reducers: {
        addSentiment: (state, action) => {
            if (action.payload === "POSITIVE") state.positive += 1;
            if (action.payload === "NEUTRAL") state.neutral += 1;
            if (action.payload === "NEGATIVE") state.negative += 1;
        },
        resetSentiment: () => initialState, // Para reiniciar estadísticas si lo deseas
    },
});

export const { addSentiment, resetSentiment } = sentimentSlice.actions;
