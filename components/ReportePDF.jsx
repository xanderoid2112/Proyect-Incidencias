import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const VERDE = "#3c4a27";
const VERDE_CLARO = "#c5d49f";
const FONDO = "#f4f7ee";
const LOGO_URL =
  "https://res.cloudinary.com/dzxmyjnpf/image/upload/f_auto,q_auto/logo_ydpdox";

// ID único: fecha + hora + 4 chars aleatorios
const generarID = () => {
  const now = new Date();
  const fecha = now.toISOString().slice(0, 10).replace(/-/g, "");
  const hora = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RPT-${fecha}-${hora}-${rand}`;
};

const idReporte = generarID();

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
    fontSize: 9,
  },

  // Header
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 14,
  },
  logo: { width: 48, height: 48, borderRadius: 6 },
  headerTexts: { flex: 1 },
  empresa: { fontSize: 17, fontWeight: "bold", color: VERDE },
  subtitulo: { fontSize: 10, color: "#6b7280", marginTop: 2 },
  metaRow: { flexDirection: "row", gap: 12, marginTop: 5, flexWrap: "wrap" },
  meta: { fontSize: 7.5, color: "#9ca3af" },

  divider: { borderBottom: `1pt solid ${VERDE_CLARO}`, marginVertical: 10 },

  // Stats — ✅ sin flex que los expanda
  statsRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
  statBox: {
    flex: 1,
    padding: "8 6",
    borderRadius: 5,
    backgroundColor: FONDO,
    alignItems: "center",
  },
  statNum: { fontSize: 18, fontWeight: "bold", color: VERDE },
  statLabel: { fontSize: 7.5, color: "#6b7280", marginTop: 2 },

  // Tabla — columnas con anchos fijos en puntos
  tableHeader: {
    flexDirection: "row",
    backgroundColor: VERDE,
    padding: "7 6",
    borderRadius: "4 4 0 0",
  },
  thText: { color: "#fff", fontSize: 8, fontWeight: "bold" },

  row: {
    flexDirection: "row",
    padding: "6 6",
    borderBottom: `0.5pt solid #e5e7eb`,
  },
  rowAlt: { backgroundColor: "#fafaf8" },

  cell: { fontSize: 8, color: "#374151" },

  // Anchos de columna — suma = 515pt (ancho útil A4 con padding 36)
  colTitulo: { width: 130 },
  colResponsable: { width: 90 },
  colCategoria: { width: 120 },
  colEstado: { width: 75 },
  colFecha: { width: 70 },

  // Badges
  badgePendiente: {
    fontSize: 7,
    color: "#92400e",
    backgroundColor: "#fef3c7",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  badgeEnProceso: {
    fontSize: 7,
    color: "#1e40af",
    backgroundColor: "#dbeafe",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  badgeResuelto: {
    fontSize: 7,
    color: "#166534",
    backgroundColor: "#dcfce7",
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 8,
  },

  // Footer — ✅ flexGrow: 0 para que NO se expanda
  footerWrap: { marginTop: 14, flexGrow: 0 },
  footerBar: {
    backgroundColor: VERDE,
    borderRadius: 4,
    padding: "7 10",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: { fontSize: 7, color: VERDE_CLARO },
});

const getBadgeStyle = (estado) => {
  if (estado === "Resuelto") return styles.badgeResuelto;
  if (estado === "En proceso") return styles.badgeEnProceso;
  return styles.badgePendiente;
};

export function ReportePDF({ incidencias }) {
  const fecha = new Date().toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const pendientes = incidencias.filter((i) => i.estado === "Pendiente").length;
  const enProceso = incidencias.filter((i) => i.estado === "En proceso").length;
  const resueltos = incidencias.filter((i) => i.estado === "Resuelto").length;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── Header ── */}
        <View style={styles.headerRow}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image style={styles.logo} src={LOGO_URL} />
          <View style={styles.headerTexts}>
            <Text style={styles.empresa}>Harvest Coffeehouse</Text>
            <Text style={styles.subtitulo}>
              Reporte de Incidencias Operativas
            </Text>
            <View style={styles.metaRow}>
              <Text style={styles.meta}>Emisión: {fecha}</Text>
              <Text style={styles.meta}>•</Text>
              <Text style={styles.meta}>ID: {idReporte}</Text>
              <Text style={styles.meta}>•</Text>
              <Text style={styles.meta}>{incidencias.length} registros</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNum}>{incidencias.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: "#fef3c7" }]}>
            <Text style={[styles.statNum, { color: "#92400e" }]}>
              {pendientes}
            </Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: "#dbeafe" }]}>
            <Text style={[styles.statNum, { color: "#1e40af" }]}>
              {enProceso}
            </Text>
            <Text style={styles.statLabel}>En proceso</Text>
          </View>
          <View style={[styles.statBox, { backgroundColor: "#dcfce7" }]}>
            <Text style={[styles.statNum, { color: "#166534" }]}>
              {resueltos}
            </Text>
            <Text style={styles.statLabel}>Resueltos</Text>
          </View>
        </View>

        {/* ── Tabla ── */}
        <View style={styles.tableHeader}>
          <Text style={[styles.thText, styles.colTitulo]}>Título</Text>
          <Text style={[styles.thText, styles.colResponsable]}>
            Responsable
          </Text>
          <Text style={[styles.thText, styles.colCategoria]}>Categoría</Text>
          <Text style={[styles.thText, styles.colEstado]}>Estado</Text>
          <Text style={[styles.thText, styles.colFecha]}>Fecha</Text>
        </View>

        {incidencias.map((inc, idx) => (
          <View
            key={inc._id}
            style={[styles.row, idx % 2 === 1 && styles.rowAlt]}
          >
            <Text
              style={[styles.cell, styles.colTitulo, { fontWeight: "bold" }]}
            >
              {inc.titulo}
            </Text>
            <Text style={[styles.cell, styles.colResponsable]}>
              {inc.responsable}
            </Text>
            <Text style={[styles.cell, styles.colCategoria]}>
              {inc.categoria}
            </Text>
            <View style={styles.colEstado}>
              <Text style={getBadgeStyle(inc.estado)}>{inc.estado}</Text>
            </View>
            <Text style={[styles.cell, styles.colFecha]}>
              {new Date(inc.fecha).toLocaleDateString("es-PE")}
            </Text>
          </View>
        ))}

        {/* ── Footer — flexGrow:0 evita el cuadro verde gigante ── */}
        <View style={styles.footerWrap}>
          <View style={styles.divider} />
          <View style={styles.footerBar}>
            <Text style={styles.footerText}>
              Harvest Coffeehouse — Sistema de Gestión de Incidencias
            </Text>
            <Text style={styles.footerText}>{idReporte}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
