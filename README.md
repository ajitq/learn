# Learn Anything

A minimalist, mobile-friendly, content-based course site. Pick a course, work
through it one **session** at a time. Each session is a **playlist** (PDFs,
readings, videos, links, tools, assignments) doubling as a **checklist**, plus a
**journal** for notes and photos of your work.

First course: **Mechanism & Automaton Design** — a one-year, ~4 h/week curriculum
that ends in a hand-cranked automaton.

## How it works

- **Static content** — courses live as plain files under `courses/`:
  - `courses/index.json` — the list of courses.
  - `courses/<id>/course.json` — course metadata + the full session list.
  - `courses/<id>/sessions/week-NN.json` — one file per session (the playlist).
  - PDFs (e.g. the Norton chapters) sit in the course folder and are served as-is.
- **Server state** — the only mutable data (checklist ticks, journal text, uploaded
  photos) is stored server-side in SQLite, so it's identical on every phone and
  laptop. Single user, no login (for now).
- **Frontend** — a dependency-free vanilla-JS SPA in `public/`. Mobile-first.

Sessions are **pre-generated** (an LLM writes each `week-NN.json` from the course
`plan.md`). The app only needs the file to exist, so you can author all weeks up
front or one at a time — see `AUTHORING.md`. Week 1 of Mechanism Design is done.

## Run locally

```bash
npm install
npm start          # http://localhost:3000
```

The Norton chapter PDFs are committed under `courses/mechanism-design/`, so reading
links resolve out of the box.

## Deploy

See `DEPLOY.md` — Node + systemd + nginx on a DigitalOcean droplet.

## Repo layout

```
server.js              Express server: static files + /api/state + /api/upload
public/                Frontend SPA (index.html, styles.css, app.js)
courses/               Course content (json + md + pdfs), served statically
deploy/                systemd unit + nginx config
AUTHORING.md           How to add a course or generate a session
DEPLOY.md              Droplet setup
```
