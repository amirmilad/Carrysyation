import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getStylingAdvice = async (userQuery: string, language: 'en' | 'ar'): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash'; 
    const systemPrompt = language === 'en' 
      ? `You are a high-end fashion stylist for "CarryStation", a luxury handbag store. 
         Briefly suggest which type of bag (Tote, Clutch, Crossbody, Satchel, etc.) matches the user's outfit or occasion. 
         Keep it chic, professional, and under 60 words.`
      : `أنت خبيرة أزياء راقية في متجر "CarryStation" للحقائب الفاخرة.
         اقترحي بإيجاز نوع الحقيبة (توت، كلتش، كروس، ساتشل، إلخ) المناسب لملابس المستخدمة أو مناسبتها.
         اجعلي الرد أنيقاً ومهنياً وفي حدود 60 كلمة.`;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: userQuery,
      config: {
        systemInstruction: systemPrompt,
      }
    });

    return response.text || (language === 'en' ? "I couldn't generate advice right now." : "لم أتمكن من تقديم النصيحة الآن.");
  } catch (error) {
    console.error("Gemini API Error:", error);
    return language === 'en' 
      ? "Our stylist is currently busy. Please try again later." 
      : "مستشارتنا مشغولة حالياً. يرجى المحاولة لاحقاً.";
  }
};