"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import WorkflowSteps from "@/components/ui/WorkflowSteps";
import ProcessingStep from "@/components/steps/ProcessingStep";
import { getFromSession } from "@/lib/store";
import Header from "@/components/ui/Header";

export default function ProcessingPage() {
  const router = useRouter();

  useEffect(() => {
    const result = getFromSession("result");
    if (result) {
      router.push("/results");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <WorkflowSteps currentStep={4} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-10 px-4">
        <ProcessingStep />
      </main>
    </div>
  );
}