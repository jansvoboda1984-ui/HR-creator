
import { GoogleGenAI, Type } from "@google/genai";
import { JobInputData, GeneratedAdResponse } from "../types";

const SYSTEM_INSTRUCTION = `
Jsi „HR Brand-Ad Architect“, špičkový expert na Employer Branding a copywriting. Tvým úkolem je vytvářet pracovní inzeráty, které nejsou jen popisem práce, ale prodejním nástrojem značky zaměstnavatele.

### TVÉ ZDROJE ZNALOSTÍ
1. PRIORITA: Firemní manuály "Férový nábor" a "9 tipů pro psaní inzerátů".
2. EXPERTÍZA: Principy Alma Career (autenticita, konkrétnost, WIIFM - What's in it for me).

### PRAVIDLA PRO TVORBU (STRIKTNÍ)
- ABSOLUTNÍ ZÁKAZ KLIŠÉ: Nikdy nepoužívej: „dynamický kolektiv“, „mladý tým“, „příjemné prostředí“, „férové ohodnocení“, „možnost kariérního růstu“.
- KONKRÉTNOST: Benefity popiš barvitě na základě kontextu.
- FÉROVOST: Názvy pozic s lomítkem (např. Programátor/ka). Žádná diskriminace věkem, pohlavím či národností.
- STRUKTURA: 1. Headline (chytlavý), 2. Háček (problém), 3. Náplň (výsledek), 4. Požadavky (lidsky), 5. Nabídka (WIIFM).
- MZDA: Musí být jasně viditelná, pokud je zadána.

### KRITICKÁ SEBEREFLEXE
Před samotným inzerátem zanalyzuj zadání (textové i případný přiložený dokument). Pokud chybí info o tom, co je na práci těžké nebo co je hlavní benefit, vlož box [KRITIKA].

Výstup musí být ve formátu JSON podle specifikovaného schématu.
`;
export const generateJobAd = async (data: JobInputData): Promise<GeneratedAdResponse> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
  
  const textPrompt = `
  Zanalyzuj toto zadání a vytvoř inzerát:
  Pozice: ${data.position}
  Mzda: ${data.salary}
  Co je na té práci nejtěžší: ${data.hardestPart}
  Hlavní benefit: ${data.mainBenefit}
  Náplň práce: ${data.tasks}
  Požadavky: ${data.requirements}
  Ostatní benefity: ${data.benefits}
  Atmosféra ve firmě: ${data.companyVibe}
  ${data.file ? `DŮLEŽITÉ: V příloze je dokument s detailním popisem pozice (${data.file.name}). Prosím, čerpej z něj informace pro maximální autenticitu.` : ''}
  `;

  const parts: any[] = [{ text: textPrompt }];
  
  if (data.file) {
    parts.push({
      inlineData: {
        data: data.file.base64,
        mimeType: data.file.mimeType
      }
    });
  }

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          criticism: { type: Type.STRING, description: "Kritika chybějících informací zadání." },
          headline: { type: Type.STRING, description: "Chytlavý titulek inzerátu." },
          hook: { type: Type.STRING, description: "Háček inzerátu." },
          content: { type: Type.STRING, description: "Hlavní náplň práce (výsledky)." },
          requirements: { type: Type.STRING, description: "Lidsky popsané požadavky." },
          offer: { type: Type.STRING, description: "Nabídka a benefity." }
        },
        required: ["headline", "hook", "content", "requirements", "offer"],
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Model nevrátil žádný obsah.");
  return JSON.parse(text);
};
