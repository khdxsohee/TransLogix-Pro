
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const optimizeRoute = async (origin: string, destination: string, cargo: string) => {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Suggest an optimized route for a heavy commercial truck from ${origin} to ${destination} carrying ${cargo}. Include potential risks, fuel saving tips, and an estimated timeframe. Format the response as a clear logical structure.`,
    config: {
      temperature: 0.7,
      topP: 0.95,
      topK: 40
    }
  });

  const response = await model;
  return response.text;
};

export const getLogisticsSummary = async (shipmentsCount: number, delayCount: number) => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a logistics director. Provide a concise 2-sentence summary of operational health for a fleet with ${shipmentsCount} total shipments and ${delayCount} current delays.`,
  });
  return response.text;
};
