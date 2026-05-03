"use client";

type Step = {
  id: number;
  label: string;
  description: string;
};

const steps: Step[] = [
  { id: 1, label: "Upload Resume", description: "Add your current resume" },
  { id: 2, label: "Job Description", description: "Paste the target role" },
  { id: 3, label: "Configure", description: "Choose your focus mode" },
  { id: 4, label: "Processing", description: "AI is tailoring your resume" },
  { id: 5, label: "Results", description: "Review and download" },
];

type Props = {
  currentStep: number;
};

export default function WorkflowSteps({ currentStep }: Props) {
  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center justify-between relative">
        {/* Connector line behind steps */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 z-0" />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center z-10 flex-1"
            >
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                  ${isCompleted ? "bg-green-500 border-green-500 text-white" : ""}
                  ${isActive ? "bg-blue-600 border-blue-600 text-white scale-110 shadow-lg" : ""}
                  ${!isCompleted && !isActive ? "bg-white border-gray-300 text-gray-400" : ""}
                `}
              >
                {isCompleted ? "✓" : step.id}
              </div>

              {/* Labels */}
              <p
                className={`mt-2 text-xs font-semibold text-center ${
                  isActive ? "text-blue-600" : isCompleted ? "text-green-600" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
              <p className="text-xs text-gray-400 text-center hidden sm:block">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}