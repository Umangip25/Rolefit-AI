import mammoth from "mammoth";

export async function extractTextFromFile(file: File): Promise<string> {
  const extension = file.name.split(".").pop()?.toLowerCase();

  if (extension === "txt") {
    return await file.text();
  }

  if (extension === "docx") {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }

  if (extension === "pdf") {
    const arrayBuffer = await file.arrayBuffer();
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/4.4.168/pdf.worker.min.mjs`;

    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item: unknown) => {
        const textItem = item as { str: string };
        return textItem.str;
      });
      fullText += strings.join(" ") + "\n";
    }

    const cleaned = fullText
      .split("\n")
      .map((line) => {
        const trimmed = line.trim();
        // Match lines like "U M A N G I" or "U M A N G I  P R A J A P A T I"
        if (/^[A-Z]( [A-Z])+$/.test(trimmed)) {
          // Remove single spaces between letters but keep double spaces as word separators
          return trimmed
            .split("  ")
            .map((word) => word.replace(/ /g, ""))
            .join(" ");
        }
        return line;
      })
      .join("\n");

    return cleaned;
  }

  throw new Error(
    "Unsupported file type. Please upload a .txt, .docx, or .pdf file.",
  );
}
