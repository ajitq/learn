// Learn Anything — vanilla SPA. Hash routes:
//   #/                          home (list courses)
//   #/c/:courseId               course overview + progress
//   #/c/:courseId/s/:n          one session (playlist + checklist + journal)
// All mutable state lives on the server via /api/state/* so it syncs across devices.

const app = document.getElementById("app");
const topbarCtx = document.getElementById("topbar-context");

const TYPE_ICON = {
  reading: "📖", pdf: "📄", video: "🎬", link: "🔗",
  tool: "🛠️", assignment: "✍️", podcast: "🎧", audio: "🎧",
};

// --- tiny helpers ----------------------------------------------------------
const el = (tag, props = {}, ...kids) => {
  const node = Object.assign(document.createElement(tag), props);
  for (const k of kids.flat()) node.append(k?.nodeType ? k : document.createTextNode(k ?? ""));
  return node;
};
const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const getJSON = (url) => fetch(url).then((r) => { if (!r.ok) throw new Error(url + " -> " + r.status); return r.json(); });

// Render journal text as light markdown-ish HTML: paragraphs, links, and ![](img).
function renderNote(text) {
  return esc(text)
    .replace(/!\[[^\]]*\]\(([^)]+)\)/g, (_m, u) => `<img src="${esc(u)}" style="max-width:100%;border-radius:10px;margin:6px 0;" />`)
    .replace(/\bhttps?:\/\/[^\s)]+/g, (u) => /<img/.test(u) ? u : `<a href="${u}" target="_blank" rel="noopener">${u}</a>`)
    .replace(/\n/g, "<br>");
}

// --- router ----------------------------------------------------------------
async function route() {
  const parts = (location.hash.replace(/^#\/?/, "")).split("/").filter(Boolean);
  app.innerHTML = '<div class="loading">Loading…</div>';
  topbarCtx.textContent = "";
  try {
    if (parts[0] === "c" && parts[2] === "s") await renderSession(parts[1], Number(parts[3]));
    else if (parts[0] === "c") await renderCourse(parts[1]);
    else await renderHome();
    window.scrollTo(0, 0);
  } catch (e) {
    app.innerHTML = "";
    app.append(el("p", { className: "empty" }, "Something went wrong: " + e.message));
  }
}

// --- home ------------------------------------------------------------------
async function renderHome() {
  const { courses } = await getJSON("/courses/index.json");
  app.innerHTML = "";
  app.append(
    el("h1", {}, "Learn Anything"),
    el("p", { className: "lede" }, "Pick a course. Work through it one session at a time.")
  );
  for (const c of courses) {
    const card = el("a", { className: "card", href: `#/c/${c.id}` },
      el("div", { className: "card-emoji" }, c.emoji || "📘"),
      el("h3", {}, c.title),
      el("p", {}, c.tagline || ""),
      el("p", { style: "margin-top:8px;font-size:.8rem" }, `${c.sessions} sessions`)
    );
    app.append(card);
  }
}

// --- course overview -------------------------------------------------------
async function renderCourse(courseId) {
  const [course, states] = await Promise.all([
    getJSON(`/courses/${courseId}/course.json`),
    getJSON(`/api/state/${courseId}`).catch(() => []),
  ]);
  const doneSet = new Set(states.filter((s) => s.complete).map((s) => s.session));
  topbarCtx.textContent = course.title;

  const total = course.sessions.length;
  const done = course.sessions.filter((s) => doneSet.has(s.n)).length;
  const current = course.sessions.find((s) => s.available && !doneSet.has(s.n)) || course.sessions[0];

  app.innerHTML = "";
  app.append(
    el("a", { className: "back", href: "#/" }, "← All courses"),
    el("h1", {}, course.title),
    el("p", { className: "lede" }, course.tagline)
  );

  // progress
  const pct = total ? Math.round((done / total) * 100) : 0;
  app.append(el("div", { className: "progress" },
    el("div", { className: "progress-bar" }, el("div", { className: "progress-fill", style: `width:${pct}%` })),
    el("div", { className: "progress-label" }, `${done} of ${total} sessions complete`)
  ));

  // continue
  if (current) {
    app.append(el("a", { className: "continue", href: `#/c/${courseId}/s/${current.n}` },
      el("span", {}, el("small", {}, done ? "Continue" : "Start here"), `Week ${current.n} · ${current.title}`),
      el("span", { className: "arrow" }, "→")
    ));
  }

  if (course.description) app.append(el("p", { className: "item-detail", style: "margin-bottom:8px" }, course.description));

  // session list grouped by quarter
  const quarters = course.quarters || [{ id: null, title: null }];
  for (const q of quarters) {
    const rows = course.sessions.filter((s) => (q.id ? s.quarter === q.id : true));
    if (!rows.length) continue;
    if (q.title) app.append(el("div", { className: "quarter-title" }, q.title));
    for (const s of rows) {
      const isDone = doneSet.has(s.n);
      const locked = !s.available;
      const row = el(locked ? "div" : "a",
        { className: "session-row" + (isDone ? " done" : "") + (locked ? " locked" : ""),
          href: locked ? undefined : `#/c/${courseId}/s/${s.n}` },
        el("span", { className: "session-num" }, isDone ? "✓" : String(s.n)),
        el("span", { className: "session-title" }, s.title),
        el("span", { className: "session-state" }, locked ? "🔒" : (isDone ? "" : "›"))
      );
      app.append(row);
    }
  }
}

// --- session ---------------------------------------------------------------
async function renderSession(courseId, n) {
  const pad = String(n).padStart(2, "0");
  const [session, state] = await Promise.all([
    getJSON(`/courses/${courseId}/sessions/week-${pad}.json`),
    getJSON(`/api/state/${courseId}/${n}`).catch(() => ({ checks: [], journal: "", photos: [], complete: false })),
  ]);
  topbarCtx.textContent = `Week ${n}`;

  // mutable local copy of state
  const st = {
    checks: new Set(state.checks || []),
    journal: state.journal || "",
    photos: state.photos || [],
  };
  const itemIds = session.playlist.map((it) => it.id);
  const isComplete = () => itemIds.every((id) => st.checks.has(id));

  // --- save plumbing (debounced) ---
  let saveTimer = null;
  const saveBadge = el("span", { className: "save-state" }, "");
  async function save(now = false) {
    clearTimeout(saveTimer);
    const doSave = async () => {
      saveBadge.textContent = "Saving…";
      try {
        await fetch(`/api/state/${courseId}/${n}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            checks: [...st.checks], journal: st.journal,
            photos: st.photos, complete: isComplete(),
          }),
        });
        saveBadge.textContent = "Saved ✓";
        setTimeout(() => { if (saveBadge.textContent === "Saved ✓") saveBadge.textContent = ""; }, 1500);
      } catch {
        saveBadge.textContent = "Offline — will retry";
      }
    };
    if (now) return doSave();
    saveTimer = setTimeout(doSave, 700);
  }

  app.innerHTML = "";
  app.append(
    el("a", { className: "back", href: `#/c/${courseId}` }, "← Course overview"),
    el("span", { className: "pill" }, `Week ${n}${session.estimate ? " · " + session.estimate : ""}`),
    el("h1", { style: "margin-top:8px" }, session.title)
  );
  if (session.bigIdea) app.append(el("p", { className: "bigidea" }, session.bigIdea));
  if (session.goal) app.append(el("div", { className: "goal" }, el("strong", {}, "Goal. "), session.goal));
  if (session.outcomes?.length) {
    app.append(el("h2", {}, "By the end you'll have"));
    app.append(el("ul", { className: "outcomes" }, ...session.outcomes.map((o) => el("li", {}, o))));
  }

  // --- playlist + checklist (one combined list) ---
  app.append(el("h2", {}, "Playlist & checklist"));
  if (session.checklistNote) app.append(el("p", { className: "item-detail", style: "margin-top:-4px" }, session.checklistNote));

  const completeBanner = el("div", { className: "goal", style: "border-left-color:var(--ok)", hidden: !isComplete() },
    el("strong", { style: "color:var(--ok)" }, "Session complete! "), session.nextUp ? "Next session is unlocked." : "Nicely done.");

  function refreshCompleteBanner() { completeBanner.hidden = !isComplete(); }

  for (const it of session.playlist) {
    const checked = st.checks.has(it.id);
    const cb = el("input", { type: "checkbox", checked });
    const itemEl = el("label", { className: "item" + (checked ? " checked" : "") },
      el("span", { className: "item-check" }, cb),
      el("div", { className: "item-body" },
        el("div", { className: "item-head" },
          el("span", { className: "item-type", title: it.type }, TYPE_ICON[it.type] || "•"),
          el("span", { className: "item-title" }, it.title),
          it.core ? el("span", { className: "badge-core" }, "core") : "",
          it.est ? el("span", { className: "item-meta" }, "· " + it.est) : "",
          it.pages ? el("span", { className: "item-meta" }, "· " + it.pages) : ""
        ),
        it.detail ? el("p", { className: "item-detail" }, it.detail) : "",
        linkFor(courseId, it)
      )
    );
    cb.addEventListener("change", () => {
      if (cb.checked) st.checks.add(it.id); else st.checks.delete(it.id);
      itemEl.classList.toggle("checked", cb.checked);
      refreshCompleteBanner();
      save();
    });
    app.append(itemEl);
  }
  app.append(completeBanner);

  // --- journal ---
  app.append(el("hr", { className: "sep" }));
  app.append(el("h2", {}, "Journal"));
  app.append(el("p", { className: "item-detail", style: "margin-top:-4px" },
    "Your notes for this session. Paste links, and add photos of homework. Markdown-ish: links auto-link, images embed."));

  const ta = el("textarea", { value: st.journal, placeholder: "What did you learn? Your clearance number, things that surprised you, photos of your prints…" });
  ta.addEventListener("input", () => { st.journal = ta.value; save(); });

  const fileInput = el("input", { type: "file", accept: "image/*", hidden: true });
  const addPhotoBtn = el("button", { className: "btn", type: "button" }, "📷 Add photo");
  addPhotoBtn.addEventListener("click", () => fileInput.click());

  const photosWrap = el("div", { className: "photos" });
  function renderPhotos() {
    photosWrap.innerHTML = "";
    st.photos.forEach((url, i) => {
      const fig = el("figure", {},
        el("img", { src: url, loading: "lazy" }),
        el("button", { className: "rm", type: "button", title: "Remove" }, "×")
      );
      fig.querySelector(".rm").addEventListener("click", () => {
        st.photos.splice(i, 1); renderPhotos(); save(true);
      });
      // tapping the image inserts a markdown ref into the journal
      fig.querySelector("img").addEventListener("click", () => {
        ta.value += (ta.value && !ta.value.endsWith("\n") ? "\n" : "") + `![photo](${url})\n`;
        st.journal = ta.value; ta.focus(); save();
      });
      photosWrap.append(fig);
    });
  }
  renderPhotos();

  fileInput.addEventListener("change", async () => {
    const file = fileInput.files[0];
    if (!file) return;
    saveBadge.textContent = "Uploading photo…";
    const fd = new FormData();
    fd.append("photo", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const { url } = await res.json();
      st.photos.push(url);
      renderPhotos();
      await save(true);
    } catch {
      saveBadge.textContent = "Photo upload failed";
    }
    fileInput.value = "";
  });

  app.append(el("div", { className: "journal" }, ta,
    el("div", { className: "journal-bar" }, addPhotoBtn, fileInput, saveBadge),
    photosWrap
  ));

  if (session.nextUp) app.append(el("div", { className: "nextup" }, el("strong", {}, "Next up — "), session.nextUp));
}

// Build the action link for a playlist item (PDF served from course folder, or external URL).
function linkFor(courseId, it) {
  if (it.type === "pdf" && it.file) {
    const href = `/courses/${courseId}/` + encodeURIComponent(it.file);
    return el("a", { className: "item-link", href, target: "_blank", rel: "noopener" }, "Open PDF →");
  }
  if (it.url) {
    const label = { video: "Watch →", link: "Open →", tool: "Get it →", podcast: "Listen →", audio: "Listen →" }[it.type] || "Open →";
    return el("a", { className: "item-link", href: it.url, target: "_blank", rel: "noopener" }, label);
  }
  return "";
}

window.addEventListener("hashchange", route);
route();
