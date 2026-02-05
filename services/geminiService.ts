
// import { GoogleGenAI, Chat } from "@google/genai";
// import { SYSTEM_INSTRUCTION } from "../constants";

// let chatSession: Chat | null = null;

// // export const initializeGeminiChat = (apiKey: string) => {
// //   const ai = new GoogleGenAI({ apiKey });
  
// //   // Use gemini-3-pro-preview for complex reasoning and creative writing tasks
// //   chatSession = ai.chats.create({
// //     model: 'gemini-1.5-flash',
// //     // model: 'gemini-3-pro-preview',
// //     config: {
// //       systemInstruction: SYSTEM_INSTRUCTION,
// //       temperature: 0.7,
// //       topK: 64,
// //       topP: 0.95,
// //       // Removed maxOutputTokens to prevent potential blocking and allow model flexibility
// //       //thinkingConfig: { thinkingBudget: 2048 } 
// //     },
// //   });
// //   return chatSession;
// // };
// export const initializeGeminiChat = (apiKey: string) => {
//   const ai = new GoogleGenAI({ apiKey });
  
//   chatSession = ai.chats.create({
//     // Sử dụng 'gemini-1.5-flash-latest' để đảm bảo lấy bản ổn định nhất
//     model: 'gemini-1.5-flash-latest', 
//     config: {
//       systemInstruction: SYSTEM_INSTRUCTION,
//       temperature: 0.7,
//       // Lưu ý: Chỉ giữ lại các tham số cơ bản dưới đây
//       topK: 40, 
//       topP: 0.95,
//     },
//   });
//   return chatSession;
// };

// export const sendMessageStream = async (message: string, onChunk: (text: string) => void) => {
//   if (!chatSession) throw new Error("Chat session not initialized");

//   try {
//     const responseStream = await chatSession.sendMessageStream({ message });
    
//     for await (const chunk of responseStream) {
//       // Accessing the .text property directly as per GenerateContentResponse guidelines
//       if (chunk.text) {
//         onChunk(chunk.text);
//       }
//     }
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     throw error;
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai"; // Đảm bảo dùng đúng package mới nhất
import { SYSTEM_INSTRUCTION } from "../constants";

let model: any = null;
let chatSession: any = null;

export const initializeGeminiChat = (apiKey: string) => {
  // 1. Khởi tạo với API Key
  const genAI = new GoogleGenerativeAI(apiKey);
  
  // 2. Lấy model trực tiếp (dùng tên đơn giản nhất)
  model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: SYSTEM_INSTRUCTION 
  });

  // 3. Tạo phiên chat từ model
  chatSession = model.startChat({
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
    history: [], // Khởi tạo lịch sử trống
  });

  return chatSession;
};

export const sendMessageStream = async (message: string, onChunk: (text: string) => void) => {
  if (!chatSession) throw new Error("Chat session not initialized");

  try {
    const result = await chatSession.sendMessageStream(message);
    
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      if (chunkText) {
        onChunk(chunkText);
      }
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
