import { Source, StrategyTask, IntentRoute, SearchResult, ChatMessage, ChatSession, SearchLevel } from '../types';

// --- PROXY HELPER ---
// This helper function calls our Express server API
async function callGeminiProxy(body: object) {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    const errorMessage = errorBody?.error?.message || response.statusText;
    throw new Error(`API Error: ${errorMessage}`);
  }

  return response;
}

// --- STREAMING CHAT ---
export async function* generateChatResponseStream(history: ChatMessage[], newMessage: string, systemInstruction: string): AsyncGenerator<string> {
    const contents = [
        ...history.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
        })),
        {
            role: 'user',
            parts: [{ text: newMessage }]
        }
    ];

    const response = await callGeminiProxy({
        model: 'gemini-3.5-flash',
        stream: true,
        contents: contents,
        config: {
            systemInstruction: systemInstruction,
        }
    });

    if (!response.body) {
        throw new Error("Streaming response has no body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let incompleteChunk = '';

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunkText = decoder.decode(value, { stream: true });
        const lines = (incompleteChunk + chunkText).split('\n');
        incompleteChunk = lines.pop() || '';

        for (const line of lines) {
            if (line.startsWith('data:')) {
                try {
                    const jsonString = line.substring(5).trim();
                    const parsed = JSON.parse(jsonString);
                    
                    // Unified parsing for both Gemini and Hugging Face formats
                    const text = parsed?.token?.text || 
                                parsed?.text || 
                                parsed?.candidates?.[0]?.content?.parts?.[0]?.text || 
                                "";
                                
                    if (text && text !== "</s>" && text !== "<|eot_id|>") {
                        yield text;
                    }
                } catch (e) {
                    // Skip invalid JSON chunks
                }
            }
        }
    }
}

// --- NON-STREAMING FUNCTIONS ---

export const summarizeNews = async (prompt: string): Promise<{ text: string, sources: Source[] }> => {
    const response = await callGeminiProxy({
      model: 'gemini-3.5-flash',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
          tools: [{ googleSearch: {} }],
      },
    });

    const data = await response.json();
    const text = data.text || '';
    const groundingChunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
            web: {
                uri: chunk.web.uri || '',
                title: chunk.web.title || '',
            }
        }));

    return { text, sources };
};

export const generateStrategy = async (goal: string, promptTemplate: string): Promise<StrategyTask[]> => {
    const prompt = promptTemplate.replace('{goal}', goal);
    const response = await callGeminiProxy({
      model: 'gemini-3.1-pro-preview',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
          responseMimeType: "application/json",
      }
    });
    
    const data = await response.json();
    try {
        const text = data.text || '';
        const jsonText = text.replace(/^```json\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(jsonText) as StrategyTask[];
    } catch (e) {
        console.error("Failed to parse strategy JSON:", data.text, e);
        throw new Error("The AI returned an invalid strategy format.");
    }
};

export const routeUserIntent = async (goal: string, promptTemplate: string): Promise<IntentRoute[]> => {
    const prompt = promptTemplate.replace('{goal}', goal);
    const response = await callGeminiProxy({
      model: 'gemini-3.5-flash',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
          responseMimeType: "application/json",
      }
    });

    const data = await response.json();
    try {
        const text = data.text || '';
        const jsonText = text.replace(/^```json\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(jsonText) as IntentRoute[];
    } catch (e) {
        console.error("Failed to parse intent route JSON:", data.text, e);
        throw new Error("The AI returned an invalid routing format.");
    }
};

export const prepareDraftFromTask = async (task: StrategyTask, promptTemplate: string, docTypeOptions: string): Promise<{ docType: string; topic: string; description: string }> => {
    const prompt = promptTemplate
        .replace('{taskName}', task.taskName)
        .replace('{description}', task.description)
        .replace('{suggestedPrompt}', task.suggestedPrompt)
        .replace('{docTypeOptions}', docTypeOptions);

    const response = await callGeminiProxy({
      model: 'gemini-3.5-flash',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
          responseMimeType: "application/json",
      }
    });

    const data = await response.json();
    try {
        const text = data.text || '';
        const jsonText = text.replace(/^```json\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Failed to parse draft preparation JSON:", data.text, e);
        throw new Error("The AI returned an invalid format for draft preparation.");
    }
};

export const analyzeWebPage = async (prompt: string): Promise<{ text: string, sources: Source[] }> => {
    const response = await callGeminiProxy({
      model: 'gemini-3.5-flash',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
          tools: [{ googleSearch: {} }],
      },
    });
    
    const data = await response.json();
    const text = data.text || '';
    const groundingChunks = data.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: Source[] = groundingChunks
        .filter((chunk: any) => chunk.web)
        .map((chunk: any) => ({
            web: {
                uri: chunk.web.uri || '',
                title: chunk.web.title || '',
            }
        }));
    
    return { text, sources };
};

export const analyzeDocument = async (prompt: string): Promise<{ text: string }> => {
    const response = await callGeminiProxy({
      model: 'gemini-3.1-pro-preview',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
    });
    
    const data = await response.json();
    return { text: data.text || '' };
};

export const generateTrainingContent = async (prompt: string): Promise<{ text: string }> => {
    const response = await callGeminiProxy({
      model: 'gemini-3.1-pro-preview',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
    });
    
    const data = await response.json();
    return { text: data.text || '' };
};

export const getSuggestions = async (inputValue: string, contextPrompt: string): Promise<string[]> => {
    const prompt = `${contextPrompt}: "${inputValue}". لطفا ۳ پیشنهاد کوتاه به صورت یک آرایه JSON از رشته‌ها ارائه دهید. مثال: ["پیشنهاد ۱", "پیشنهاد ۲", "پیشنهاد ۳"]. هیچ متن دیگری اضافه نکنید.`;

    const response = await callGeminiProxy({
      model: 'gemini-3.5-flash',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
          responseMimeType: "application/json",
      }
    });

    const data = await response.json();
    try {
        const text = data.text || '';
        const jsonText = text.replace(/^```json\s*/, '').replace(/```\s*$/, '');
        const suggestions = JSON.parse(jsonText);
        if (Array.isArray(suggestions) && suggestions.every(s => typeof s === 'string')) {
            return suggestions;
        }
        return [];
    } catch (e) {
        console.error("Failed to parse suggestions JSON:", data.text, e);
        return [];
    }
};

export const generateContextualSuggestions = async (chatSessions: ChatSession[], promptTemplate: string): Promise<string[]> => {
    const chatTitles = chatSessions.map(s => `- "${s.title}"`).join('\n');
    const prompt = promptTemplate.replace('{chatTitles}', chatTitles);
    
    const response = await callGeminiProxy({
      model: 'gemini-3.5-flash',
      stream: false,
      contents: [{ parts: [{ text: prompt }] }],
      config: {
          responseMimeType: "application/json",
      }
    });
    
    const data = await response.json();
    try {
        const text = data.text || '';
        const jsonText = text.replace(/^```json\s*/, '').replace(/```\s*$/, '');
        const suggestions = JSON.parse(jsonText);
        if (Array.isArray(suggestions) && suggestions.every(s => typeof s === 'string')) {
            return suggestions;
        }
        return [];
    } catch (e) {
        console.error("Failed to parse contextual suggestions JSON:", data.text, e);
        return [];
    }
};

const findProfessionals = async (query: string, searchLevel: SearchLevel, professionalType: 'وکیل' | 'دفتر اسناد رسمی'): Promise<SearchResult> => {
     const jsonStructure = JSON.stringify({
        "summary": "خلاصه‌ای کلی از نتایج جستجو و بهترین گزینه‌های یافت شده در چند جمله.",
        "professionals": [
          {
            "name": "نام کامل وکیل یا دفتر",
            "specialty": "حوزه اصلی تخصص حقوقی یا خدمات اصلی",
            "address": "آدرس کامل دفتر",
            "contact": "اطلاعات تماس (تلفن، ایمیل)",
            "website": "لینک کامل وب‌سایت (در صورت عدم وجود 'N/A')",
            "summary": "خلاصه‌ای کوتاه در یک یا دو جمله از خدمات یا ویژگی‌های برجسته"
          }
        ]
    }, null, 2);

    const prompt = `شما یک دستیار هوشمند حقوقی متخصص هستید. وظیفه شما تحلیل درخواست کاربر، استفاده از جستجوی گوگل برای یافتن ${professionalType} در ایران و استخراج اطلاعات آنها است.
درخواست کاربر: "${query}"

دستودالعمل:
1. درخواست کاربر را به صورت معنایی تحلیل کنید تا نیاز واقعی او را درک کنید.
2. از ابزار جستجوی گوگل برای یافتن مرتبط‌ترین متخصصان استفاده کنید.
3. کل خروجی شما باید **فقط و فقط یک شیء JSON معتبر** باشد. هیچ متنی قبل یا بعد از شیء JSON اضافه نکنید. آن را داخل بک‌تیک‌های مارک‌داون قرار ندهید.
4. شیء JSON باید دقیقاً از این ساختار پیروی کند:
${jsonStructure}

آرایه 'professionals' را با اطلاعاتی که پیدا می‌کنید پر کنید. اگر اطلاعاتی برای یک فیلد خاص پیدا نکردید، از 'N/A' استفاده کنید. فیلد 'summary' باید خلاصه‌ای موجز از یافته‌های شما به زبان فارسی باشد. تمام فیلدهای دیگر نیز باید به زبان فارسی باشند.`;

    const model = searchLevel === 'advanced' ? 'gemini-3.1-pro-preview' : 'gemini-3.5-flash';

    const response = await callGeminiProxy({
        model: model,
        stream: false,
        contents: [{ parts: [{ text: prompt }] }],
        config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
        }
    });
    
    const data = await response.json();
    try {
        const text = data.text || '';
        let jsonText = text.replace(/^```json\s*/, '').replace(/```\s*$/, '');
        return JSON.parse(jsonText) as SearchResult;
    } catch (e) {
        console.error(`Failed to parse ${professionalType} search JSON:`, data.text, e);
        throw new Error(`The AI returned an invalid format for ${professionalType} search results.`);
    }
};

export const findNotaries = (query: string, searchLevel: SearchLevel) => findProfessionals(query, searchLevel, 'دفتر اسناد رسمی');
export const findLawyers = (query: string, searchLevel: SearchLevel) => findProfessionals(query, searchLevel, 'وکیل');