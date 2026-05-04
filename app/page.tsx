"use client";

import { useState } from "react";
import WorkflowSteps from "../components/ui/WorkflowSteps";
import UploadStep from "../components/steps/UploadStep";
import JobDescStep from "../components/steps/JobDescStep";
import ConfigureStep from "../components/steps/ConfigureStep";
import ProcessingStep from "../components/steps/ProcessingStep";
import ResultsStep from "../components/steps/ResultsStep";
import { TailorRequest, TailorResponse } from "@/types";

export default function Home() {
  const [step, setStep] = useState(1);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<TailorResponse | null>(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("resume");

  async function handleTailor(focusMode: TailorRequest["focusMode"]) {
    setStep(4);
    setError("");

    try {
      const response = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobDescription, focusMode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
      setStep(5);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStep(3);
    }
  }

  function handleStartOver() {
    setStep(1);
    setResumeText("");
    setJobDescription("");
    setResult(null);
    setError("");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <span className="text-2xl">🎯</span>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">RoleFit AI</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tailor your resume to any job — honestly</p>
          </div>
        </div>
      </header>

      {/* Workflow steps indicator */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <WorkflowSteps currentStep={step} />
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-10 px-4">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm">
            ⚠ {error}
          </div>
        )}

        {step === 1 && (
          <UploadStep
            onNext={(text, name) => {
              setResumeText(text);
              setFileName(name);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <JobDescStep
            onNext={(jd) => {
              setJobDescription(jd);
              setStep(3);
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <ConfigureStep
            onNext={handleTailor}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && <ProcessingStep />}

        {step === 5 && result && (
          <ResultsStep result={result} onStartOver={handleStartOver} fileName={fileName} />
        )}
      </main>
    </div>
  );
}