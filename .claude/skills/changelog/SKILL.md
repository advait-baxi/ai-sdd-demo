---
name: changelog
description: Updates CHANGELOG.md from git commit history
---

# Changelog Update

This skill updates the `CHANGELOG.md` file in the project root based on git commit history.

## Process
1. **Analyze Existing Changelog**: Read `CHANGELOG.md` if it exists. Identify the most recent date entry (e.g., `## 2026-07-26`).
2. **Fetch Commits**:
   - If `CHANGELOG.md` exists and has a recent date, fetch commits since that date using `git log --since="YYYY-MM-DD"`.
   - If `CHANGELOG.md` doesn't exist or has no dates, fetch all commits.
   - Use `git log --date=short --pretty=format:"%ad %s"` to get the list of commits with their dates.
3. **Organize Changes**:
   - Group the fetched commits by their date.
   - For each date, summarize the changes into bullet points.
4. **Update File**:
   - Use the format:
     ```markdown
     ## [YYYY-MM-DD]
     - Commit message 1
     - Commit message 2
     ```
   - Prepend new entries to the top of the changelog (below the main title) to maintain reverse chronological order.
5. **Review**: Read the updated `CHANGELOG.md` to ensure the formatting is correct and no duplicates were introduced.
