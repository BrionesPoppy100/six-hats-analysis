# Output Format Specifications

Both output formats display **10 numbered items per hat**: items 1–6 are Claude-generated findings; items 7–10 are blank team-input slots with a light-gray italic placeholder.

## Markdown format (for chat)

Structure:

```
# Six Thinking Hats Analysis

**Hypothesis:** [restate the user's hypothesis in italics or a blockquote]

---

## 🤍 White Hat — Facts & Information

1. **Lead phrase.** Explanation, 2–4 sentences. Include inline citations where appropriate.
2. **Lead phrase.** Explanation.
3. **Lead phrase.** Explanation.
4. **Lead phrase.** Explanation.
5. **Lead phrase.** Explanation.
6. **Lead phrase.** Explanation.
7. *[ Team input — add a finding here ]*
8. *[ Team input — add a finding here ]*
9. *[ Team input — add a finding here ]*
10. *[ Team input — add a finding here ]*

---

## ❤️ Red Hat — Feelings & Emotion

[same structure]

---

## 💚 Green Hat — Creativity & Alternatives

[same structure]

---

## 🖤 Black Hat — Caution & Critical Judgment

[same structure]

---

## 💛 Yellow Hat — Optimism & Benefits

[same structure]

---

## 💙 Blue Hat — Process & Big Picture

[same structure]
```

The team-input placeholders should be in italics (which renders as visually lighter than bold surrounding text) with square brackets and the "Team input" label.

## Word (.docx) format

Use the docx build script at `assets/build_docx.js`. Write the following JSON to `/home/claude/six_hats_input.json`:

```json
{
  "hypothesis": "The full hypothesis text as provided by the user.",
  "hats": [
    {
      "key": "white",
      "findings": [
        { "lead": "Lead phrase.", "body": "Explanation of the finding..." },
        { "lead": "Lead phrase.", "body": "Explanation..." },
        { "lead": "Lead phrase.", "body": "Explanation..." },
        { "lead": "Lead phrase.", "body": "Explanation..." },
        { "lead": "Lead phrase.", "body": "Explanation..." },
        { "lead": "Lead phrase.", "body": "Explanation..." }
      ]
    },
    { "key": "red", "findings": [ ...6 findings... ] },
    { "key": "green", "findings": [ ...6 findings... ] },
    { "key": "black", "findings": [ ...6 findings... ] },
    { "key": "yellow", "findings": [ ...6 findings... ] },
    { "key": "blue", "findings": [ ...6 findings... ] }
  ]
}
```

Then run:
```bash
node /home/claude/six-hats-analysis/assets/build_docx.js
```

The script writes `/mnt/user-data/outputs/Six_Hats_Analysis.docx`. It handles all styling automatically:
- Title block with the hypothesis
- Color-coded hat headers matching de Bono's convention (white/red/green/black/yellow/blue)
- Items 1–6 as numbered bullets with bold lead + body
- Items 7–10 as light-gray italic placeholder bullets reading "Team input — add a finding here"

After the docx is written, call `present_files` with the output path to share it with the user.

Do not write the docx from scratch — the build script encodes the correct styling, colors, and placeholder formatting.
