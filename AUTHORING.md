# Authoring courses & sessions

Content is just JSON files — no code changes needed to add a course or a week.

## Add a course

1. Add an entry to `courses/index.json`:
   ```json
   { "id": "my-course", "title": "…", "tagline": "…", "emoji": "📘", "sessions": 30 }
   ```
2. Create `courses/my-course/course.json` (see `mechanism-design/course.json`):
   - `title`, `emoji`, `tagline`, `description`
   - `quarters`: optional grouping `[{ "id": "q1", "title": "…", "weeks": "1–13" }]`
   - `sessions`: `[{ "n": 1, "quarter": "q1", "title": "…", "available": true }]`
     - `available: false` shows the session locked (🔒). Flip to `true` to unlock.
3. Create `courses/my-course/sessions/week-01.json` (schema below).

## Session schema (`week-NN.json`)

`NN` is zero-padded (`week-01.json`, `week-12.json`).

```jsonc
{
  "n": 1,
  "title": "…",
  "estimate": "~4 hours",          // optional, shown in the header pill
  "bigIdea": "…",                  // optional one-liner, italic
  "goal": "…",                     // optional highlighted goal box
  "outcomes": ["…", "…"],          // optional bullet list
  "playlist": [                    // the items — also the checklist
    {
      "id": "unique-id",           // stable id; used to store the checkmark
      "type": "pdf",               // pdf | reading | video | link | tool | assignment | podcast
      "title": "…",
      "detail": "…",               // optional description
      "est": "60 min",             // optional time estimate
      "core": true,                // optional "core" badge

      // ONE source, depending on type:
      "file": "norton-…-28-56.pdf",// for type "pdf": filename in the course folder
      "pages": "pp. 28–56",        // optional label shown next to a pdf
      "url": "https://…"           // for video/link/tool/podcast: external link
    }
  ],
  "checklistNote": "…",            // optional note under the checklist heading
  "nextUp": "…"                    // optional teaser for the next session
}
```

A session is marked **complete** (and the next unlocks visually) when every
`playlist` item is checked. Completion is stored server-side per session.

## Generating a session with an LLM

The intended workflow: feed the course `plan.md` (the week's paragraph) to an LLM
and ask for a `week-NN.json` matching the schema above. Keep these rules:

- Turn each *Reading / Theory / Tool / Project* bullet into a playlist item with the
  right `type`. Mark genuinely essential items `"core": true`.
- For Norton readings, use `type: "pdf"` and point `file` at the page-range PDF that
  covers those chapters; put the page range in `pages`.
- Use real URLs from the plan's resource appendix for videos/tools/links.
- Keep `id`s short, unique within the file, and stable (don't renumber later — ids
  are how saved checkmarks map to items).

## PDFs

Course PDFs are committed in the course folder and served statically. Reference
them by exact filename in a `pdf` item's `file` field; the frontend URL-encodes
the path, so spaces and brackets in filenames are fine. Note that the Norton
files are split by **page range**, not chapter — one chapter can span two files
(e.g. Ch. 1 = `…-28-56.pdf`, Ch. 2 = `…-57-124.pdf`), so add one item per file.
