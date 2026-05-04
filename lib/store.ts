import { TailorResponse } from "@/types";

export function saveToSession(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

export function getFromSession<T>(key: string): T | null {
  if (typeof window !== "undefined") {
    const val = sessionStorage.getItem(key);
    if (!val) return null;
    try {
      return JSON.parse(val) as T;
    } catch {
      return val as unknown as T;
    }
  }
  return null;
}

export function clearSession() {
  if (typeof window !== "undefined") {
    sessionStorage.clear();
  }
}

export interface AppState {
  resumeText: string;
  fileName: string;
  jobDescription: string;
  focusMode: "balanced" | "ats" | "impact" | "concise";
  result: TailorResponse | null;
}