---
name: commit-message
description: Use when the user asks to write, generate, or suggest a git commit message for staged or unstaged changes. Writes the entire message as plain, human-readable bullet points.
---

# commit-message

This skill generates a plain-English commit message based on workspace changes, formatted as a simple list of bullet points for non-technical readability.

## Workflow
1. **Analyze Changes**:
   - Run `git diff --staged` to see staged changes.
   - If nothing is staged, fallback to `git diff` to see all current changes.
2. **Draft Message**:
   - Identify the key changes and their impact.
   - Translate technical changes into plain, simple English that a non-technical person can understand.
   - Order the changes by importance, with the most significant change first.
3. **Present**:
   - Output the drafted bullet points directly to the user for review.

## Hard Rules
- **Bullet-Only Format**: The entire message must be written as a list of bullet points. Do NOT include a standalone summary line, introductory paragraphs, or headings above the bullets.
- **No Technical Structuring**: Do NOT use Conventional Commits style or any technical tags (e.g., no `feat(auth):`, `fix(api):`, or `docs(prompts):`). Use plain wording only.
- **No Git Mutations**: Never execute `git commit`, `git push`, or any command that stages, commits, or pushes changes. This skill is strictly for drafting the message; the user will perform the commit manually.

## Constraints
- Each bullet must be short (≤ 1 line).
- Use plain English and avoid jargon.
- Output only the suggested message.
