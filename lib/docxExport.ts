import {
  Document,
  Paragraph,
  TextRun,
  Packer,
  AlignmentType,
  BorderStyle,
} from "docx";
import { saveAs } from "file-saver";

function buildParagraphs(text: string): Paragraph[] {
  const lines = text.split("\n");
  const paragraphs: Paragraph[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      paragraphs.push(new Paragraph({ text: "", spacing: { after: 80 } }));
      continue;
    }

    // Section headers — all caps, short lines
    const isHeader =
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 2 &&
      trimmed.length < 40 &&
      !/\d/.test(trimmed);

    // Bullet lines
    const isBullet =
      trimmed.startsWith("›") ||
      trimmed.startsWith("-") ||
      trimmed.startsWith("•");

    // Name line — first non-empty line, longer all-caps
    const isName =
      trimmed === trimmed.toUpperCase() &&
      trimmed.length > 10 &&
      paragraphs.filter((p) => p).length < 3;

    if (isName) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              size: 36,
              font: "Calibri",
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        })
      );
    } else if (isHeader) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              size: 24,
              font: "Calibri",
              color: "1F3864",
            }),
          ],
          border: {
            bottom: {
              style: BorderStyle.SINGLE,
              size: 6,
              color: "1F3864",
            },
          },
          spacing: { before: 200, after: 100 },
        })
      );
    } else if (isBullet) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              size: 20,
              font: "Calibri",
            }),
          ],
          indent: { left: 360 },
          spacing: { after: 60 },
        })
      );
    } else {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              size: 20,
              font: "Calibri",
            }),
          ],
          spacing: { after: 60 },
        })
      );
    }
  }

  return paragraphs;
}

export async function downloadAsDocx(
  text: string,
  filename: string = "tailored-resume.docx"
) {
  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              bottom: 720,
              left: 900,
              right: 900,
            },
          },
        },
        children: buildParagraphs(text),
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}

export function downloadAsTxt(
  text: string,
  filename: string = "tailored-resume.txt"
) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, filename);
}