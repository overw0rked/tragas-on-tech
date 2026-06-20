#!/usr/bin/env node
// Actualiza data/checkins.json y regenera las regiones autogeneradas de
// docs/calendario.md (check-in por evento + roster histórico).
//
// Uso:  node scripts/update-roster.mjs <issueNumber> <issueTitle> <participantsCsv>
//   participantsCsv: logins de GitHub separados por coma.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const [, , issueNumberRaw, issueTitle = "", participantsCsv = ""] = process.argv;
const issueNumber = String(issueNumberRaw || "").trim();
if (!issueNumber) {
  console.error("Falta el número de issue.");
  process.exit(1);
}

const DATA_PATH = "data/checkins.json";
const CAL_PATH = "docs/calendario.md";
const REPO = process.env.GITHUB_REPOSITORY || "";
const issueUrl = (n) => (REPO ? `https://github.com/${REPO}/issues/${n}` : `#${n}`);
const userUrl = (h) => `https://github.com/${h}`;

// --- Título: "Check-in · YYYY-MM-DD · Motivo"
const m = issueTitle.match(/(\d{4}-\d{2}-\d{2})\s*·\s*(.+?)\s*$/);
const date = m ? m[1] : "";
const motivo =
  (m ? m[2] : issueTitle.replace(/^\s*check-?in\s*·?\s*/i, "")).trim() || "Evento";

// --- Participantes únicos, sin bots
const participants = [
  ...new Set(
    participantsCsv
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((l) => !l.endsWith("[bot]"))
  ),
].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

// --- Datos
const data = existsSync(DATA_PATH)
  ? JSON.parse(readFileSync(DATA_PATH, "utf8"))
  : { events: {} };
data.events ||= {};
data.events[issueNumber] = { date, motivo, attendees: participants };

// --- Roster histórico: nº de eventos por handle + fecha más temprana
const roster = {};
for (const ev of Object.values(data.events)) {
  for (const h of ev.attendees) {
    roster[h] ||= { count: 0, since: ev.date || "" };
    roster[h].count += 1;
    if (ev.date && (!roster[h].since || ev.date < roster[h].since)) roster[h].since = ev.date;
  }
}

// --- Render: check-in por evento (más reciente arriba)
const eventsSorted = Object.entries(data.events).sort(
  ([, a], [, b]) => (b.date || "").localeCompare(a.date || "")
);
let checkinMd;
if (eventsSorted.length === 0) {
  checkinMd = "_Aún no hay check-ins registrados._";
} else {
  checkinMd = eventsSorted
    .map(([num, ev]) => {
      const handles = ev.attendees.length
        ? ev.attendees.map((h) => `[@${h}](${userUrl(h)})`).join(", ")
        : "_sin asistentes aún_";
      return (
        `### ${ev.date || "s/f"} · ${ev.motivo} — ${ev.attendees.length} asistente(s)\n` +
        `Check-in: [#${num}](${issueUrl(num)})\n\n` +
        `${handles}`
      );
    })
    .join("\n\n");
}

// --- Render: roster (más asistencias arriba)
const rosterRows = Object.entries(roster).sort(
  ([a, ra], [b, rb]) => rb.count - ra.count || a.toLowerCase().localeCompare(b.toLowerCase())
);
const rosterMd =
  rosterRows.length === 0
    ? "| *— por registrar —* | — | — |"
    : rosterRows
        .map(([h, r]) => `| [@${h}](${userUrl(h)}) | ${r.count} | ${r.since || "—"} |`)
        .join("\n");

// --- Inyecta entre marcadores
function inject(content, name, body) {
  const re = new RegExp(`(<!-- ${name}:START -->)[\\s\\S]*?(<!-- ${name}:END -->)`);
  if (!re.test(content)) throw new Error(`No encontré los marcadores ${name} en ${CAL_PATH}`);
  return content.replace(re, `$1\n${body}\n$2`);
}

let cal = readFileSync(CAL_PATH, "utf8");
cal = inject(cal, "CHECKIN", checkinMd);
cal = inject(cal, "ROSTER", rosterMd);
writeFileSync(CAL_PATH, cal);
writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + "\n");

console.log(
  `OK · evento #${issueNumber} (${date || "s/f"} · ${motivo}) · ${participants.length} asistente(s)`
);
