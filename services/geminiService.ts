
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Standard client initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const editImageWithNanoBanana = async (
  base64Image: string,
  prompt: string
): Promise<string | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image.split(',')[1], // Remove prefix if exists
              mimeType: 'image/png',
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Error editing image with Nano Banana:", error);
    return null;
  }
};

export const getSmartResponse = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: "You are a helpful hotel concierge assistant for Lumina Grand. Be polite, professional, and helpful."
      }
    });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini Text Error:", error);
    return "The concierge is currently busy. Please try again later.";
  }
};
