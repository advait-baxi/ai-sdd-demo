# Project Replanning

## Prompt 1

Update this tech-stack.md to capture that we want to use Vitest tests for validation and write a script in package.json.

## Prompt 2

Update existing specs and code to reflect these testing changes.

## Prompt 3

Write a new test suite using the specified testing framework.

## Prompt 4

The product's web UI should follow responsive design. Update the product specs and all feature specs to reflect this, as well as any code.

## Prompt 5

I want to keep a CHANGELOG.md in the project root, with headings for dates. If no changelog, examine git commits and add bullets for each date. Then, as we work, we will manually invoke this skill before merging. Help me write a skill for this.

## Prompt 6

Use following prompt to create a skill `commit-message`. Invoke this skill before each commit to generate a message for commit.

```
Create a Claude Code skill at ~/.claude/skills/commit-message/SKILL.md named commit-message.

Frontmatter:

name: commit-message
description: Use when the user asks to write, generate, or suggest a git commit message for staged or unstaged changes. Writes the entire message as plain, human-readable bullet points.

Behavior:

Run git diff --staged (fallback to git diff if nothing is staged) to inspect changes.

Write the entire commit message as bullet points — no standalone summary line, no paragraph, no heading above the bullets.

Each bullet describes one change in plain, simple English that any non-technical person could understand.
Do NOT use Conventional Commits style (no type(scope): prefixes like feat(auth):, fix(api):, docs(prompts):) and no other structured/technical tags.

Keep each bullet short (≤ 1 line, plain wording). List most important change first.

Output the message only — print/suggest it to me.

Never run git commit, git push, or any command that stages/commits/pushes changes. This skill only drafts the message; I will commit manually.

Add rules 2, 4, and 7 explicitly as hard rules in the SKILL.md body, not just in the description.
```

## Prompt 7

Go to the roadmap.md and combine phases 2-3-4-5 into a new phase 2.
