# 🗺️ Roadmap

Hacia dónde va la carnita. Documento vivo y **esfuerzo comunitario**: se mueve
según las ganas y posibilidades de la banda. ¿Una idea? Abre un issue o un PR.

**Estados:** ✅ listo · 🔜 próximo · 🧪 explorando · 💭 idea

---

## ✅ Ya disponible

- 📖 Guía completa: [espacio](README.md#-el-espacio--patio-del-rdl), [inventario](docs/inventario.md), [compras y cortes](docs/compras.md), [preparación y tiempos](docs/preparacion-y-logistica.md), [costos](docs/costos.md) y [feedback](docs/feedback.md)
- 🧰 Inventario como **tracker de faltantes** + [🏅 Cuadro de Honor](CUADRO-DE-HONOR.md)
- 📅 [Calendario de eventos](docs/calendario.md) + roster de asistentes históricos
- ✅ [Check-in self-service](docs/check-in.md): issue + QR + GitHub Action → roster automático

## 🔜 Próximo

- 📖 **Recetario** (salsas de molcajete, guac, charros, marinados…) — hoy [🚧 próximamente](docs/recetario.md)
- 📱 **POC de WhatsApp**: sondeo de asistencia con polls nativos

---

## 🧪 Integración de WhatsApp — *explorando*

El siguiente gran salto: llevar la organización a donde **ya está la comunidad**.
Con [`whatsapp-web.js`](https://wwebjs.dev/), el bot del grupo haría:

- 🗳️ **Polling / sondeo de asistencia** — poll nativo (*Voy / Tal vez / No / +1*) → **headcount previo** que alimenta las [compras](docs/compras.md) (~250 g/persona).
- 📅 **Fechas y recordatorios** — anuncio de la próxima carnita y recordatorio automático (p. ej. el día antes), sincronizado con el [calendario](docs/calendario.md).
- 🧾 **Resúmenes** — resumen automático al grupo: confirmados del sondeo y, post-evento, asistentes + cooperacha por persona + feedback destacado.
- 🌮 **Check-in del día** por texto (`presente`) como fuente de verdad confiable.
- 🔗 **Bridge al repo** — todo lo capturado en WhatsApp escribe el **mismo roster** (`data/checkins.json` + `calendario.md`). WhatsApp captura, el repo es el registro.

> ⚠️ **Nota técnica:** `whatsapp-web.js` es **no oficial** (automatiza WhatsApp Web
> con Puppeteer), requiere un **host siempre encendido** y conviene un número
> secundario; el evento `vote_update` es **inestable en grupos**, por eso el texto
> (`presente`) será la fuente de verdad y el poll, la UI bonita. Alternativa
> oficial en evaluación: **WhatsApp Cloud API de Meta**.

---

## 💭 Más adelante — ideas

- 🧮 **CLI `asada`** — `plan --personas N` (lista de compra + hielo + cuota) y `split` (cooperacha), deterministas.
- 🤖 **Capa agéntica** — skill de Claude Code / MCP para operar el repo en lenguaje natural (*"somos 10, arma la compra"*).
- 🙌 **Check-in para no-devs** — QR → formulario sin login que sincroniza al mismo roster.
- 🏅 Automatización del Cuadro de Honor y avisos de inventario faltante.

---

## 🙋 ¿Cómo influir en el roadmap?

Abre un issue con tu idea o mándala por PR — ver [cómo aportar](CONTRIBUTING.md).
Esto se mueve según la comunidad. 🔥
