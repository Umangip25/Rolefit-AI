"use client";

import { useRouter } from "next/navigation";
import WorkflowSteps from "@/components/ui/WorkflowSteps";
import ConfigureStep from "@/components/steps/ConfigureStep";
import { saveToSession, getFromSession } from "@/lib/store";
import { TailorRequest } from "@/types";
import Header from "@/components/ui/Header";

export default function ConfigurePage() {
  const router = useRouter();

  async function handleTailor(focusMode: TailorRequest["focusMode"]) {
    saveToSession("focusMode", focusMode);

    const resumeText = getFromSession<string>("resumeText") ?? "";
    const jobDescription = getFromSession<string>("jobDescription") ?? "";

    if (!resumeText || !jobDescription) {
      router.push("/upload");
      return;
    }

    router.push("/processing");

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

      saveToSession("result", data);
      router.push("/results");
    } catch (err: unknown) {
      console.error(err);
      router.push("/configure");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header />

      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <WorkflowSteps currentStep={3} />
        </div>
      </div>

      <main className="max-w-4xl mx-auto py-10 px-4">
        <ConfigureStep
          onNext={handleTailor}
          onBack={() => router.push("/job-description")}
        />
      </main>
    </div>
  );
}