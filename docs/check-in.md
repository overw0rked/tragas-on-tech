# ✅ Check-in de asistentes

Cómo registrar tu asistencia a una **#TragasOnTech** — y cómo el roster se
actualiza **solo**.

---

## Para asistentes — en 5 segundos

1. Escanea el **QR de la puerta** (o abre el issue de check-in del evento, que
   está *pineado* en el repo).
2. **Reacciona con 🌮** (o 👍) **o comenta `presente`**. ¿Traes acompañante?
   Coméntalo (`+1`, `+2`…).
3. ¡Listo! Apareces en el [calendario](calendario.md) y en el roster histórico.

> Tu identidad es tu **handle de GitHub** — así no hay registros duplicados.

---

## Para quien organiza

1. **Antes del evento:** Issues → *New issue* → **✅ Check-in de evento**.
   - Ajusta el **título** a `Check-in · YYYY-MM-DD · Motivo`
     (p. ej. `Check-in · 2026-07-15 · Flutter MX`). El [GitHub Action](../.github/workflows/check-in.yml)
     lee la fecha y el motivo del título.
   - El label `check-in` se aplica solo desde la plantilla.
2. **Pinea** el issue y genera un **QR** apuntando a su URL (cualquier generador
   de QR sirve). Imprímelo para la puerta del rDl.
3. Durante y después, el Action recoge **comentarios + reacciones** y actualiza
   `docs/calendario.md` automáticamente.
   - ¿Re-sincronizar a mano? Actions → **Check-in** → *Run workflow* → número del issue.

---

## Cómo funciona por dentro

- **Fuente de verdad:** [`data/checkins.json`](../data/checkins.json). El markdown
  del calendario se **regenera** desde ahí (regiones marcadas *no editar a mano*).
- El [script](../scripts/update-roster.mjs) (Node, sin dependencias) cuenta
  asistencias por handle y mantiene el roster histórico.
- Ese **conteo de asistentes** es justo el headcount para
  [compras](compras.md) (~250 g/persona) — check-in → cuántos somos → cuánto comprar.

---

> ⚠️ **Límite de este enfoque (Tier 0):** requiere cuenta de GitHub. Si tus
> #TragasOnTech jalan gente sin cuenta, el siguiente paso natural es un
> **QR → formulario** (sin login) que sincronice al mismo roster. Cuando duela,
> lo migramos.
