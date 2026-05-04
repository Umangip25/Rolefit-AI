"use client";

import { useState } from "react";
import { TailorRequest } from "@/types";

type FocusMode = TailorRequest["focusMode"];

type Option = {
  id: FocusMode;
  label: string;
  description: string;
  emoji: string;
};

const options: Option[] = [
  {
    id: "balanced",
    label: "Balanced",
    description: "Best of both worlds — readable for humans and optimized for ATS systems.",
    emoji: "⚖️",
  },
  {
    id: "ats",
    label: "ATS Optimized",
    description: "Maximize keyword matches for automated screening systems.",
    emoji: "🤖",
  },
  {
    id: "impact",
    label: "Impact Focused",
    description: "Highlight achievements and results with strong action verbs.",
    emoji: "🚀",
  },
  {
    id: "concise",
    label: "Concise",
    description: "Trim the fluff. Keep only what matters most for this role.",
    emoji: "✂️",
  },
];

type Props = {
  onNext: (focusMode: FocusMode) => void;
  onBack: () => void;
};

export default function ConfigureStep({ onNext, onBack }: Props) {
  const [selected, setSelected] = useState<FocusMode>("balanced");

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Choose Your Focus Mode
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        How should the AI prioritize when rewriting your resume?
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={`cursor-pointer rounded-xl border-2 p-5 transition-all duration-200
  ${selected === option.id
                ? "border-blue-600 bg-blue-50 dark:bg-blue-950 shadow-md"
                : "border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }
            `}
          >
            <p className="text-3xl mb-2">{option.emoji}</p>
            <p className="font-semibold text-gray-800 dark:text-white">{option.label}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold py-3 rounded-xl transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={() => onNext(selected)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        >
          Tailor My Resume →
        </button>
      </div>
    </div>
  );
}