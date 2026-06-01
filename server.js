// Learn Anything — minimal server.
// Serves the static frontend + course content, and a tiny JSON API for the
// learner's mutable state (checklist, journal, photos) backed by SQLite.
// Single user, no auth (for now). State lives on the server so it is identical
// across every phone and computer.

import express from "express";
import multer from "multer";
import Database from "better-sqlite3";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";
import { mkdirSync, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

// --- storage ---------------------------------------------------------------
const DATA_DIR = process.env.DATA_DIR || join(__dirname, "data");
const UPLOAD_DIR = join(DATA_DIR, "uploads");
mkdirSync(UPLOAD_DIR, { recursive: true });

const db = new Database(join(DATA_DIR, "learn.db"));
db.pragma("journal_mode = WAL");
db.exec(`
  CREATE TABLE IF NOT EXISTS session_state (
    course   TEXT    NOT NULL,
    session  INTEGER NOT NULL,
    checks   TEXT    NOT NULL DEFAULT '[]',
    journal  TEXT    NOT NULL DEFAULT '',
    photos   TEXT    NOT NULL DEFAULT '[]',
    complete INTEGER NOT NULL DEFAULT 0,
    updated  TEXT,
    PRIMARY KEY (course, session)
  );
`);

const selAll = db.prepare(`SELECT session, checks, journal, photos, complete, updated FROM session_state WHERE course = ?`);
const selOne = db.prepare(`SELECT session, checks, journal, photos, complete, updated FROM session_state WHERE course = ? AND session = ?`);
const upsert = db.prepare(`
  INSERT INTO session_state (course, session, checks, journal, photos, complete, updated)
  VALUES (@course, @session, @checks, @journal, @photos, @complete, @updated)
  ON CONFLICT(course, session) DO UPDATE SET
    checks = @checks, journal = @journal, photos = @photos,
    complete = @complete, updated = @updated
`);

const rowToState = (r) => ({
  session: r.session,
  checks: JSON.parse(r.checks),
  journal: r.journal,
  photos: JSON.parse(r.photos),
  complete: !!r.complete,
  updated: r.updated,
});

const EMPTY = (session) => ({ session, checks: [], journal: "", photos: [], complete: false, updated: null });

// --- app -------------------------------------------------------------------
const app = express();
app.use(express.json({ limit: "1mb" }));

// API: all state for a course (used by the course/progress page)
app.get("/api/state/:course", (req, res) => {
  const rows = selAll.all(req.params.course).map(rowToState);
  res.json(rows);
});

// API: state for one session
app.get("/api/state/:course/:session", (req, res) => {
  const session = Number(req.params.session);
  const row = selOne.get(req.params.course, session);
  res.json(row ? rowToState(row) : EMPTY(session));
});

// API: save state for one session (full replace)
app.put("/api/state/:course/:session", (req, res) => {
  const session = Number(req.params.session);
  const { checks = [], journal = "", photos = [], complete = false } = req.body || {};
  upsert.run({
    course: req.params.course,
    session,
    checks: JSON.stringify(Array.isArray(checks) ? checks : []),
    journal: String(journal),
    photos: JSON.stringify(Array.isArray(photos) ? photos : []),
    complete: complete ? 1 : 0,
    updated: new Date().toISOString(),
  });
  res.json({ ok: true });
});

// API: upload a homework photo -> returns a URL to embed in the journal
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (_req, file, cb) => cb(null, randomUUID() + (extname(file.originalname) || ".jpg")),
  }),
  limits: { fileSize: 15 * 1024 * 1024 },
});
app.post("/api/upload", upload.single("photo"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "no file" });
  res.json({ url: "/uploads/" + req.file.filename });
});

// Static: uploaded photos, course content (json/md/pdf), and the frontend.
app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/courses", express.static(join(__dirname, "courses")));
app.use(express.static(join(__dirname, "public")));

// SPA fallback: any non-API, non-file route serves the app shell.
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  res.sendFile(join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Learn Anything running on http://localhost:${PORT}`);
  if (!existsSync(join(__dirname, "public", "index.html"))) {
    console.warn("warning: public/index.html not found");
  }
});
