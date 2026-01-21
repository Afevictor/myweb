import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_INSTRUCTION } from "../constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

/**
 * Gets an intelligent conversational response from the AI assistant.
 * This is used to answer business-specific questions while maintaining the lead flow.
 */
export const getIntelligentResponse = async (userMessage: string, chatHistory: { role: string; text: string }[]) => {
    if (!genAI) return null;

    try {
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            systemInstruction: `
            ${SYSTEM_INSTRUCTION}
            
            CORE CHATBOT RULES:
            - You are helping provide context to a structured support bot.
            - If the user asks a question about Verturn AI, answer it briefly and professionally.
            - Keep responses concise (under 2 sentences).
            - Always refer to the user as their name if provided in the history.
        `
        });

        const history = chatHistory.map(m => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }));

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(userMessage);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error("Gemini Error:", error);
        return null;
    }
};
