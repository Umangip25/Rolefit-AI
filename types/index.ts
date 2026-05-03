export interface TailorRequest {
  resumeText: string;
  jobDescription: string;
  focusMode: "balanced" | "ats" | "impact" | "concise";
}

export interface KeywordMatch {
  keyword: string;
  found: boolean;
}

export interface TailorResponse {
  tailoredResume: string;
  matchedKeywords: string[];
  missingKeywords: string[];
  changesSummary: string[];
  score: {
    before: number;
    after: number;
  };
}