"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorkflowSteps from "@/components/ui/WorkflowSteps";
import UploadStep from "@/components/steps/UploadStep";
import { saveToSession, getFromSession } from "@/lib/store";
import Header from "@/components/ui/Header";

export default function UploadPage() {
  const router = useRouter();
  const [savedText, setSavedText] = useState("");
  const [savedFileName, setSavedFileName] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSavedText(getFromSession<string>("resumeText") ?? "");
    setSavedFileName(getFromSession<string>("fileName") ?? "");
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <WorkflowSteps currentStep={1} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-10 px-4">
        <UploadStep
          initialText={savedText}
          initialFileName={savedFileName}
          onNext={(text, name) => {
            saveToSession("resumeText", text);
            saveToSession("fileName", name);
            router.push("/job-description");
          }}
        />
      </main>
    </div>
  );
}