"use client";

import { TailorResponse } from "@/types";
import { downloadAsDocx, downloadAsTxt } from "@/lib/docxExport";

type Props = {
    result: TailorResponse;
    onStartOver: () => void;
};

export default function ResultsStep({ result, onStartOver }: Props) {
    const { tailoredResume, matchedKeywords, missingKeywords, changesSummary, score } = result;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Tailored Resume</h2>
            <p className="text-gray-500 mb-6">
                Review the changes below and download when you&apos;re ready.
            </p>

            {/* Score bar */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-600 mb-3">Alignment Score</p>
                <div className="flex items-center gap-6">
                    <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Before</span>
                            <span>{score.before}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-red-400 h-2 rounded-full transition-all duration-700"
                                style={{ width: `${score.before}%` }}
                            />
                        </div>
                    </div>
                    <span className="text-2xl">→</span>
                    <div className="flex-1">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>After</span>
                            <span>{score.after}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                                className="bg-green-500 h-2 rounded-full transition-all duration-700"
                                style={{ width: `${score.after}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Keywords */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-sm font-semibold text-green-700 mb-3">
                        ✓ Matched Keywords ({matchedKeywords.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {matchedKeywords.map((kw) => (
                            <span
                                key={kw}
                                className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                    <p className="text-sm font-semibold text-red-600 mb-3">
                        ✗ Missing Keywords ({missingKeywords.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {missingKeywords.map((kw) => (
                            <span
                                key={kw}
                                className="bg-red-100 text-red-600 text-xs font-medium px-3 py-1 rounded-full"
                            >
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Changes summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-700 mb-3">📝 What Changed</p>
                <ul className="space-y-2">
                    {changesSummary.map((change, i) => (
                        <li key={i} className="text-sm text-gray-600 flex gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            {change}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Tailored resume output */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
                <p className="text-sm font-semibold text-gray-700 mb-3">📄 Tailored Resume</p>
                <div className="text-sm text-gray-700 leading-relaxed space-y-1">
                    {tailoredResume.split("\n").map((line, i) => {
                        const trimmed = line.trim();

                        if (trimmed === "") return <div key={i} className="h-3" />;

                        const isHeader =
                            trimmed === trimmed.toUpperCase() &&
                            trimmed.length > 2 &&
                            trimmed.length < 50 &&
                            !/\d/.test(trimmed);

                        const isBullet =
                            trimmed.startsWith("›") ||
                            trimmed.startsWith("-") ||
                            trimmed.startsWith("•");

                        const isName = i === 0;

                        const isSubtitle = i === 1;

                        if (isName) {
                            return (
                                <p key={i} className="text-2xl font-bold text-gray-900 text-center">
                                    {trimmed}
                                </p>
                            );
                        }

                        if (isSubtitle) {
                            return (
                                <p key={i} className="text-sm text-gray-500 text-center mb-2">
                                    {trimmed}
                                </p>
                            );
                        }

                        if (isHeader) {
                            return (
                                <p
                                    key={i}
                                    className="text-sm font-bold text-blue-800 uppercase tracking-wide border-b border-blue-200 pt-4 pb-1 mt-2"
                                >
                                    {trimmed}
                                </p>
                            );
                        }

                        if (isBullet) {
                            return (
                                <p key={i} className="pl-4 text-gray-700">
                                    {trimmed}
                                </p>
                            );
                        }

                        return (
                            <p key={i} className="text-gray-700">
                                {trimmed}
                            </p>
                        );
                    })}
                </div>
            </div>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={() => downloadAsDocx(tailoredResume, "tailored-resume.docx")}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors duration-200"
                >
                    ⬇ Download as DOCX
                </button>
                <button
                    onClick={() => downloadAsTxt(tailoredResume, "tailored-resume.txt")}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-600 font-semibold py-3 rounded-xl transition-colors duration-200"
                >
                    ⬇ Download as TXT
                </button>
                <button
                    onClick={onStartOver}
                    className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-600 font-semibold py-3 rounded-xl transition-colors duration-200"
                >
                    ↺ Start Over
                </button>
            </div>
        </div>
    );
}