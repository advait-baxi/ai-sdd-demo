## Purpose of CLAUDE.md

- Auto-loaded into every Claude Code session — persistent project context, no repeating yourself
- Orients the agent instantly: project stack, structure, and key conventions
- Encodes rules a linter can't (naming, patterns, error handling) so output matches team style
- Flags known pitfalls/"don't touch" areas to prevent repeated mistakes
- Improves accuracy and consistency by aligning agent behavior with actual repo practices

## Prompt

Analyze this repository and generate a CLAUDE.md file for the project root. Follow these constraints strictly:

Goal: Give future Claude sessions exactly the context needed to work correctly in this codebase — nothing more.

Hard limits:

Under 60–80 lines total (aim for the shortest version that loses zero critical information).
No explanations, no filler sentences, no restating the obvious (e.g. don't say "this project uses TypeScript" and then also explain what TypeScript is).
Every line must change how you'd act in this repo. If removing a line wouldn't change my behavior, cut it.

Include only if true/discoverable in the repo — skip sections that don't apply:

One-line project description + stack
Commands that aren't guessable (build/test/lint/dev — only if non-standard or non-obvious from package.json/Makefile)
Non-obvious architectural facts (e.g. "auth logic lives in X, don't touch Y directly")
Hard conventions that a linter can't enforce (naming patterns, error-handling style, import rules)
Explicit "don't do X" warnings — only for mistakes that are likely and costly, not generic advice
Key directories — only if the structure isn't self-evident

Do NOT include:

Anything a linter/formatter/CI already enforces
Anything you'd learn correctly just by reading the code for 2 minutes
General best-practice advice not specific to this repo
Full API references or exhaustive file listings — link to docs instead if they exist

Use terse bullet points under minimal headers. Prefer a code block for commands. Output only the final CLAUDE.md content.
