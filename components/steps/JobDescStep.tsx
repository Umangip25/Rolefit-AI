"use client";

import { useState } from "react";

type Props = {
  onNext: (jobDescription: string) => void;
  onBack: () => void;
  initialJobDesc?: string;
};

export default function JobDescStep({ onNext, onBack, initialJobDesc = "" }: Props) {
  const [jobDescription, setJobDescription] = useState(initialJobDesc);
  const [error, setError] = useState("");

  function handleContinue() {
    if (!jobDescription.trim()) {
      setError("Please paste the job description before continuing.");
      return;
    }
    if (jobDescription.trim().length < 100) {
      setError("Job description seems too short. Please paste the full listing.");
      return;
    }
    onNext(jobDescription);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
        Paste the Job Description
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Copy the full job posting and paste it below. The more detail, the better the tailoring.
      </p>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 rounded-xl p-4 mb-5">
        <p className="text-blue-700 dark:text-blue-300 font-semibold text-sm mb-2">💡 Tips for best results</p>
        <ul className="text-blue-600 dark:text-blue-400 text-sm space-y-1 list-disc list-inside">
          <li>Include the full job description, not just the title</li>
          <li>Include required skills and qualifications sections</li>
          <li>Include responsibilities if listed</li>
        </ul>
      </div>

      <textarea
        value={jobDescription}
        onChange={(e) => {
          setJobDescription(e.target.value);
          setError("");
        }}
        placeholder="Paste the full job description here..."
        rows={14}
        className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"

      />

      {/* Character count */}
      <p className="text-right text-xs text-gray-400 mt-1">
        {jobDescription.length} characters
      </p>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <div className="flex gap-3 mt-4">
        <button
          onClick={onBack}
          className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold py-3 rounded-xl transition-colors duration-200"
        >
          ← Back
        </button>
        <button
          onClick={handleContinue}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}