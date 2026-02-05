
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

export const initializeGeminiChat = (apiKey: string) => {
  const ai = new GoogleGenAI({ apiKey });
  
  // Use gemini-3-pro-preview for complex reasoning and creative writing tasks
  chatSession = ai.chats.create({
    model: 'gemini-1.5-flash',
    // model: 'gemini-3-pro-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
      topK: 64,
      topP: 0.95,
      // Removed maxOutputTokens to prevent potential blocking and allow model flexibility
      thinkingConfig: { thinkingBudget: 2048 } 
    },
  });
  return chatSession;
};

export const sendMessageStream = async (message: string, onChunk: (text: string) => void) => {
  if (!chatSession) throw new Error("Chat session not initialized");

  try {
    const responseStream = await chatSession.sendMessageStream({ message });
    
    for await (const chunk of responseStream) {
      // Accessing the .text property directly as per GenerateContentResponse guidelines
      if (chunk.text) {
        onChunk(chunk.text);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
