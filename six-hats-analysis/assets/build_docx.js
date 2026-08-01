// Six Hats Analysis — docx builder
// Reads /home/claude/six_hats_input.json, writes /mnt/user-data/outputs/Six_Hats_Analysis.docx
//
// Input JSON shape:
// {
//   "hypothesis": "…",
//   "hats": [
//     { "key": "white", "findings": [ { "lead": "…", "body": "…" }, ... x6 ] },
//     { "key": "red",   "findings": [ ... x6 ] },
//     { "key": "green", "findings": [ ... x6 ] },
//     { "key": "black", "findings": [ ... x6 ] },
//     { "key": "yellow","findings": [ ... x6 ] },
//     { "key": "blue",  "findings": [ ... x6 ] }
//   ]
// }

const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, AlignmentType, LevelFormat
} = require("docx");
const fs = require("fs");
const path = require("path");

const INPUT_PATH = "/home/claude/six_hats_input.json";
const OUTPUT_DIR = "/mnt/user-data/outputs";
const OUTPUT_PATH = path.join(OUTPUT_DIR, "Six_Hats_Analysis.docx");

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

if (!fs.existsSync(INPUT_PATH)) {
  console.error(`Missing input at ${INPUT_PATH}`);
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(INPUT_PATH, "utf-8"));

const PAGE_WIDTH = 12240;
const PAGE_HEIGHT = 15840;
const MARGIN = 1440;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const HAT_META = {
  white:  { name: "White Hat",  subtitle: "Facts & Information",        color: "F2F2F2", textColor: "1F2937", accent: "6B7280" },
  red:    { name: "Red Hat",    subtitle: "Feelings & Emotion",         color: "C0392B", textColor: "FFFFFF", accent: "C0392B" },
  green:  { name: "Green Hat",  subtitle: "Creativity & Alternatives",  color: "1E8449", textColor: "FFFFFF", accent: "1E8449" },
  black:  { name: "Black Hat",  subtitle: "Caution & Critical Judgment",color: "111111", textColor: "FFFFFF", accent: "111111" },
  yellow: { name: "Yellow Hat", subtitle: "Optimism & Benefits",        color: "F1C40F", textColor: "1F2937", accent: "B7950B" },
  blue:   { name: "Blue Hat",   subtitle: "Process & Big Picture",      color: "2471A3", textColor: "FFFFFF", accent: "2471A3" },
};

const HAT_ORDER = ["white", "red", "green", "black", "yellow", "blue"];

// ---------- Paragraph helpers ----------

function titleParagraph() {
  return new Paragraph({
    spacing: { after: 100 },
    children: [new TextRun({ text: "Six Thinking Hats Analysis", bold: true, size: 44 })],
  });
}

function subtitleParagraph() {
  return new Paragraph({
    spacing: { after: 240 },
    children: [new TextRun({ text: "A structured multi-perspective evaluation", italics: true, color: "555555", size: 26 })],
  });
}

function hypothesisBlock(hypothesis) {
  return new Table({
    width: { size: CONTENT_WIDTH, type: WidthType.DXA },
    columnWidths: [CONTENT_WIDTH],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_WIDTH, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: "F4F4F4" },
            margins: { top: 160, bottom: 160, left: 200, right: 200 },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
              left: { style: BorderStyle.SINGLE, size: 16, color: "555555" },
              right: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA" },
            },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [new TextRun({ text: "Hypothesis Under Evaluation", bold: true, color: "555555" })],
              }),
              new Paragraph({
                children: [new TextRun({ text: hypothesis, italics: true })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function hatHeader(hat) {
  const meta = HAT_META[hat.key];
  return new Paragraph({
    spacing: { before: 400, after: 60 },
    shading: { type: ShadingType.CLEAR, fill: meta.color },
    children: [
      new TextRun({ text: `  ${meta.name} — ${meta.subtitle}  `, bold: true, size: 30, color: meta.textColor }),
    ],
  });
}

function numberedFindingParagraph(hatKey, lead, body) {
  return new Paragraph({
    numbering: { reference: `hat-list-${hatKey}`, level: 0 },
    spacing: { after: 120 },
    children: [
      new TextRun({ text: `${lead} `, bold: true }),
      new TextRun({ text: body }),
    ],
  });
}

function placeholderParagraph(hatKey) {
  return new Paragraph({
    numbering: { reference: `hat-list-${hatKey}`, level: 0 },
    spacing: { after: 120 },
    children: [
      new TextRun({ text: "[ Team input — add a finding here ]", italics: true, color: "9CA3AF" }),
    ],
  });
}

function hatSectionParagraphs(hat) {
  const els = [hatHeader(hat)];
  const findings = hat.findings || [];
  for (let i = 0; i < 6; i++) {
    const f = findings[i] || { lead: "", body: "" };
    els.push(numberedFindingParagraph(hat.key, f.lead || "", f.body || ""));
  }
  for (let i = 6; i < 10; i++) {
    els.push(placeholderParagraph(hat.key));
  }
  return els;
}

function facilitationNote() {
  return [
    new Paragraph({
      spacing: { before: 400, after: 120 },
      children: [new TextRun({ text: "How to use this report", bold: true, size: 28, color: "2471A3" })],
    }),
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({
          text: "Items 1–6 under each hat are the initial findings generated from the perspective of that hat. Items 7–10 are blank slots for a team to fill in during a live facilitation session — capture additional observations, dissents, or field insights that the initial findings missed. The result is a 60-item shared view of the hypothesis (10 items × 6 hats).",
        }),
      ],
    }),
  ];
}

// ---------- Build the document ----------

const children = [
  titleParagraph(),
  subtitleParagraph(),
  hypothesisBlock(data.hypothesis || "(hypothesis not provided)"),
  new Paragraph({ spacing: { before: 200 }, children: [new TextRun({ text: "" })] }),
];

const hatMap = {};
for (const h of (data.hats || [])) hatMap[h.key] = h;
for (const key of HAT_ORDER) {
  const hat = hatMap[key] || { key, findings: [] };
  hat.key = key;
  for (const p of hatSectionParagraphs(hat)) children.push(p);
}

for (const p of facilitationNote()) children.push(p);

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22 } },
    },
  },
  numbering: {
    config: HAT_ORDER.map((key) => ({
      reference: `hat-list-${key}`,
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 600, hanging: 360 } } },
        },
      ],
    })),
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
          margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN },
        },
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log(OUTPUT_PATH);
});
