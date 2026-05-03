"use client";

import { useEffect, useState } from "react";

const messages = [
  "Reading your resume...",
  "Analyzing the job description...",
  "Matching your skills to requirements...",
  "Rewriting for clarity and impact...",
  "Optimizing for ATS keywords...",
  "Almost done...",
];

export default function ProcessingStep() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const messageTimer = setInterval(() => {
      setMessageIndex((prev) =>
        prev < messages.length - 1 ? prev + 1 : prev
      );
    }, 2500);

    return () => clearInterval(messageTimer);
  }, []);

  useEffect(() => {
    const dotsTimer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(dotsTimer);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6 flex flex-col items-center justify-center min-h-64">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-8" />

      {/* Message */}
      <p className="text-lg font-semibold text-gray-700 text-center">
        {messages[messageIndex]}{dots}
      </p>

      <p className="text-sm text-gray-400 mt-3 text-center">
        This usually takes 10–20 seconds
      </p>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {messages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              i <= messageIndex ? "bg-blue-600" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}