# Six Thinking Hats Analysis — a Claude Skill

A [Claude skill](https://support.anthropic.com/en/articles/12111783-what-are-skills) that runs a structured Edward de Bono **Six Thinking Hats** evaluation against any hypothesis, thesis, idea, proposal, or strategy — and produces a facilitation-ready report with **10 slots per hat**: 6 Claude-generated findings plus 4 blank team-input slots.

Perfect for design reviews, product decisions, strategy sessions, research critiques, and any group brainstorm where you want structured, multi-perspective thinking without letting one loud voice dominate.

---

## What it does

Give the skill a hypothesis. It will:

1. **Ask one question** — Chat (Markdown), Word (.docx), or both.
2. **Search the web** to ground the White Hat findings in current facts and figures.
3. **Generate six perspectives** on your hypothesis, one hat at a time:

| Hat | Focus | What it produces |
|---|---|---|
| 🤍 **White** | Facts & Information | Objective data, statistics, benchmarks (web-searched) |
| ❤️ **Red** | Feelings & Emotion | Unfiltered emotional reactions, both positive and negative |
| 💚 **Green** | Creativity & Alternatives | Associative, generative ideas — no filtering for feasibility |
| 🖤 **Black** | Caution & Critical Judgment | Risks, blind spots, equity concerns, failure modes |
| 💛 **Yellow** | Optimism & Benefits | Realistic upside, opportunities, moments of high leverage |
| 💙 **Blue** | Process & Big Picture | Meta-level classification, systems thinking |

4. **Leave four blank slots (items 7–10)** under every hat, formatted as light-gray italic placeholders, for teams to fill in during a live session.

The result is a **60-item shared view** of your idea (10 items × 6 hats) that you can walk into a meeting with.

---

## Installation

1. Download `six-hats-analysis.skill` from the [releases page](../../releases) (or from the repo root).
2. Open Claude on the web or desktop app.
3. Drop the `.skill` file into any conversation and click **Save skill**.

That's it — the skill will now trigger automatically whenever you ask Claude for a six hats analysis.

---

## Usage

Trigger it with natural phrases like:

- *"Run a six hats analysis on: [your hypothesis]"*
- *"Six thinking hats: should we sunset the free tier?"*
- *"Evaluate this from every angle: [your idea]"*
- *"De Bono analysis on our onboarding redesign proposal"*

Claude will ask which output format you want, then produce the full report.

### Example hypothesis

> *"After a primary care visit with labs, patients need to know whether they are prediabetic, understand available nutrition/activity/stress resources matched to their readiness, and know whether their employer or insurer will pay for it."*

### What the output looks like

Each hat gets its own color-coded header, then a numbered list restarting at 1:

```
🤍 White Hat — Facts & Information
1. Multiple large-scale studies show mixed results. …
2. Self-reported productivity is higher than measured productivity. …
3. …
6. Effects vary by employee tenure and job function. …
7. [ Team input — add a finding here ]
8. [ Team input — add a finding here ]
9. [ Team input — add a finding here ]
10. [ Team input — add a finding here ]
```

See `examples/Six_Hats_Analysis.docx` for a full sample output.

---

## Pair it with a Miro board

If you're running this exercise with a team, the report pairs nicely with the [AI-Aided Six Thinking Hats With ChatGPT template on Miro](https://miro.com/templates/aiaided-six-thinking-hats-template/) — the six-hat frame from the report maps 1:1 to the board, so participants can copy findings 1–6 onto their hats and use slots 7–10 to add live input as sticky notes.

---

## Learning the method

If you or your team want to go deeper on the underlying method before running your first session:

- **Official training** — the [De Bono Group's Six Thinking Hats program](https://www.debonogroup.com/services/core-programs/six-thinking-hats/) is the authoritative source, offering certified courses and facilitator training in the method Dr. de Bono developed.
- **Designing your own team probes** — this open-access article, ["Six Thinking Hats model of learning — Creative teaching"](https://pmc.ncbi.nlm.nih.gov/articles/PMC10967933/), is a useful resource for facilitators who want to write custom, domain-specific prompts for each hat. It's especially helpful when populating the four team-input slots (items 7–10) with questions tailored to your organization or use case.

---

## Repository structure

```
six-hats-analysis/
├── SKILL.md                         # trigger description + workflow
├── references/
│   ├── hat_definitions.md           # strict per-hat thinking rules
│   └── output_formats.md            # Markdown + Word format specs
└── assets/
    └── build_docx.js                # Word document builder (docx-js)
```

---

## Customization

Fork this repo to change any of the following:

- **Add or remove hats** — edit `HAT_META` and `HAT_ORDER` in `assets/build_docx.js` and add corresponding sections to `SKILL.md`.
- **Change the number of findings per hat** — edit the loop counts in `hatSectionParagraphs()` and update `SKILL.md` accordingly.
- **Adjust the placeholder text** — change the string in `placeholderParagraph()` in `assets/build_docx.js` and the Markdown template in `references/output_formats.md`.
- **Tune the trigger sensitivity** — the `description:` field in `SKILL.md` controls when Claude decides to invoke this skill. Add or remove phrases to make it fire more or less aggressively.

---

## Credits & attribution

- The **Six Thinking Hats** method was developed by [Dr. Edward de Bono](https://en.wikipedia.org/wiki/Six_Thinking_Hats). This skill is an implementation aid for facilitators using his method; the method itself is his.
- Built as a [Claude skill](https://support.anthropic.com/en/articles/12111783-what-are-skills) using [Anthropic's skill format](https://github.com/anthropics/skills).
- Word documents are generated with [`docx-js`](https://github.com/dolanmiu/docx).

---

## License

MIT — see [`LICENSE`](LICENSE).

The Six Thinking Hats method itself is the intellectual property of the de Bono estate. This repository provides a facilitation aid, not the method.

---

## Contributing

Issues and pull requests welcome — especially for:

- Additional output formats (Google Docs, PDF, Notion)
- Localized versions (translated hat definitions and placeholders)
- Facilitator templates for specific use cases (product review, hiring decision, RFP evaluation, etc.)
