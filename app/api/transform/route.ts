import { NextResponse } from 'next/server';
import { Groq } from 'groq-sdk';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize Supabase Admin (Bypasses RLS to save data)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    const { text, intensity } = await req.json();

    // Guard rail for mid inputs
    if (!text || text.trim().length < 2) {
      return NextResponse.json(
        { error: "Input is too mid. Write something real, G." }, 
        { status: 400 }
      );
    }

    const dynamicTemp = 0.5 + (intensity * 0.14);

    const systemPrompt = `
      You are the "Aura Architect" for CoDaddy's Narrative Engine. 
      Your mission: Execute a high-signal rewrite of corporate "NPC" yapping into Gen-Z/Gen-Alpha dialect.

      DIALECT DOSSIER:
      - LVL 1 (Chill): Clean but hip. Use: "lowkey", "vibe check", "big moves".
      - LVL 2 (Main Character): Influencer energy. Use: "slay", "ate", "understood the assignment".
      - LVL 3 (Savage): Streetwear vibe. Use: "securing the bag", "locked in", "fr fr", "no cap".
      - LVL 4 (Demon Mode): High intensity. Use: "rizz", "clutch", "motion", "glazing", "cooked".
      - LVL 5 (Full Sigma): Absolute Peak Brainrot. Use: "skibidi", "fanum tax", "aura +10000", "mewing", "looksmaxxing".

      STRICT DIRECTIVES:
      1. ANALYZE INTENT: If the text is about a win, make it "Goated". If it's a loss, it's a "skill issue" or "cooked".
      2. BREVITY: Max 1-2 punchy sentences.
      3. OUTPUT: Pure text only. No "Here is your rewrite," no quotes, no yapping. 
      4. SIGMA RULE: At Level 5, the response must feel like a TikTok comment section during a fever dream.
    `;

    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { 
          role: "user", 
          content: `Transform this at Intensity ${intensity}/5: "${text}"` 
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: dynamicTemp,
      max_tokens: 120,
      top_p: 0.85,
    });

    let transformedText = completion.choices[0]?.message?.content?.trim() || "";
    
    transformedText = transformedText
      .replace(/^(Rewrite:|Output:|Result:|Transformation:)/i, "")
      .replace(/["']/g, "")
      .trim();

    // 2. SAVE TO SUPABASE (No-await background task for speed)
    // Hum transformedText return karne se pehle ise save karenge
    const { error: dbError } = await supabaseAdmin
      .from('transforms')
      .insert([
        { 
          original_text: text, 
          transformed_text: transformedText, 
          intensity: intensity 
        }
      ]);

    if (dbError) console.error("Supabase Save Error:", dbError);

    const auraMessages = [
      "Aura +9999",
      "Motion Secured",
      "Main Character Energy",
      "Vibe Checked",
      "Bag: Secured"
    ];
    const randomAura = auraMessages[Math.floor(Math.random() * auraMessages.length)];

    return NextResponse.json({ 
      transformedText,
      auraStatus: intensity >= 5 ? "Sigma Status: Infinite ♾️" : randomAura
    });

  } catch (error: any) {
    console.error("Engine failure:", error);
    return NextResponse.json({ 
      error: "The API is being glazed too hard. Try again, G.",
    }, { status: 500 });
  }
}
