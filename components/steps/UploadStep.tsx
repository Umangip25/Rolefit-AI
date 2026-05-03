"use client";

import { useState, useRef } from "react";
import { extractTextFromFile } from "@/lib/fileParser";

type Props = {
  onNext: (resumeText: string) => void;
};

export default function UploadStep({ onNext }: Props) {
  const [resumeText, setResumeText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError("");
    setLoading(true);
    try {
      const text = await extractTextFromFile(file);
      setResumeText(text);
      setFileName(file.name);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to read file");
    } finally {
      setLoading(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleContinue() {
    if (!resumeText.trim()) {
      setError("Please upload a file or paste your resume text.");
      return;
    }
    onNext(resumeText);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Resume</h2>
      <p className="text-gray-500 mb-6">Upload a .txt or .docx file, or paste your resume directly.</p>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-200
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.docx,.pdf"
          className="hidden"
          onChange={handleFileInput}
        />
        {loading ? (
          <p className="text-blue-500 font-medium">Reading file...</p>
        ) : fileName ? (
          <p className="text-green-600 font-medium">✓ {fileName} loaded</p>
        ) : (
          <>
            <p className="text-4xl mb-3">📄</p>
            <p className="text-gray-600 font-medium">Drag & drop your resume here</p>
            <p className="text-gray-400 text-sm mt-1">or click to browse — .txt, .docx, or .pdf</p>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-sm">or paste below</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* Paste area */}
      <textarea
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        placeholder="Paste your resume text here..."
        rows={10}
        className="w-full border border-gray-300 rounded-xl p-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      <button
        onClick={handleContinue}
        className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
      >
        Continue →
      </button>
    </div>
  );
}