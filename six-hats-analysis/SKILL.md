---
name: six-hats-analysis
description: Runs a structured Edward de Bono Six Thinking Hats evaluation of any hypothesis, thesis, idea, proposal, strategy, or design concept the user submits. Produces a numbered report with six Claude-generated findings per hat plus four blank team-input slots under each hat (10 total per hat). Use this skill whenever the user asks for a "six hats analysis," "six thinking hats," "de Bono analysis," "hat-by-hat review," or wants a hypothesis, idea, proposal, business concept, product decision, or strategic option evaluated from multiple structured perspectives. Also trigger this skill when the user provides a thesis or idea and asks Claude to "evaluate it from every angle," "run it through the six hats," or produce a facilitation-ready worksheet for a team brainstorm. Always web-searches to ground the White Hat findings in current facts. Offers Markdown, Word (.docx), or both as output formats, chosen per run.
---

# Six Thinking Hats Analysis

Runs a structured Edward de Bono Six Thinking Hats evaluation against a user-provided hypothesis and produces a report with 6 Claude-generated findings plus 4 blank team-input slots (10 items total) under each hat.

## When this skill runs

The user provides a hypothesis, thesis, idea, or proposal (either directly or in response to a prompt). The skill produces a full six-hat evaluation of that hypothesis in the user's chosen output format.

## Workflow

### Step 1 — Confirm hypothesis and ask for output format

If the user hasn't clearly stated their hypothesis, ask for it. Once you have a hypothesis, ask **one** question using `ask_user_input_v0`:

> "What output format would you like?"
> Options: `Chat (Markdown)` · `Word document (.docx)` · `Both`

Do not ask any other questions. Do not ask for scope, audience, tone, or length preferences — this skill has fixed defaults.

### Step 2 — Web-search for White Hat facts

Before writing the White Hat section, run web searches to ground the factual findings in current, verifiable information relevant to the hypothesis. Search topics grounded in the hypothesis's domain (statistics, prevalence, benchmarks, program data, regulatory context, etc.). Use at least 2–4 searches. Prefer authoritative sources (government agencies, peer-reviewed literature, established industry reports). Cite in-text where the fact directly supports a claim, using the standard citation format.

If the hypothesis is not about a real-world empirical topic (e.g., it's a purely abstract or fictional idea), skip searching and note in the White Hat that no external facts apply — but still produce 6 substantive analytical findings.

### Step 3 — Generate the six hats

Produce **6 numbered findings per hat**, in this order: **White, Red, Green, Black, Yellow, Blue**. Each finding is one short paragraph (~2–4 sentences), led by a **bold summary phrase** followed by the explanation.

Under each hat's 6 findings, add **4 blank team-input slots** numbered 7–10, formatted as light-gray italic placeholder bullets. This gives every hat 10 total items — 6 Claude-generated + 4 for the team to fill in during a live session.

Follow the hat definitions strictly (see `references/hat_definitions.md` for full guidance):

- **White Hat** — objective facts and figures, neutral analysis, grounded in web-search findings
- **Red Hat** — gut-level emotional reactions (positive and negative), no justification required
- **Green Hat** — creative, associative, generative alternatives; constructive but not yet evaluated
- **Black Hat** — critical judgment; risks, problems, skepticism, fears
- **Yellow Hat** — realistic optimism; opportunities, pluses, desirable goals
- **Blue Hat** — meta-level classification; the big picture, where the idea fits in larger systems

### Step 4 — Produce the output

Consult `references/output_formats.md` for the exact format specifications for both Markdown and Word outputs. Follow the template exactly — the placeholder styling and numbering scheme are important for the team-input slots to be usable.

For Word output, use the docx build script at `assets/build_docx.js`. It expects a JSON file at `/home/claude/six_hats_input.json` containing the hypothesis and all six hats' findings, and writes the output to `/mnt/user-data/outputs/Six_Hats_Analysis.docx`. After writing the file, call `present_files` to share it with the user.

For "Both", produce the Markdown response in chat *and* generate the Word document as a downloadable file.

## Notes on style

- Keep each finding tight — one bold lead + 2–4 sentences of explanation. Do not write long essays per finding.
- The Red Hat is unfiltered feelings — do not justify or rationalize; that's what the other hats are for.
- The Green Hat should not be filtered by feasibility; save critique for the Black Hat.
- The Blue Hat should genuinely step back — classify the idea, name the larger system it belongs to, not just summarize the other hats.
- Never merge hats or produce fewer than 6 findings per hat. If a hat is difficult for a given hypothesis, dig harder rather than reducing the count.
