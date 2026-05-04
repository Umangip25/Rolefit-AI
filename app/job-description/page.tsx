"use client";

import { useRouter } from "next/navigation";
import WorkflowSteps from "@/components/ui/WorkflowSteps";
import JobDescStep from "@/components/steps/JobDescStep";
import { saveToSession, getFromSession } from "@/lib/store";
import Header from "@/components/ui/Header";

export default function JobDescriptionPage() {
  const router = useRouter();
  const savedJobDesc = getFromSession<string>("jobDescription") ?? "";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <WorkflowSteps currentStep={2} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-10 px-4">
        <JobDescStep
          initialJobDesc={savedJobDesc}
          onNext={(jd) => {
            saveToSession("jobDescription", jd);
            router.push("/configure");
          }}
          onBack={() => router.push("/upload")}
        />
      </main>
    </div>
  );
}