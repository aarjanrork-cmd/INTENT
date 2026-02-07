
import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

// In a production app, the API Key should be handled securely.
// This service outlines how Gemini will be used to generate intent-based content.

export const generateLessonContent = async (profile: UserProfile, lessonTopic: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Generate a language lesson for a student with the following profile:
    - Target Language: ${profile.targetLanguage}
    - Level: ${profile.level}
    - Intent: ${profile.intent}
    - Topic: ${lessonTopic}

    The lesson should include:
    1. 3 Key phrases with translations.
    2. A "Why this works" explanation focused on cultural/contextual nuances.
    3. A realistic simulation prompt where they must use the phrases.

    Respond in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
