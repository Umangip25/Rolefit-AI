"use client";

import { useRouter } from "next/navigation";
import { clearSession } from "@/lib/store";

export default function Header() {
  const router = useRouter();

  function handleLogoClick() {
    clearSession();
    router.push("/upload");
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <button
          onClick={handleLogoClick}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity duration-200"
        >
          <span className="text-2xl">🎯</span>
          <div className="text-left">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">RoleFit AI</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Tailor your resume to any job — honestly</p>
          </div>
        </button>
      </div>
    </header>
  );
}