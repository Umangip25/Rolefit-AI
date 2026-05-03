import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { TailorRequest, TailorResponse } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const body: TailorRequest = await req.json();
    const { resumeText, jobDescription, focusMode } = body;

    if (!resumeText || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required" },
        { status: 400 },
      );
    }

    const focusInstructions = {
      balanced:
        "Balance ATS keyword optimization with natural, human-readable language.",
      ats: "Heavily optimize for ATS systems. Prioritize exact keyword matches from the job description.",
      impact:
        "Focus on quantified achievements and strong action verbs that show impact.",
      concise:
        "Make the resume tight and concise. Remove filler, keep only what matters most.",
    };

    const prompt = `You are a strict resume editor. Your only job is to improve how the candidate's EXISTING experience is presented for this specific role.

ABSOLUTE RULES — VIOLATIONS ARE NOT ACCEPTABLE:
1. DO NOT add any skill, tool, framework, or technology that does not already exist word-for-word in the ORIGINAL RESUME
2. DO NOT remove or shorten any bullet point that contains a number, percentage, or metric
3. DO NOT delete any bullet points — you may only rewrite them for clarity
4. If the job description mentions a skill but the resume does not have it — do NOT add it anywhere
5. Only use words and technologies that are already in the original resume
6. Your job is PRESENTATION improvement, not content invention
7. ${focusInstructions[focusMode]}

WHAT YOU SHOULD DO:
- Reorder bullet points so the most relevant ones appear first
- Rewrite sentences for clarity and stronger action verbs
- Match phrasing to job description keywords ONLY when those keywords already exist in the resume
- Highlight existing achievements more prominently
- Keep ALL quantified metrics intact

JOB DESCRIPTION:
${jobDescription}

ORIGINAL RESUME:
${resumeText}

VERIFICATION STEP: Before writing the tailored resume, check — does every skill and tool in your output exist in the original resume? If not, remove it.

Respond ONLY with a valid JSON object, no markdown, no extra text:
{
  "tailoredResume": "the full rewritten resume. Use this exact formatting:\n- Section headers in ALL CAPS followed by a newline\n- Each bullet point on its own line starting with ›\n- Double newline between sections\n- Name on the very first line\n- Job title line directly under name\n- Contact info each on its own line",
  "matchedKeywords": ["keywords from job description that exist in the original resume"],
  "missingKeywords": ["keywords from job description that are NOT in the original resume"],
  "changesSummary": ["specific change 1", "specific change 2"],
  "score": {
    "before": <percentage of job description keywords found in the ORIGINAL resume, integer 0-100>,
    "after": <percentage of job description keywords found in the TAILORED resume, integer 0-100>
  }
}`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const raw = completion.choices[0].message.content || "";
    const cleaned = raw.replace(/```json|```/g, "").trim();
    const result: TailorResponse = JSON.parse(cleaned);

    return NextResponse.json(result);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
