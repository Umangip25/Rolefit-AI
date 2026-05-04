<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=220&section=header&text=RoleFit%20AI&fontSize=52&fontColor=ffffff&fontAlignY=40&desc=AI-Powered%20Resume%20Tailoring%20%7C%20Next.js%20%C2%B7%20TypeScript%20%C2%B7%20OpenAI%20%C2%B7%20Tailwind%20CSS&descSize=18&descAlignY=60&animation=fadeIn" width="100%"/>

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&weight=500&size=22&pause=1000&color=6366F1&center=true&vCenter=true&width=700&height=60&lines=Tailor+your+resume+to+any+job+—+honestly+%F0%9F%8E%AF;No+fabrication.+No+exaggeration.+Just+truth.+%E2%9C%85;AI-powered+keyword+matching+%26+ATS+optimization+%F0%9F%A4%96;Built+with+Next.js+%2B+OpenAI+GPT-4o+%F0%9F%9A%80)](https://git.io/typing-svg)

</div>

<br>

## What is RoleFit AI?

RoleFit AI is a truth-first resume tailoring tool that helps job seekers align their existing resume to a specific job description without inventing or exaggerating anything.

Upload your resume, paste a job description, choose a focus mode, and get a refined, ATS-aligned version in seconds.

<br>

## ✨ Features

- 📄 Upload resume as PDF, DOCX, or TXT — or paste directly
- 🤖 AI-powered rewriting with strict no-fabrication rules
- 🎯 Keyword matching — highlights matched and missing skills
- 📊 Alignment score — before vs after comparison
- ⚖️ 4 focus modes — Balanced, ATS Optimized, Impact Focused, Concise
- 📝 Change summary — clearly shows what was modified
- ⬇️ Export as DOCX or TXT
- 📋 One-click copy to clipboard
- 🌗 Dark / Light mode (system-based)
- 💾 Session persistence using sessionStorage
- 🔀 Route-based navigation for better UX
- 📈 Vercel Analytics integration

<br>

## 🚀 Live Demo

**[▶ Live Demo](https://rolefit-resume.vercel.app/)** &nbsp;|&nbsp; Next.js · TypeScript · OpenAI GPT-4o · Tailwind CSS

<br>

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI%20GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| AI | OpenAI GPT-4o via API |
| PDF Parsing | pdfjs-dist |
| DOCX Parsing | mammoth |
| DOCX Export | docx + file-saver |
| Deployment | Vercel |

<br>

## 📁 Project Structure

```
resume-align/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── page.tsx                    # Main workflow orchestrator
│   ├── globals.css                 # Global styles + dark mode
│   ├── upload/page.tsx
│   ├── job-description/page.tsx
│   ├── configure/page.tsx
│   ├── processing/page.tsx
│   ├── results/page.tsx
│   └── api/tailor/route.ts         # OpenAI API route
├── components/
│   ├── ui/
│   │   ├── WorkflowSteps.tsx       # 5-step progress indicator
│   │   └── Header.tsx
│   └── steps/
│       ├── UploadStep.tsx          # Resume upload + drag & drop
│       ├── JobDescStep.tsx         # Job description input
│       ├── ConfigureStep.tsx       # Focus mode selector
│       ├── ProcessingStep.tsx      # Loading screen
│       └── ResultsStep.tsx         # Results + download
├── lib/
│   ├── fileParser.ts               # PDF, DOCX, TXT extraction
│   ├── docxExport.ts               # DOCX + TXT download
│   └── store.ts
└── types/
    └── index.ts                    # Shared TypeScript types
```

<br>

## ⚙️ Getting Started

```bash
# Clone the repo
git clone https://github.com/Umangip25/rolefit-ai.git
cd rolefit-ai

# Install dependencies
npm install

# Add your OpenAI API key
echo "OPENAI_API_KEY=sk-..." > .env.local

# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

<br>

## 🔒 Truthfulness First

RoleFit AI is built around one core principle — **never fabricate**.

The AI is strictly instructed to:
- ✅ Reorder and reword existing content for clarity
- ✅ Match phrasing to job description keywords that already exist
- ✅ Highlight quantified achievements more prominently
- ❌ Never add skills, tools, or experience not in the original resume
- ❌ Never remove metrics or bullet points

<br>

## 📊 Workflow

```
Upload Resume → Paste Job Description → Choose Focus Mode → AI Tailoring → Review & Download
     1                  2                      3                 4               5
```

**Focus Modes:**
| Mode | Description |
|------|-------------|
| ⚖️ Balanced | Best of both — human readable + ATS optimized |
| 🤖 ATS Optimized | Maximize keyword matches for automated screening |
| 🚀 Impact Focused | Highlight achievements with strong action verbs |
| ✂️ Concise | Trim the fluff, keep only what matters |

<br>

## 🧑‍💻 Built By

**Umangi Prajapati** — Frontend Software Engineer

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/umangiprajapati/)
[![Portfolio](https://img.shields.io/badge/Portfolio-6366F1?style=for-the-badge&logo=vercel&logoColor=white)](https://umangip.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Umangip25)

<br>

---

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f3460,50:16213e,100:1a1a2e&height=120&section=footer&animation=twinkling" width="100%"/>
