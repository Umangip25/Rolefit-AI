"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorkflowSteps from "@/components/ui/WorkflowSteps";
import ResultsStep from "@/components/steps/ResultsStep";
import { getFromSession, clearSession } from "@/lib/store";
import { TailorResponse } from "@/types";
import Header from "@/components/ui/Header";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<TailorResponse | null>(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    const savedResult = getFromSession<TailorResponse>("result");
    const savedFileName = getFromSession<string>("fileName");

    if (!savedResult) {
      router.push("/upload");
      return;
    }

    setResult(savedResult);
    setFileName(savedFileName ?? "");
  }, [router]);

  function handleStartOver() {
    clearSession();
    router.push("/upload");
  }

  if (!result) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
     <Header />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <WorkflowSteps currentStep={5} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-10 px-4">
        <ResultsStep
          result={result}
          onStartOver={handleStartOver}
          fileName={fileName}
        />
      </main>
    </div>
  );
}