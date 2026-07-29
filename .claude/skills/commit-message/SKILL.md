---
name: commit-message
description: Generate high-quality commit messages based on file changes
---

# commit-message

This skill helps generate high-quality, concise commit messages based on the current changes in the workspace.

## Goals
- Generate commit messages that follow the Conventional Commits specification.
- Accurately summarize the "what" and "why" of the changes.
- Avoid generic messages like "updates" or "fixes".

## Workflow
1. **Analyze Changes**:
   - Run `git diff --cached` to see staged changes.
   - Run `git diff` to see unstaged changes.
   - If no changes are staged, analyze all current changes.
2. **Categorize the Change**:
   - `feat`: A new feature.
   - `fix`: A bug fix.
   - `docs`: Documentation only changes.
   - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
   - `refactor`: A code change that neither fixes a bug nor adds a feature.
   - `perf`: A code change that improves performance.
   - `test`: Adding missing tests or correcting existing tests.
   - `build`: Changes that affect the build system or external dependencies.
   - `ci`: Changes to our CI configuration files and scripts.
   - `chore`: Other changes that don't match the above.
3. **Draft the Message**:
   - **Header**: `<type>(<scope>): <description>`
     - `scope` is optional (e.g., a module or file name).
     - `description` should be in the imperative, present tense (e.g., "add login button", not "added login button").
   - **Body** (Optional): Provide a detailed explanation of the change if the header is not sufficient. Use the body to explain the "why" rather than the "what".
   - **Footer** (Optional): Reference issues (e.g., `Fixes #123`).
4. **Review and Present**:
   - Present the proposed commit message to the user.
   - Ask for confirmation or requests for modification.

## Tools to Use
- `Bash` for `git diff`.
- `Read` to examine specific files for better context if the diff is large or complex.
